import { paths } from "@/lib/learn/mock";
import { PathPriceCard } from "@/components/learn/PathPriceCard";
import { PathMobileBottomBar } from "@/components/learn/PathMobileBottomBar";
import { TestimonialSection } from "@/components/learn/TestimonialSection";

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

  const totalLessons = path.sections
    .flatMap((s) => s.units)
    .reduce((acc, unit) => acc + unit.nodes.length, 0);

  return (
    <>
      <div className="hidden lg:block sticky top-6 z-10 space-y-6">
        <PathPriceCard path={path} totalLessons={totalLessons} />
        <TestimonialSection />
      </div>

      <PathMobileBottomBar path={path} totalLessons={totalLessons} />
    </>
  );
}
