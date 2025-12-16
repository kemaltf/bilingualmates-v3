import { paths } from "@/lib/learn/mock";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Award,
  BarChart,
  Globe,
  Subtitles,
  FileText,
  Video,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { VerticalPathTrack } from "@/components/learn/VerticalPathTrack";
import { CurriculumPath } from "@/lib/learn/types";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function PathDetailPage({
  params,
}: {
  params: Promise<{ pathId: string }>;
}) {
  const { pathId } = await params;
  const path = paths.find((p) => p.id === pathId);

  if (!path) {
    return <div>Path not found</div>;
  }

  // If path is free, redirect to learn page directly
  if (!path.price || path.price === 0) {
    redirect(`/learn?pathId=${path.id}`);
  }

  // Calculate total lessons
  const totalLessons = path.units.reduce(
    (acc, unit) => acc + unit.nodes.length,
    0
  );

  const firstLessonId = path.units[0]?.nodes[0]?.id;
  const sampleUrl = firstLessonId
    ? `/learn/${firstLessonId}?pathId=${path.id}&sample=true`
    : `/learn?pathId=${path.id}`;

  // Create a sample path for preview (first 5 nodes of first unit)
  const samplePath: CurriculumPath = {
    ...path,
    units: [
      {
        ...path.units[0],
        nodes: path.units[0].nodes.slice(0, 5),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6 max-w-[1024px] mx-auto w-full">
        <Link
          href="/path"
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>

      <div className="flex-1 w-full max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Main Content (Column 2) */}
        <div className="space-y-8">
          {/* Video Preview Placeholder */}
          <div className="w-full aspect-video bg-slate-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer border-2 border-slate-300 dark:border-neutral-700">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="w-16 h-16 bg-white/90 dark:bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-slate-800 dark:border-l-white border-b-[10px] border-b-transparent ml-1" />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold">
              Preview Course
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
              {path.course}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {path.description}
            </p>
          </div>

          {/* What you will learn (Moved here for better flow) */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-6">
            <h2 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg">
              What you will learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {path.learningPoints?.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-3 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Path Visualization */}
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-200 mb-6 text-xl">
              Course Content Preview
            </h2>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-6 md:p-8">
              <VerticalPathTrack
                path={samplePath}
                className="pointer-events-none opacity-90"
              />

              {/* Enroll Pill */}
              <div className="mt-8 flex justify-center">
                <div className="bg-slate-100 dark:bg-neutral-700 text-slate-500 dark:text-slate-400 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-slate-200 dark:border-neutral-600">
                  Enroll to continue...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Column 3) */}
        <div className="lg:block">
          <div className="sticky top-6 space-y-6">
            {/* Price Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-6 shadow-sm">
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-6">
                {formatIDR(path.price ?? 0)}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Lessons</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {totalLessons}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
                    <BarChart className="w-4 h-4" />
                    <span>Difficulty</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {path.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
                    <Users className="w-4 h-4" />
                    <span>Students</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {path.studentsCount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Language</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {path.language}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {path.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400 gap-2">
                    <Award className="w-4 h-4" />
                    <span>Certificate</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {path.certificate ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/path/${path.id}/checkout`}
                  className="block w-full"
                >
                  <Button
                    variant="green"
                    size="lg"
                    className="w-full font-bold shadow-lg shadow-green-200 dark:shadow-green-900/20"
                  >
                    Enroll Course
                  </Button>
                </Link>
                <Link
                  href={`/path/${path.id}/checkout?gift=true`}
                  className="block w-full"
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full font-bold border-2 border-slate-200 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-700"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Buy as a gift
                  </Button>
                </Link>
              </div>
            </div>

            {/* Guarantee / Trust Badges (Optional) */}
            <div className="text-center text-xs text-slate-400 dark:text-slate-500">
              30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
