"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useTranslations } from "next-intl";

const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "Bahasa Indonesia", code: "id" },
];

export const Footer = () => {
  const t = useTranslations("marketing.footer");
  const router = useRouter();
  const [pendingLocale, setPendingLocale] = React.useState<string | null>(null);

  const FOOTER_LINKS = React.useMemo(
    () => [
      {
        title: t("about"),
        links: [
          { label: t("links.courses"), href: "/courses" },
          { label: t("links.mission"), href: "/mission" },
          { label: t("links.approach"), href: "/approach" },
          { label: t("links.efficacy"), href: "/efficacy" },
          { label: t("links.team"), href: "/team" },
          { label: t("links.research"), href: "/research" },
          { label: t("links.careers"), href: "/careers" },
          { label: t("links.brand"), href: "/brand-guidelines" },
          { label: t("links.press"), href: "/press" },
          { label: t("links.investors"), href: "/investors" },
          { label: t("links.contact"), href: "/contact" },
        ],
      },
      {
        title: t("products"),
        links: [
          { label: "BilingualMates", href: "/" },
          { label: t("links.business"), href: "/business" },
          { label: t("links.super"), href: "/super" },
          { label: t("links.gift"), href: "/gift" },
        ],
      },
      {
        title: t("apps"),
        links: [
          { label: t("links.android"), href: "/android" },
          { label: t("links.ios"), href: "/ios" },
        ],
      },
      {
        title: t("help"),
        links: [
          { label: t("links.faq"), href: "/faq" },
          { label: t("links.status"), href: "/status" },
        ],
      },
      {
        title: t("privacy"),
        links: [
          { label: t("links.community"), href: "/community-guidelines" },
          { label: t("links.terms"), href: "/terms" },
          { label: t("links.privacy"), href: "/privacy" },
        ],
      },
      {
        title: t("social"),
        links: [
          { label: t("links.blog"), href: "/blog" },
          { label: "Instagram", href: "https://instagram.com" },
          { label: "Facebook", href: "https://facebook.com" },
          { label: "Twitter", href: "https://twitter.com" },
          { label: "YouTube", href: "https://youtube.com" },
        ],
      },
    ],
    [t]
  );

  React.useEffect(() => {
    if (pendingLocale) {
      document.cookie = `NEXT_LOCALE=${pendingLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
      setPendingLocale(null);
    }
  }, [pendingLocale, router]);

  const handleLanguageChange = (code: string) => {
    setPendingLocale(code);
  };

  return (
    <footer className="w-full border-t-2 border-slate-200 dark:border-slate-800 p-8 lg:p-16 bg-white dark:bg-neutral-900">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {FOOTER_LINKS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="font-bold text-slate-700 dark:text-slate-300">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-8 mb-8">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">
            {t("siteLanguage")}
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium text-sm transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center md:text-left text-sm text-slate-400 dark:text-slate-500 font-medium">
          {t("rights", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};
