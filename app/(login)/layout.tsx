import ClientLayout from "./client-layout";

export default function Layout({
  children,
  right,
}: {
  children: React.ReactNode;
  right: React.ReactNode;
}) {
  return <ClientLayout right={right}>{children}</ClientLayout>;
}
