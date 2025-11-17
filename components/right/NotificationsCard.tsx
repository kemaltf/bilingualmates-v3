"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { NotificationItem } from "@/lib/right/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface NotificationsCardProps {
  items: NotificationItem[]
  className?: string
}

export function NotificationsCard({ items, className }: NotificationsCardProps) {
  const [openUpdate, setOpenUpdate] = React.useState(false)
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Notifikasi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border p-3 space-y-2">
          <div className="text-sm font-bold">Pembaruan Sistem</div>
          <div className="text-sm">Kami baru merilis peningkatan performa dan stabilitas.</div>
          <div className="flex justify-end">
            <Button variant="green" size="sm" label="LIHAT PERUBAHAN" onClick={() => setOpenUpdate(true)} />
          </div>
        </div>
        {items.map((n) => (
          <div key={n.id} className="space-y-2">
            <div className="text-sm font-bold">{n.userName}</div>
            <div className="text-xs text-neutral-600">{n.timeAgo}</div>
            <div className="text-sm">{n.message}</div>
            <div className="flex items-center justify-between">
              <Button variant="blue" size="sm" label="RAYAKAN" />
              {n.reactions && n.reactions.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  {n.reactions.map((r, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1">
                      <span>{r.emoji}</span>
                      <span className="font-bold">{r.count}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      {openUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button aria-label="Close" className="absolute inset-0 bg-black/50" onClick={() => setOpenUpdate(false)} />
          <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-emerald-500 p-5 md:p-6">
              <h2 className="text-white text-2xl font-extrabold">Pembaruan Sistem</h2>
              <p className="text-white/90 mt-1">Kami baru merilis peningkatan performa dan stabilitas.</p>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-5 md:p-6">
              <div className="text-sm">
                <div className="font-bold">Yang baru</div>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Waktu muat halaman lebih cepat.</li>
                  <li>Perbaikan mode gelap dan konsistensi tema.</li>
                  <li>Pengalaman belajar lebih halus saat berpindah unit.</li>
                </ul>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="green" size="sm" label="LIHAT DETAIL" />
                <Button variant="outline-amber" size="sm" label="TUTUP" onClick={() => setOpenUpdate(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}