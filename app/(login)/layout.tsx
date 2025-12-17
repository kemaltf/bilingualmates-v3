import { createClient } from "@/lib/supabase/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientLayout from "./client-layout";
import type { Locale } from "@/lib/i18n/types";

export default async function Layout({
  children,
  right,
}: {
  children: React.ReactNode;
  right: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let language: Locale = "en";

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("language")
      .eq("id", user.id)
      .single();
    
    if (data?.language) {
      language = data.language as Locale;
    }
  }

  // Provide messages to the client
  const messages = await getMessages({ locale: language });

  return (
    <NextIntlClientProvider locale={language} messages={messages}>
      <ClientLayout right={right}>{children}</ClientLayout>
    </NextIntlClientProvider>
  );
}
