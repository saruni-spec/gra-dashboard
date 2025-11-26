"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { triggerScrape } from "@/lib/api";
import { Loader2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ScrapeTrigger() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const result = await triggerScrape(location, category);
      setMessage(result.message);
      // Close dialog after success (optional, or keep open to show message)
      if (result.success) {
        setTimeout(() => setIsOpen(false), 2000);
      }
    } catch (error) {
      setMessage("Failed to start scraping job.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Find New Leads
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Trigger New Scrape Job</DialogTitle>
          <DialogDescription>
            Start a new OSINT scraping job to find leads in a specific area.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleScrape} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="e.g. Madina, Accra" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              placeholder="e.g. Tailors" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Start Scraping
          </Button>
          {message && (
            <p className={`text-sm mt-2 ${message.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
