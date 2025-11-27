"use client";

import { useEffect, useState } from "react";
import { TransactionsSummary } from "@/components/transactions/TransactionsSummary";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { Pagination } from "@/components/transactions/Pagination";
import { 
  getTransactionsSummary, 
  getAllTransactions, 
  Transaction,
  TransactionsSummary as TSummary
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export default function TransactionsPage() {
  const [summary, setSummary] = useState<TSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE' | 'TAX'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    offset: 0,
    hasMore: false
  });

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchData(1);
  }, [typeFilter, searchQuery]);

  const fetchData = async (page: number = currentPage) => {
    setLoading(true);
    try {
      // Fetch summary
      const summaryData = await getTransactionsSummary();
      setSummary(summaryData);

      // Fetch transactions with filters
      const filters: any = {
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage
      };
      
      if (typeFilter !== 'ALL') {
        filters.type = typeFilter;
      }

      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }

      const transactionsData = await getAllTransactions(filters);
      setTransactions(transactionsData.transactions);
      setPagination(transactionsData.pagination);
    } catch (error) {
      console.error('Error fetching transactions data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const totalPages = Math.ceil(pagination.total / itemsPerPage);
  const isFiltered = typeFilter !== 'ALL' || searchQuery.trim() !== '';

  if (loading && transactions.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, phone, business..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Type Filter */}
          <Select 
            value={typeFilter} 
            onValueChange={(value: any) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Transactions</SelectItem>
              <SelectItem value="INCOME">Income Only</SelectItem>
              <SelectItem value="EXPENSE">Expenses Only</SelectItem>
              <SelectItem value="TAX">Taxes Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => fetchData(currentPage)} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {summary && (
          <TransactionsSummary
            totalIncome={summary.totalIncome}
            totalExpenses={summary.totalExpenses}
            totalTaxes={summary.totalTaxes}
            netProfit={summary.netProfit}
            currency={summary.currency}
          />
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Transactions 
              {isFiltered && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (Filtered)
                </span>
              )}
            </h3>
          </div>
          
          <TransactionsTable transactions={transactions} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={pagination.total}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
