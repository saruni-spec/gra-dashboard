import { getDashboardStats } from "@/lib/api";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <StatsCards 
          totalUsers={stats.totalUsers}
          totalTaxes={stats.totalTaxes}
          totalSales={stats.totalSales}
          totalExpenses={stats.totalExpenses}
        />
        <AnalyticsCharts 
          salesData={stats.salesTrend}
          expensesData={stats.expensesTrend}
        />
      </div>
    </div>
  );
}
