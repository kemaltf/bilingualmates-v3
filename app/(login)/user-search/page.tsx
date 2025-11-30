"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get("s") ?? "";
  const [q, setQ] = React.useState(initial);

  const onSearch = () => {
    const next = q.trim();
    router.push(`/user-search?s=${encodeURIComponent(next)}`);
  };

  const mock = Array.from({ length: 5 }).map((_, i) => ({
    id: `res-${i}`,
    name: initial ? `${initial}${i === 0 ? "" : i}` : `User ${i + 1}`,
    handle: initial ? `@${initial}${i}` : `@user${i + 1}`,
  }));

  return (
    <div className={cn("space-y-4 p-6 max-w-[760px] mx-auto")}>
      <h1 className="text-2xl font-extrabold">Find Friends</h1>
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={q}
            onChange={setQ}
            placeholder="Search username…"
            onEnter={onSearch}
          />
          <div className="space-y-2">
            {mock.map((u) => (
              <div key={u.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">{u.name}</div>
                  <div className="text-xs text-neutral-600">{u.handle}</div>
                </div>
                <Button variant="blue" size="sm" label="FOLLOW" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className={cn("p-6 max-w-[760px] mx-auto")}>Loading…</div>}
    >
      <SearchContent />
    </Suspense>
  );
}
