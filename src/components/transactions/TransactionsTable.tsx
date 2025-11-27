"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/lib/api";
import { format } from "date-fns";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [sortField, setSortField] = useState<'createdAt' | 'amount'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'createdAt' | 'amount') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'createdAt') {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortField === 'amount') {
      comparison = parseFloat(a.amount) - parseFloat(b.amount);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'INCOME':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'EXPENSE':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'TAX':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatConfidence = (score: number | null) => {
    if (score === null) return 'N/A';
    return `${(score * 100).toFixed(0)}%`;
  };

  if (transactions.length === 0) {
    return (
      <div className="rounded-md border bg-white p-8 text-center">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('createdAt')}
            >
              Date {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Units</TableHead>
            <TableHead 
              className="text-right cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('amount')}
            >
              Amount {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="text-center">Confidence</TableHead>
            <TableHead>User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm')}
              </TableCell>
              <TableCell>
                <Badge className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.item || '-'}</TableCell>
              <TableCell>{transaction.units || '-'}</TableCell>
              <TableCell className="text-right font-semibold">
                {transaction.currency} {parseFloat(transaction.amount).toLocaleString()}
              </TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">
                {formatConfidence(transaction.confidenceScore)}
              </TableCell>
              <TableCell className="text-sm">
                {transaction.user ? (
                  <div>
                    <div className="font-medium">
                      {transaction.user.firstName} {transaction.user.lastName}
                    </div>
                    {transaction.user.businessName && (
                      <div className="text-xs text-muted-foreground">
                        {transaction.user.businessName}
                      </div>
                    )}
                  </div>
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
