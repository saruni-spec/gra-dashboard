// API client for fetching data from the backend

const BASE_URL = "http://localhost:4000/api/v1";

export interface DashboardStats {
  totalUsers: number;
  totalTaxes: number;
  totalSales: number;
  totalExpenses: number;
  salesTrend: { date: string; amount: number }[];
  expensesTrend: { date: string; amount: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${BASE_URL}/dashboard/stats`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Fallback to mock data if backend is unreachable (for demo purposes)
    return {
      totalUsers: 0,
      totalTaxes: 0,
      totalSales: 0,
      totalExpenses: 0,
      salesTrend: [],
      expensesTrend: [],
    };
  }
}

export interface UserSummary {
  id: string;
  name: string;
  businessName: string;
  phoneNumber: string;
  tin: string;
  totalSales: number;
  taxesPaid: number;
  status: "Active" | "Inactive";
}

export async function getUsers(): Promise<UserSummary[]> {
  try {
    const res = await fetch(`${BASE_URL}/dashboard/users`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export interface Lead {
  id: string;
  businessName: string;
  phoneNumber: string;
  location: string;
  category: string;
  confidenceScore: number;
  source: string;
  status: "New" | "Contacted" | "Onboarded";
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const res = await fetch(`${BASE_URL}/osint/leads?minConfidence=0.30&limit=10&offset=0`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch leads");
    }
    const data = await res.json();
  
    // Transform backend data to match frontend interface if necessary
    // Assuming backend returns array of leads matching the interface mostly
    return data.leads.map((lead: any) => ({
      id: lead.id,
      businessName: lead.businessName,
      phoneNumber: lead.phoneNumber || lead.normalizedPhone,
      location: lead.location || "Unknown",
      category: lead.category || "Uncategorized",
      confidenceScore: lead.confidenceScore,
      source: lead.source,
      status: lead.isOnboarded ? "Onboarded" : "New", 
    }));
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
}

export async function triggerScrape(location: string, category: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/osint/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, category }),
    });
    
    if (!res.ok) {
      throw new Error("Failed to trigger scrape");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error triggering scrape:", error);
    return { success: false, message: "Failed to connect to backend." };
  }
}
