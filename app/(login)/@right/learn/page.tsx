import { RightPanelRenderer } from "@/components/layout/RightPanelRenderer"
import { learnRightSections } from "@/lib/right/mock"

export default function Page() {
  return <RightPanelRenderer sections={learnRightSections} />
}