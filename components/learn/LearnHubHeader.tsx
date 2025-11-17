"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { ButtonVariant } from "@/lib/ui/design-tokens";

export interface LearnHubHeaderProps {
  courseTitle: string;
  headerColor: string;
  chooseVariant: ButtonVariant;
}

const LearnHubHeader = React.forwardRef<HTMLElement, LearnHubHeaderProps>(
  function LearnHubHeader({ courseTitle, headerColor, chooseVariant }, ref) {
    const [openUpdate, setOpenUpdate] = React.useState(false);
    return (
      <section
        className={cn("sticky top-3 z-20 rounded-2xl p-3 md:p-4 shadow", headerColor)}
        ref={ref}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <div className="md:col-span-2">
            <h1 className={`font-extrabold text-white text-2xl md:text-3xl`}>{courseTitle}</h1>
            <p className="text-white/90 mt-1">Start your nodes and earn the unit badge.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/path" title="Choose Path">
                  <Button variant={chooseVariant} size="icon-sm" aria-label="Choose Path">
                    <BookOpen className="size-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">Choose Path</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="amber" size="icon-sm" aria-label="Notifications" onClick={() => setOpenUpdate(true)}>
                  <Bell className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Notifikasi</TooltipContent>
            </Tooltip>
          </div>
        </div>
        {openUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button aria-label="Close" className="absolute inset-0 bg-black/50" onClick={() => setOpenUpdate(false)} />
            <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-emerald-500 p-5 md:p-6">
                <h2 className="text-white text-2xl font-extrabold">Pembaruan Sistem</h2>
                <p className="text-white/90 mt-1">Kami baru merilis peningkatan performa dan stabilitas.</p>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-5 md:p-6">
                <div className="text-sm">
                  <div className="font-bold">Yang baru</div>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>Waktu muat halaman lebih cepat.</li>
                    <li>Perbaikan mode gelap dan konsistensi tema.</li>
                    <li>Pengalaman belajar lebih halus saat berpindah unit.</li>
                  </ul>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="green" size="sm" label="LIHAT DETAIL" />
                  <Button variant="outline-amber" size="sm" label="TUTUP" onClick={() => setOpenUpdate(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
);

export { LearnHubHeader };