"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  BarChart,
  Users,
  Globe,
  Clock,
  Award,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathLeaderboard } from "@/components/learn/PathLeaderboard";
import type { CurriculumPath } from "@/lib/learn/types";

interface PathDetailSidebarProps {
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

function getPriceComparison(price: number): string {
  if (price <= 50000) return "Equivalent to 1 coffee ☕";
  if (price <= 100000) return "Equivalent to 2 coffees ☕";
  if (price <= 150000) return "Cheaper than a lunch package 🍔";
  if (price <= 300000) return "Equivalent to 2 movie tickets 🎬";
  return "Investment for your future 🚀";
}

export function PathDetailSidebar({
  path,
  totalLessons,
}: PathDetailSidebarProps) {
  return (
    <div className="sticky top-6 space-y-6">
      {/* Price Card */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-6 shadow-sm">
        <div className="mb-6">
          {path.originalPrice && (
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium line-through mb-1">
              {formatIDR(path.originalPrice)}
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              {formatIDR(path.price ?? 0)}
            </span>
            {path.originalPrice && (
              <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                {Math.round(
                  ((path.originalPrice - (path.price ?? 0)) /
                    path.originalPrice) *
                    100
                )}
                % OFF
              </span>
            )}
          </div>
          <div className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg inline-block">
            {getPriceComparison(path.price ?? 0)}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
              <FileText className="w-4 h-4" />
              <span>Lessons</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {totalLessons}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
              <BarChart className="w-4 h-4" />
              <span>Difficulty</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {path.difficulty}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
              <Users className="w-4 h-4" />
              <span>Students</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {path.studentsCount?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
              <Globe className="w-4 h-4" />
              <span>Language</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {path.language}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {path.estimatedTime}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
              <Award className="w-4 h-4" />
              <span>Certificate</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {path.certificate ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Link href={`/path/${path.id}/checkout`} className="block w-full">
            <Button
              variant="green"
              size="lg"
              className="w-full font-bold shadow-lg shadow-green-200 dark:shadow-green-900/20"
            >
              Enroll Course
            </Button>
          </Link>
          <Link
            href={`/path/${path.id}/checkout?gift=true`}
            className="block w-full"
          >
            <Button
              variant="ghost"
              size="lg"
              className="w-full font-bold border-2 border-slate-200 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-700"
            >
              <Gift className="w-4 h-4 mr-2" />
              Buy as a gift
            </Button>
          </Link>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-6 shadow-sm">
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

      <PathLeaderboard />

      {/* Guarantee / Trust Badges */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500">
        30-Day Money-Back Guarantee
      </div>
    </div>
  );
}
