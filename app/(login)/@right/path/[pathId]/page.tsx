import { paths } from "@/lib/learn/mock";
import { PathDetailSidebar } from "@/components/learn/PathDetailSidebar";

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

  return <PathDetailSidebar path={path} totalLessons={totalLessons} />;
}
