import { createClient } from "@/lib/supabase/server";
import { courses } from "@/lib/learn/mock";
import { PathSelectionList } from "@/components/path/PathSelectionList";
import { redirect } from "next/navigation";

export default async function PathPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("current_course_id")
    .eq("id", user.id)
    .single();

  const currentCourseId = profile?.current_course_id || "en";
  const currentCourse =
    courses.find((c) => c.id === currentCourseId) || courses[0];

  return (
    <main className="w-full max-w-[1024px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          {currentCourse.title} Learning Paths
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {`Choose what's relevant for your ${currentCourse.title} journey. You can switch anytime.`}
        </p>
        <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-xl flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Planning to learn more than 1 class?</strong>
            <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
              Most learners choose subscription for unlimited access to all
              paths.
            </p>
          </div>
        </div>
      </div>

      <PathSelectionList paths={currentCourse.paths} />
    </main>
  );
}
