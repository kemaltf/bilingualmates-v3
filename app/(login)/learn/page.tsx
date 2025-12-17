import { LearnHubPage } from "@/components/learn/LearnHubPage";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("current_course_id, current_path_id")
    .eq("id", user.id)
    .single();

  const currentPathId = profile?.current_path_id;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearnHubPage initialPathId={currentPathId} />
    </Suspense>
  );
}
