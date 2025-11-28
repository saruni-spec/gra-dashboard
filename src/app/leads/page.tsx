import { getLeads } from "@/lib/api";
import { LeadsList } from "@/components/leads/LeadsList";
import { ScrapeTrigger } from "@/components/leads/ScrapeTrigger";
import LeadsMapWrapper from "@/components/leads/LeadsMapWrapper";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = 10;
  
  const { leads, total } = await getLeads(page, limit);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Taxpayers</h2>
        <ScrapeTrigger />
      </div>
      
      <div className="flex flex-col lg:grid lg:grid-cols-7 gap-4">
        {/* Map Section - Order first on mobile if desired, or keep second. Keeping logic similar to desktop but stacked */}
        <div className="order-2 lg:order-2 lg:col-span-3 space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4 md:p-6">
              <h3 className="font-semibold leading-none tracking-tight mb-4">Taxpayers Map</h3>
              <LeadsMapWrapper leads={leads} />
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="order-1 lg:order-1 lg:col-span-4">
           <LeadsList 
             leads={leads} 
             total={total} 
             currentPage={page} 
             limit={limit} 
           />
        </div>
      </div>
    </div>
  );
}
