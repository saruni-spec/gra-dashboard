import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Check, X } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tax Compliance</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
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
        <Card>
          <CardHeader>
            <CardTitle>Compliance Trends</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px] bg-slate-50 rounded-md">
            <p className="text-muted-foreground">Compliance Trend Chart Placeholder</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
