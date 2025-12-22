import { RightPanelRenderer } from "@/components/layout/RightPanelRenderer";
import { learnRightSections } from "@/lib/right/mock";
import { createClient } from "@/lib/supabase/server";
import { courses } from "@/lib/learn/mock";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentCourseId = "en";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("current_course_id")
      .eq("id", user.id)
      .single();
    if (profile?.current_course_id) {
      currentCourseId = profile.current_course_id;
    }
  }

  const currentCourse =
    courses.find((c) => c.id === currentCourseId) || courses[0];

  // Create a copy of the sections and update the language_stats
  const sections = learnRightSections.map((section) => {
    if (section.kind === "language_stats") {
      return {
        ...section,
        data: {
          ...section.data,
          languageCode: currentCourse.id,
          languageName: currentCourse.title,
          flagUrl: currentCourse.flagUrl,
        },
      };
    }
    return section;
  });

  return <RightPanelRenderer sections={sections} />;
}
