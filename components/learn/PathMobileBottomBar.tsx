"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PathPriceContent } from "./PathPriceContent";
import type { CurriculumPath } from "@/lib/learn/types";

interface PathMobileBottomBarProps {
  path: CurriculumPath;
  totalLessons: number;
}

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PathMobileBottomBar({
  path,
  totalLessons,
}: PathMobileBottomBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-[110] bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800 p-4 lg:hidden">
      <div className="max-w-[1024px] mx-auto flex items-center justify-between gap-4">
        {/* Price Section */}
        <div className="flex flex-col">
          {path.originalPrice && (
            <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
              {formatIDR(path.originalPrice)}
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              {formatIDR(path.price ?? 0)}
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-6 w-6 rounded-full bg-slate-100 dark:bg-neutral-800"
                >
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="rounded-t-3xl max-h-[90vh] overflow-y-auto pt-8"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Detail Biaya</SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  <PathPriceContent path={path} totalLessons={totalLessons} />
                </div>
                <div className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4 pb-4">
                  30-Day Money-Back Guarantee
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link href={`/path/${path.id}/checkout?gift=true`}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl border-2 border-slate-200 dark:border-neutral-700"
              aria-label="Buy as gift"
            >
              <Gift className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Button>
          </Link>
          <Link href={`/path/${path.id}/checkout`}>
            <Button
              variant="green"
              size="lg"
              className="font-bold shadow-lg shadow-green-200 dark:shadow-green-900/20 px-8"
            >
              Enroll
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
