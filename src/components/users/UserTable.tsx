"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserSummary } from "@/lib/api";

interface UserTableProps {
  users: UserSummary[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="rounded-md border bg-white overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Business</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>TIN</TableHead>
            <TableHead className="text-right">Total Sales</TableHead>
            <TableHead className="text-right">Taxes Paid</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.businessName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.tin}</TableCell>
              <TableCell className="text-right">GHS {user.totalSales.toLocaleString()}</TableCell>
              <TableCell className="text-right">GHS {user.taxesPaid.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
