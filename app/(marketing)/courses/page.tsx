import { courses } from "@/lib/learn/mock";
import { CourseSelectionList } from "@/components/course/CourseSelectionList";

export default function PublicCoursePage() {
  return (
    <div className="max-w-[1024px] mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          Available Language Courses
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Choose from our selection of comprehensive language courses designed
          to take you from beginner to fluent.
        </p>
      </div>

      <CourseSelectionList
        courses={courses}
        currentCourseId={null}
        isPublic={true}
      />
    </div>
  );
}
