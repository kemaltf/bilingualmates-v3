import { createClient } from "@/lib/supabase/server";
import { courses } from "@/lib/learn/mock";
import { PathSelectionList } from "@/components/path/PathSelectionList";
import { redirect } from "next/navigation";
import { PromoCard } from "@/components/path/PromoCard";
import { CourseSelector } from "@/components/path/CourseSelector";
import { getTranslations } from "next-intl/server";

export default async function PathPage() {
  const t = await getTranslations("course");
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
    <main className="w-full max-w-[1024px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-sm text-neutral-500 font-medium">
          <span>{t("selector.label")}</span>
          <CourseSelector courses={courses} currentCourseId={currentCourseId} />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          {t("path.title", { title: currentCourse.title })}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {t("path.description", { title: currentCourse.title })}
        </p>
        <PromoCard />
      </div>

      <PathSelectionList paths={currentCourse.paths} />
    </main>
  );
}
