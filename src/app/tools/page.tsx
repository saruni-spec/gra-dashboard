import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Calendar, Mail, FileText } from "lucide-react";

export default function ToolsPage() {
  const tools = [
    { name: "Tax Calculator", icon: Calculator, desc: "Quick tax estimation tool" },
    { name: "Schedule Meeting", icon: Calendar, desc: "Book appointments with taxpayers" },
    { name: "WhatsApp Blast", icon: Mail, desc: "Send bulk notifications" },
    { name: "Report Generator", icon: FileText, desc: "Create custom PDF reports" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Office Tools</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.name} className="hover:bg-slate-50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{tool.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
