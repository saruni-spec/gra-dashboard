"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Dummy data for risk distribution by industry
const industryRiskData = [
  { industry: "Retail", high: 5, medium: 15, low: 120 },
  { industry: "Services", high: 3, medium: 12, low: 85 },
  { industry: "Manufacturing", high: 2, medium: 8, low: 45 },
  { industry: "Hospitality", high: 1, medium: 5, low: 32 },
  { industry: "Agriculture", high: 1, medium: 5, low: 28 }
];

// Dummy data for overall risk distribution
const riskDistributionData = [
  { name: "High Risk", value: 12, color: "#ef4444" },
  { name: "Medium Risk", value: 45, color: "#f59e0b" },
  { name: "Low Risk", value: 856, color: "#22c55e" }
];

export default function RiskPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Risk Assessment</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">High Risk Taxpayers</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">12</div>
            <p className="text-xs text-red-700">Requires immediate attention</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Medium Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">45</div>
            <p className="text-xs text-yellow-700">Monitor closely</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Low Risk</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">856</div>
            <p className="text-xs text-green-700">Compliant behavior</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Risk Distribution by Industry */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryRiskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" fill="#ef4444" name="High Risk" />
                <Bar dataKey="medium" fill="#f59e0b" name="Medium Risk" />
                <Bar dataKey="low" fill="#22c55e" name="Low Risk" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Overall Risk Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
