"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n/types";

export async function updateLanguage(language: Locale) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Update DB
  const { error } = await supabase
    .from("profiles")
    .update({ language })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  // Update cookie for next-intl
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", language, { path: "/" });

  revalidatePath("/", "layout");
}
