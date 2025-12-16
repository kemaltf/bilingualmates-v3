"use client";
import { paths } from "@/lib/learn/mock";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function getPriceComparison(price: number): string {
  if (price <= 50000) return "Setara 1x ngopi ☕";
  if (price <= 100000) return "Setara 2x ngopi ☕";
  if (price <= 150000) return "Lebih hemat dari paket makan siang 🍔";
  if (price <= 300000) return "Setara tiket nonton berdua 🎬";
  return "Investasi masa depan 🚀";
}

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PathPage() {
  const router = useRouter();
  return (
    <main className="w-full">
      <h1 className="text-2xl font-extrabold mb-6">Choose Your Path</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => {
          const isLocked = path.units.every((u) =>
            u.nodes.every((n) => n.status === "locked")
          );
          return (
            <Card
              key={path.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-[3px] border-b-[6px] active:border-b-[3px] active:translate-y-[3px]"
              onClick={() => {
                if (path.price && path.price > 0) {
                  router.push(`/path/${path.id}`);
                } else if (!isLocked) {
                  router.push(`/learn?pathId=${path.id}`);
                }
              }}
            >
              <div className="h-40 bg-neutral-100 dark:bg-neutral-800 relative">
                <Image
                  src={path.imageUrl ?? "/images/path-general.svg"}
                  alt={path.course}
                  fill
                  className="object-cover"
                />
                {isLocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      🔒 Locked
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <CardTitle className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{path.emoji}</span>
                  <span className="font-bold text-lg">{path.course}</span>
                </CardTitle>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  {path.id === "general"
                    ? "Perfect for beginners starting their journey."
                    : path.id === "business"
                      ? "Master professional communication."
                      : path.id === "kids"
                        ? "Fun and engaging lessons for children."
                        : "Essential phrases for your travels."}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 font-bold">
                    {path.units.length} Units
                  </div>
                  {path.price && path.price > 0 ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <div className="text-lg font-extrabold text-slate-800 dark:text-slate-200">
                          {formatIDR(path.price)}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium bg-amber-100 dark:bg-amber-900/50 dark:text-amber-100 px-2 py-0.5 rounded-full inline-block">
                          {getPriceComparison(path.price)}
                        </div>
                      </div>
                      <Button
                        variant="blue"
                        size="sm"
                        label="View Details"
                        className="w-full max-w-[120px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/path/${path.id}`);
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      variant="green"
                      size="sm"
                      label="Start Free"
                      className="w-full max-w-[120px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/learn?pathId=${path.id}`);
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
