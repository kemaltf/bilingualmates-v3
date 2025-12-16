"use client";
import * as React from "react";
import { paths } from "@/lib/learn/mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, CreditCard, Wallet } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const paymentMethods = [
  {
    id: "qris",
    name: "QRIS (GoPay, OVO, Dana)",
    icon: <div className="font-bold text-xs bg-black text-white px-1">QR</div>,
  },
  {
    id: "gopay",
    name: "GoPay",
    icon: <Wallet className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "va",
    name: "Bank Transfer (VA)",
    icon: <CreditCard className="w-5 h-5 text-slate-500" />,
  },
];

export default function CheckoutPage() {
  const params = useParams<{ pathId: string }>();
  const router = useRouter();
  const pathId = params?.pathId;
  const path = paths.find((p) => p.id === pathId);
  const [selectedMethod, setSelectedMethod] = React.useState("qris");
  const [loading, setLoading] = React.useState(false);

  if (!path) {
    return <div>Path not found</div>;
  }

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      // Navigate to Success Screen
      router.push(`/path/${path.id}/success`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/path/${path.id}`}
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center max-w-lg mx-auto w-full">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">
          Checkout
        </h1>

        {/* Product Summary */}
        <Card className="w-full p-4 mb-6 flex items-center gap-4 border-2 border-slate-100 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="w-16 h-16 bg-slate-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-3xl">
            {path.emoji}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-slate-800 dark:text-slate-200">
              {path.course}
            </h2>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Full Access
            </div>
          </div>
          <div className="font-bold text-lg text-slate-800 dark:text-slate-200">
            {formatIDR(path.price ?? 0)}
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="w-full mb-8">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Payment Method
          </h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={cn(
                  "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                  selectedMethod === method.id
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500"
                    : "border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-slate-300 dark:hover:border-neutral-600"
                )}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="mr-3">{method.icon}</div>
                <div className="flex-1 font-medium text-slate-800 dark:text-slate-200">
                  {method.name}
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    selectedMethod === method.id
                      ? "border-green-500 bg-green-500"
                      : "border-slate-300 dark:border-neutral-600"
                  )}
                >
                  {selectedMethod === method.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total & CTA */}
        <div className="w-full mt-auto pb-8">
          <div className="flex items-center justify-between mb-4 text-lg font-bold text-slate-800 dark:text-slate-200">
            <span>Total</span>
            <span>{formatIDR(path.price ?? 0)}</span>
          </div>
          <Button
            variant="green"
            size="lg"
            className="w-full text-lg h-14 font-bold shadow-xl shadow-green-200 dark:shadow-green-900/20"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
          <div className="text-center mt-4 text-xs text-slate-400">
            Secure payment powered by Midtrans
          </div>
        </div>
      </div>
    </div>
  );
}
