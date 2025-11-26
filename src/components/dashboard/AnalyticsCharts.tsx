"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface AnalyticsChartsProps {
  salesData: { date: string; amount: number }[];
  expensesData: { date: string; amount: number }[];
}

export function AnalyticsCharts({ salesData }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `GHS${value}`}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="amount" fill="#0f172a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Mock recent activity */}
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Kwame Mensah</p>
                <p className="text-sm text-muted-foreground">
                  Registered for ToT
                </p>
              </div>
              <div className="ml-auto font-medium">+GHS 0.00</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Abena Osei</p>
                <p className="text-sm text-muted-foreground">
                  Paid Tax
                </p>
              </div>
              <div className="ml-auto font-medium">+GHS 450.00</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Kofi Boateng</p>
                <p className="text-sm text-muted-foreground">
                  Recorded Sales
                </p>
              </div>
              <div className="ml-auto font-medium">+GHS 1,200.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
