"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subscriptionPlans, diamondPackages } from "@/lib/shop/mock";

function formatIDR(cents: number) {
  const rupiah = Math.round(cents / 100);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(rupiah);
}

export default function Page() {
  
  return (
    <main className="w-full space-y-6">
      <section>
        <h2 className="text-xl font-extrabold">Langganan</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex flex-col grow">
                <div className="text-lg font-bold">
                  {formatIDR(plan.priceCents)}
                </div>
                {plan.benefits && (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {plan.benefits.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex justify-end">
                  <Button variant="green" size="md" label="BUY" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-extrabold">Beli Diamond</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {diamondPackages.map((pkg) => (
            <Card key={pkg.id}>
              <CardHeader>
                <CardTitle>{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-lg font-bold">
                  {formatIDR(pkg.priceCents)}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <Button
                    variant="amber"
                    size="md"
                    className="w-full sm:w-auto"
                    label={formatIDR(pkg.priceCents)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
