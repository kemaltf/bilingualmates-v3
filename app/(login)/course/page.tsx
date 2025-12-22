import { createClient } from "@/lib/supabase/server";
import { courses } from "@/lib/learn/mock";
import { CourseSelectionList } from "@/components/course/CourseSelectionList";
import { redirect } from "next/navigation";

export default async function CoursePage() {
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

  const currentCourseId = profile?.current_course_id || courses[0].id;

  return (
    <div className="max-w-[1024px] mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-neutral-700 dark:text-neutral-200">
        Language Courses{" "}
      </h1>
      <p className="text-neutral-500 mb-8">
        Choose the language you want to learn. You can switch anytime.
      </p>

      <CourseSelectionList
        courses={courses}
        currentCourseId={currentCourseId}
      />
    </div>
  );
}
