import { PaymentForm } from "@/components/checkout/PaymentForm";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ prn: string }>
}) {
  const { prn } = await params;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">GRA Payment Portal</h1>
        <p className="text-slate-600">Complete your tax payment securely.</p>
      </div>
      <PaymentForm prn={prn} />
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Ghana Revenue Authority</p>
      </div>
    </div>
  );
}
