"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

export function TestimonialSection() {
  const t = useTranslations("path.detail");

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      content:
        "This course helped me get my dream job! The business English path is exactly what I needed.",
    },
    {
      id: 2,
      name: "Budi Santoso",
      role: "Traveler",
      avatar: "https://i.pravatar.cc/150?u=budi",
      content:
        "Sangat membantu untuk persiapan liburan ke Eropa. Materinya praktis dan mudah dipahami.",
    },
  ];

  const marqueeItems = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <div>
      <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg">
        {t("testimonials")}
      </h3>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[280px] bg-slate-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-slate-100 dark:border-neutral-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                &quot;{item.content}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
