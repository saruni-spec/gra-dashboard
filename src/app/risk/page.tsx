import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";

export default function RiskPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Risk Assessment</h2>
      </div>
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
      <div className="rounded-md border border-dashed p-8 text-center">
        <h3 className="text-lg font-medium">Risk Analysis Visualization</h3>
        <p className="text-sm text-muted-foreground">Detailed risk matrix and heatmap will be displayed here.</p>
      </div>
    </div>
  );
}
