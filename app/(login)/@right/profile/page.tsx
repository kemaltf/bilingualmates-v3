import { RightPanelRenderer } from "@/components/layout/RightPanelRenderer"
import { profileRightSections } from "@/lib/right/mock"

export default function Page() {
  return <RightPanelRenderer sections={profileRightSections} />
}