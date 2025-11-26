"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CheckCircle2, Smartphone, CreditCard } from "lucide-react";

interface PaymentFormProps {
  prn: string;
}

export function PaymentForm({ prn }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [provider, setProvider] = useState("mtn");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-green-800">Payment Successful!</h3>
            <p className="text-green-700">
              Payment for PRN <span className="font-bold">{prn}</span> has been processed.
            </p>
            <p className="text-sm text-green-600">Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
            onClick={() => setIsSuccess(false)}
          >
            Make Another Payment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Secure Checkout</CardTitle>
        <CardDescription>Complete your payment for PRN: <span className="font-mono font-bold text-primary">{prn}</span></CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="momo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="momo">
              <Smartphone className="mr-2 h-4 w-4" />
              Mobile Money
            </TabsTrigger>
            <TabsTrigger value="card">
              <CreditCard className="mr-2 h-4 w-4" />
              Card / Bank
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="momo">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label>Select Provider</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    className={`border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer transition-colors ${provider === 'mtn' ? 'border-yellow-500 bg-yellow-50' : 'hover:bg-slate-50'}`}
                    onClick={() => setProvider('mtn')}
                  >
                    <span className="font-bold text-xs">MTN MoMo</span>
                  </div>
                  <div 
                    className={`border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer transition-colors ${provider === 'voda' ? 'border-red-500 bg-red-50' : 'hover:bg-slate-50'}`}
                    onClick={() => setProvider('voda')}
                  >
                    <span className="font-bold text-xs">Telecel Cash</span>
                  </div>
                  <div 
                    className={`border rounded-md p-2 flex flex-col items-center justify-center cursor-pointer transition-colors ${provider === 'at' ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}
                    onClick={() => setProvider('at')}
                  >
                    <span className="font-bold text-xs">AT Money</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" placeholder="024 XXX XXXX" required />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pay Now
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="card">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input id="card-name" placeholder="Kwame Mensah" required />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pay Now
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-xs text-muted-foreground flex items-center">
          <span className="mr-1">🔒</span> Secured by GRA Payment Gateway
        </p>
      </CardFooter>
    </Card>
  );
}
