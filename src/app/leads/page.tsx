import { getLeads } from "@/lib/api";
import { LeadsList } from "@/components/leads/LeadsList";
import { ScrapeTrigger } from "@/components/leads/ScrapeTrigger";
import LeadsMapWrapper from "@/components/leads/LeadsMapWrapper";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lead Management (OSINT)</h2>
        <ScrapeTrigger />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
           <LeadsList leads={leads} />
        </div>
        <div className="col-span-3 space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="font-semibold leading-none tracking-tight mb-4">Leads Map</h3>
              <LeadsMapWrapper leads={leads} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
