import { LearnHubPage } from "@/components/learn/LearnHubPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearnHubPage />
    </Suspense>
  );
}
