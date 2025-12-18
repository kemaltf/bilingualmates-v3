import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 dark:border-slate-800 px-4 bg-white dark:bg-neutral-900">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            BilingualMates
          </h1>
          <div className="hidden md:flex gap-x-6 ml-8 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">
            <Link
              href="/pricing"
              className="hover:text-slate-700 dark:hover:text-slate-200 transition"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="hover:text-slate-700 dark:hover:text-slate-200 transition"
            >
              Blog
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <ThemeToggle />
          <LanguageSelector />
          <div className="flex gap-x-3">
            <Link href="/login">
              <Button variant="outline-blue" size="sm" label="Login" />
            </Link>
            <Link href="/get-started">
              <Button variant="green" size="sm" label="Get Started" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
