"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  ShieldAlert, 
  FileText, 
  Flag, 
  Briefcase,
  Menu,
  Receipt
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Analytics", href: "/", icon: LayoutDashboard },
  { name: "Taxpayers", href: "/users", icon: Users },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Find Taxpayers", href: "/leads", icon: MapPin },
  { name: "Risk Assessment", href: "/risk", icon: ShieldAlert },
  { name: "Tax Compliance", href: "/compliance", icon: FileText },
  { name: "Flags", href: "/flags", icon: Flag },
  { name: "Office Tools", href: "/tools", icon: Briefcase },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-slate-800">
            <h1 className="text-xl font-bold">GRA Dashboard</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Officer Admin</p>
                <p className="text-xs text-slate-400">View Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
