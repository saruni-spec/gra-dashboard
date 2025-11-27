// API client for fetching data from the backend

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export async function getLeads(page: number = 1, limit: number = 10): Promise<{ leads: Lead[]; total: number }> {
  try {
    const offset = (page - 1) * limit;
    const res = await fetch(`${BASE_URL}/osint/leads?minConfidence=0.30&limit=${limit}&offset=${offset}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch leads");
    }
    const data = await res.json();
  
    // Transform backend data to match frontend interface if necessary
    // Assuming backend returns array of leads matching the interface mostly
    const leads = data.leads.map((lead: any) => ({
      id: lead.id,
      businessName: lead.businessName,
      phoneNumber: lead.phoneNumber || lead.normalizedPhone,
      location: lead.location || "Unknown",
      category: lead.category || "Uncategorized",
      confidenceScore: lead.confidenceScore,
      source: lead.source,
      status: lead.isOnboarded ? "Onboarded" : "New", 
    }));

    return { leads, total: data.pagination?.total || leads.length };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { leads: [], total: 0 };
  }
}

export async function triggerScrape(location: string, category: string): Promise<{ success: boolean; message: string; leadsFound?: number }> {
  try {
    const res = await fetch(`${BASE_URL}/osint/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, businessType: category }),
    });
    
    if (!res.ok) {
      throw new Error("Failed to trigger scrape");
    }
    
    const data = await res.json();
    return { 
      success: true, 
      message: data.message || "Scrape completed successfully", 
      leadsFound: data.leadsFound 
    };
  } catch (error) {
    console.error("Error triggering scrape:", error);
    return { success: false, message: "Failed to connect to backend." };
  }
}

// Transaction types and interfaces
export interface Transaction {
  id: string;
  userId: string;
  type: 'INCOME' | 'EXPENSE' | 'TAX';
  category: string;
  amount: string;
  currency: string;
  item: string | null;
  units: string | null;
  rawText: string | null;
  confidenceScore: number | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    businessName: string | null;
  };
}

export interface TransactionsSummary {
  totalIncome: string;
  totalExpenses: string;
  totalTaxes: string;
  netProfit: string;
  transactionCount: number;
  currency: string;
  incomeTrend: { date: string; amount: number }[];
  expensesTrend: { date: string; amount: number }[];
  taxesTrend: { date: string; amount: number }[];
}

export async function getTransactionsSummary(startDate?: string, endDate?: string): Promise<TransactionsSummary> {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const url = `${BASE_URL}/transactions/summary${params.toString() ? '?' + params.toString() : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error("Failed to fetch transactions summary");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching transactions summary:", error);
    return {
      totalIncome: "0.00",
      totalExpenses: "0.00",
      totalTaxes: "0.00",
      netProfit: "0.00",
      transactionCount: 0,
      currency: "GHS",
      incomeTrend: [],
      expensesTrend: [],
      taxesTrend: []
    };
  }
}

export async function getAllTransactions(filters?: {
  type?: 'INCOME' | 'EXPENSE' | 'TAX';
  search?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}): Promise<{ transactions: Transaction[]; pagination: any }> {
  try {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    
    const url = `${BASE_URL}/transactions/all${params.toString() ? '?' + params.toString() : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      transactions: [],
      pagination: { total: 0, limit: 50, offset: 0, hasMore: false }
    };
  }
}


