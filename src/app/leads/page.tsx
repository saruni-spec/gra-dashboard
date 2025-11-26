import { getLeads } from "@/lib/api";
import { LeadsList } from "@/components/leads/LeadsList";
import { ScrapeTrigger } from "@/components/leads/ScrapeTrigger";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lead Management (OSINT)</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
           <LeadsList leads={leads} />
        </div>
        <div className="col-span-3 space-y-4">
          <ScrapeTrigger />
          {/* Placeholder map */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[300px] flex items-center justify-center bg-slate-100">
            <p className="text-muted-foreground">Map Visualization Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
