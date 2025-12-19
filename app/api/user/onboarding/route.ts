import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language, source, goal, level, path, dailyGoal, notifications } =
      body;

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Update profiles table (Important for app navigation)
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        current_course_id: language,
        current_path_id: path,
        // We might want to save other fields if profiles supports them,
        // but looking at schema, these are the main ones for navigation.
      })
      .eq("id", user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    // 2. Insert/Update user_settings table (For detailed preferences)
    // We use upsert to be safe
    const { error: settingsError } = await supabase
      .from("user_settings")
      .upsert(
        {
          user_id: user.id,
          target_language: language,
          source,
          learning_goal: goal,
          proficiency_level: level,
          current_path_id: path,
          daily_goal_minutes: dailyGoal,
          notifications_enabled: notifications,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (settingsError) {
      console.error("Error updating settings:", settingsError);
      // We don't fail the whole request if this fails, as profile update is more critical for navigation
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
