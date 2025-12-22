import { paths } from "@/lib/learn/mock";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { VerticalPathTrack } from "@/components/learn/VerticalPathTrack";
import { CurriculumPath } from "@/lib/learn/types";
import { VideoPlayer } from "@/components/shared/media-renderer";
import { PathCertificateCard } from "@/components/learn/PathCertificateCard";
import { PathLeaderboard } from "@/components/learn/PathLeaderboard";

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

  // Create a sample path for preview (first 5 nodes of first unit)
  const firstSection = path.sections[0];
  const firstUnit = firstSection.units[0];
  const sampleUnits = [
    {
      ...firstUnit,
      nodes: firstUnit.nodes.slice(0, 5),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/path"
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>

      {/* Video Preview */}
      <div className="w-full rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-neutral-700 bg-black">
        <VideoPlayer
          content={{
            kind: "video",
            url: path.videoUrl ?? "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: path.imageUrl,
          }}
        />
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

      {/* What you will learn */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-4">
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

      {/* Certificate & Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <PathCertificateCard path={path} />
        <PathLeaderboard className="h-full" />
      </div>

      {/* Sample Path Visualization */}
      <div>
        <h2 className="font-bold text-slate-800 dark:text-slate-200 mb-6 text-xl">
          Course Content Preview
        </h2>
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-4 relative">
          <VerticalPathTrack
            units={sampleUnits}
            className="pointer-events-auto"
            inlinePlayer={true}
          />

          {/* Enroll Pill */}
          <div className="mt-8 flex justify-center">
            <div className="bg-slate-100 dark:bg-neutral-700 text-slate-500 dark:text-slate-400 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-slate-200 dark:border-neutral-600">
              Enroll to unlock full map
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
