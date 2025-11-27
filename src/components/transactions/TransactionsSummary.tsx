"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TransactionsSummaryProps {
  totalIncome: string;
  totalExpenses: string;
  totalTaxes: string;
  netProfit: string;
  currency: string;
}

export function TransactionsSummary({
  totalIncome,
  totalExpenses,
  totalTaxes,
  netProfit,
  currency
}: TransactionsSummaryProps) {
  const profit = parseFloat(netProfit);
  const isProfitable = profit >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Income Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-green-600"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {currency} {parseFloat(totalIncome).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Revenue from sales
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-red-600"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {currency} {parseFloat(totalExpenses).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Business costs
          </p>
        </CardContent>
      </Card>

      {/* Total Taxes Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Taxes</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-blue-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {currency} {parseFloat(totalTaxes).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Tax payments
          </p>
        </CardContent>
      </Card>

      {/* Net Profit Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          {isProfitable ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {currency} {Math.abs(profit).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isProfitable ? 'Profit' : 'Loss'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
