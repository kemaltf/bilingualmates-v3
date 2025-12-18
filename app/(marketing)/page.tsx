import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/learn");
  }

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image
          src="https://picsum.photos/640/400"
          fill
          alt="Hero"
          className="object-cover rounded-2xl"
          unoptimized
        />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          The free, fun, and effective way to learn a language!
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <Link href="/register">
            <Button
              size="lg"
              variant="green"
              className="w-full min-w-[300px]"
              label="GET STARTED"
            />
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="blue"
              className="w-full min-w-[300px]"
              label="I ALREADY HAVE AN ACCOUNT"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
