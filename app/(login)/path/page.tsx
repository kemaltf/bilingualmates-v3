"use client";
import { paths } from "@/lib/learn/mock";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PathPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Choose Your Path</h1>
      <div className="mt-3 space-y-4">
        {paths.map((path) => {
          const isLocked = path.units.every((u) =>
            u.nodes.every((n) => n.status === "locked")
          );
          return (
            <Card key={path.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">{path.emoji}</span>
                  <span className="font-bold">{path.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <Image src={path.imageUrl ?? "/images/path-general.svg"} alt={path.name} width={640} height={360} className="w-full h-40 object-cover" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs font-bold">
                    {isLocked ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-300 text-slate-700">
                        Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500 text-white">
                        Available
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-2 justify-end w-full sm:w-auto">
                    {isLocked ? (
                      <>
                        <Button
                          variant="green"
                          size="sm"
                          label="Unlock with Points"
                        />
                        <Button variant="amber" size="sm" label="Unlock 50💎" />
                      </>
                    ) : (
                      <Button variant="blue" size="sm" label="Open" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
