import { OnboardingLayout } from "../layout-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is a dummy layout to satisfy Next.js structure.
  // The actual progress state and layout wrapper will be used inside page.tsx
  // because we need to control the progress from the page state.
  return <>{children}</>;
}
