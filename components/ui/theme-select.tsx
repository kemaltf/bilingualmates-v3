"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeOption = "system" | "light" | "dark";

function applyTheme(option: ThemeOption) {
  const root = document.documentElement;
  let final: ThemeOption = option;
  if (option === "system") {
    final =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  if (final === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeSelect({ className }: { className?: string }) {
  const [value, setValue] = React.useState<ThemeOption>(() => {
    if (typeof window === "undefined") return "system";
    const stored =
      (localStorage.getItem("theme") as ThemeOption | null) ?? "system";
    return stored;
  });

  React.useEffect(() => {
    applyTheme(value);
    localStorage.setItem("theme", value);
  }, [value]);

  return (
    <Select value={value} onValueChange={(v) => setValue(v as ThemeOption)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="SYSTEM DEFAULT" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">System default</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
}
