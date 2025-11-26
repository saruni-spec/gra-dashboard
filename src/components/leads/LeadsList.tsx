"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/lib/api";

interface LeadsListProps {
  leads: Lead[];
}

export function LeadsList({ leads }: LeadsListProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.businessName}</TableCell>
              <TableCell>{lead.phoneNumber}</TableCell>
              <TableCell>{lead.location}</TableCell>
              <TableCell>{lead.category}</TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={`mr-2 h-2 w-2 rounded-full ${lead.confidenceScore > 0.9 ? 'bg-green-500' : lead.confidenceScore > 0.7 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  {(lead.confidenceScore * 100).toFixed(0)}%
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={lead.status === "New" ? "default" : lead.status === "Contacted" ? "secondary" : "outline"}>
                  {lead.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
