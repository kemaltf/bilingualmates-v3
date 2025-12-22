"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Check,
  CreditCard,
  Globe,
  Menu,
  Palette,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const LANGUAGES = [
  { code: "en", name: "English", flag: "/flags/en.svg" },
  { code: "id", name: "Indonesia", flag: "/flags/id.svg" },
] as const;

function setLanguageCookie(code: string) {
  document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
}

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleLanguageChange = (code: string) => {
    setLanguageCookie(code);
    router.refresh();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left text-green-600 font-extrabold tracking-wide text-2xl">
            BilingualMates
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-y-6 mt-8">
          <div className="flex flex-col gap-y-2">
            <Link href="/courses" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-lg font-semibold text-slate-600 dark:text-slate-300"
                >
                  <BookOpen className="h-5 w-5" />
                  Courses
                </Button>
              </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-lg font-semibold text-slate-600 dark:text-slate-300"
              >
                <BookOpen className="h-5 w-5" />
                Blog
              </Button>
            </Link>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-700" />

          <div className="flex flex-col gap-y-4">
            <div className="px-4 text-xs font-semibold uppercase text-slate-400">
              Settings
            </div>

            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                <Globe className="h-5 w-5" />
                <span>Language</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={locale === lang.code ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="truncate">{lang.name}</span>
                    {locale === lang.code && (
                      <Check className="ml-auto h-3 w-3" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-700" />

          <div className="flex flex-col gap-3 px-4">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button
                variant="blue"
                size="lg"
                className="w-full"
                label="Login"
              />
            </Link>
            <Link href="/get-started" onClick={() => setOpen(false)}>
              <Button
                variant="green"
                size="lg"
                className="w-full"
                label="Get Started"
              />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
