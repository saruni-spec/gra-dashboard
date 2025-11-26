import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "lucide-react";

export default function FlagsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">System Flags</h2>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-l-4 border-l-red-500">
            <CardContent className="flex items-center p-6">
              <Flag className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <h3 className="font-bold text-lg">Suspicious Transaction Pattern Detected</h3>
                <p className="text-sm text-muted-foreground">
                  User ID: <span className="font-mono">USR-8923{i}</span> showed irregular expense reporting on Nov {20 + i}.
                </p>
              </div>
              <div className="ml-auto">
                <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm">Investigate</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
