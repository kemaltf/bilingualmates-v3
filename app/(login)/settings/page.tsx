import { ThemeSelect } from "@/components/ui/theme-select"

export default function Page() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Dark mode</h2>
        <ThemeSelect className="w-80" />
      </div>
    </div>
  )
}