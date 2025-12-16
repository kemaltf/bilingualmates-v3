import { paths } from "@/lib/learn/mock";
import { PathPriceCard } from "@/components/learn/PathPriceCard";
import { PathMobileBottomBar } from "@/components/learn/PathMobileBottomBar";

export default async function PathRightSidebar({
  params,
}: {
  params: Promise<{ pathId: string }>;
}) {
  const { pathId } = await params;
  const path = paths.find((p) => p.id === pathId);

  // If path not found or price is 0 (free), we don't render the sidebar
  if (!path || !path.price || path.price === 0) {
    return null;
  }

  const totalLessons = path.units.reduce(
    (acc, unit) => acc + unit.nodes.length,
    0
  );

  return (
    <>
      <div className="hidden lg:block sticky top-6 z-10 space-y-6">
        <PathPriceCard path={path} totalLessons={totalLessons} />
        <div className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
          30-Day Money-Back Guarantee
        </div>
      </div>
      <PathMobileBottomBar path={path} totalLessons={totalLessons} />
    </>
  );
}
