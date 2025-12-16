"use client";

import * as React from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import type { CurriculumPath } from "@/lib/learn/types";

interface PathCertificateCardProps {
  path: CurriculumPath;
}

export function PathCertificateCard({ path }: PathCertificateCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-4 shadow-sm">
      <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-500" />
        Earn a Certificate
      </h3>
      <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-neutral-700 rounded-lg overflow-hidden border border-slate-200 dark:border-neutral-600 mb-3">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
          <Image
            src="/images/certificate-placeholder.svg"
            alt="Certificate Preview"
            width={200}
            height={150}
            className="opacity-50"
          />
        </div>
        {/* Mock Certificate Content */}
        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
            Certificate of Completion
          </div>
          <div className="font-serif text-lg text-slate-800 dark:text-slate-200 font-bold mb-2">
            {path.course}
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        Verified certificate to boost your LinkedIn profile and resume.
      </p>
    </div>
  );
}
