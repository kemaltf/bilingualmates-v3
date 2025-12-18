import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/learn";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

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

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Exchange error:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // Check for onboarding cookie and save to DB
  const onboardingCookie = cookieStore.get("onboarding-data");
  if (onboardingCookie) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const onboardingData = JSON.parse(onboardingCookie.value);
        await supabase.from("user_settings").insert({
          user_id: user.id,
          target_language: onboardingData.language,
          source: onboardingData.source,
          learning_goal: onboardingData.goal,
          proficiency_level: onboardingData.level,
          current_path_id: onboardingData.path,
          daily_goal_minutes: onboardingData.dailyGoal,
          notifications_enabled: onboardingData.notifications,
        });

        // Delete the cookie after use
        cookieStore.delete("onboarding-data");
      }
    } catch (err) {
      console.error("Error saving onboarding data from cookie:", err);
    }
  }

  const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}
