"use client";

import dynamic from "next/dynamic";
import { Lead } from "@/lib/api";

const LeadsMap = dynamic(() => import("./LeadsMap"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 rounded-lg animate-pulse flex items-center justify-center text-muted-foreground">Loading Map...</div>
});

interface LeadsMapWrapperProps {
  leads: Lead[];
}

export default function LeadsMapWrapper({ leads }: LeadsMapWrapperProps) {
  return <LeadsMap leads={leads} />;
}
