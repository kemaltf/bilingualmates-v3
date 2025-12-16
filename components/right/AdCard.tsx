"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { AdItem } from "@/lib/right/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AdCardProps {
  ad: AdItem;
  className?: string;
}

export function AdCard({ ad, className }: AdCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="space-y-3">
        <div className="rounded-xl overflow-hidden bg-neutral-200">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            width={640}
            height={360}
            className="w-full h-32 object-cover"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold">{ad.title}</div>
            {ad.subtitle && (
              <div className="text-xs text-neutral-600">{ad.subtitle}</div>
            )}
          </div>
          <Button
            variant="green"
            size="sm"
            label={ad.ctaText}
            onClick={() =>
              window.open(ad.href, "_blank", "noopener,noreferrer")
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
