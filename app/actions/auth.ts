"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function verifyOtpAction(
  email: string,
  token: string,
  password?: string
) {
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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  // Since we use signInWithOtp (magic link/otp flow), the type is 'email' (or 'magiclink').
  // 'signup' type is for the signUp() method.
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { error: error.message };
  }

  // If password is provided (from the registration form), set it now.
  if (password && data.session) {
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });
    if (updateError) {
      console.error(
        "Failed to set password after OTP verification:",
        updateError
      );
      // We don't fail the verification itself, but maybe we should log it or warn.
    }
  }

  return { success: true, session: data.session };
}

export async function resendOtpAction(email: string) {
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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored
          }
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Ensure we don't accidentally create a new user on resend
      shouldCreateUser: false,
      // Explicitly no redirect to encourage OTP code
      emailRedirectTo: undefined,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
