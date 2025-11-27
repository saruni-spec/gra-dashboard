"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Check, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// Dummy data for compliance trends over 6 months
const complianceTrendData = [
  { month: "Jun", onTime: 68, late: 22, nonFiler: 10 },
  { month: "Jul", onTime: 64, late: 26, nonFiler: 10 },
  { month: "Aug", onTime: 62, late: 28, nonFiler: 10 },
  { month: "Sep", onTime: 65, late: 25, nonFiler: 10 },
  { month: "Oct", onTime: 67, late: 23, nonFiler: 10 },
  { month: "Nov", onTime: 65, late: 25, nonFiler: 10 }
];

// Dummy data for filing status by month
const filingStatusData = [
  { month: "Jun", filed: 820, pending: 93 },
  { month: "Jul", filed: 835, pending: 78 },
  { month: "Aug", filed: 842, pending: 71 },
  { month: "Sep", filed: 851, pending: 62 },
  { month: "Oct", filed: 868, pending: 45 },
  { month: "Nov", filed: 876, pending: 37 }
];

export default function CompliancePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tax Compliance</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Filing Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Filing Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Filed on Time</span>
                </div>
                <span className="font-bold">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Late Filing</span>
                </div>
                <span className="font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Non-Filer</span>
                </div>
                <span className="font-bold">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Compliance Rate Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Rate Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} name="On Time %" />
                <Line type="monotone" dataKey="late" stroke="#ef4444" strokeWidth={2} name="Late %" />
                <Line type="monotone" dataKey="nonFiler" stroke="#64748b" strokeWidth={2} name="Non-Filer %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filing Activity Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Filing Activity (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filingStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="filed" fill="#22c55e" name="Filed Returns" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending Returns" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
