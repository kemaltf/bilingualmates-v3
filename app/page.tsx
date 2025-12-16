import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export default async function LandingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/learn")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full flex justify-end px-6 py-4">
        <div className="text-sm text-neutral-600">SITE LANGUAGE: ENGLISH</div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-[1024px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-[0_3px_0_0_#a3a3a3] border-[3px] border-neutral-300">
              <Image src="https://picsum.photos/640/400" alt="Learn a language" width={640} height={400} className="w-[640px] h-auto object-cover" unoptimized />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold">The free, fun, and effective way to learn a language!</h1>
            <div className="flex gap-3">
              <Link href="/learn">
                <Button variant="green" size="md" label="GET STARTED" />
              </Link>
              <Link href="/login">
                <Button variant="blue" size="md" label="I ALREADY HAVE AN ACCOUNT" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full px-6 py-4">
        <div className="text-xs text-neutral-500">© {new Date().getFullYear()} BilingualMates</div>
      </footer>
    </div>
  )
}