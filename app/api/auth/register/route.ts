import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { registerBaseSchema } from "@/lib/zod-rules";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    let { email, username } = body;

    // Debug logging
    console.log("Register Request:", { email, username });
    if (email) {
      console.log(
        "Email char codes:",
        email.split("").map((c: string) => String(c).charCodeAt(0))
      );
    }

    // Sanitize input
    if (email) {
      // Remove whitespace and invisible characters
      email = email.toString().trim().toLowerCase();
      // Remove non-printable ASCII characters (like zero-width spaces)
      email = email.replace(/[^\x20-\x7E]/g, "");
    }

    if (username) {
      username = username.toString().trim().toLowerCase();
    }

    // Validate with Zod
    const validationResult = registerBaseSchema().safeParse({
      email,
      password,
      username,
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
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

    // Check username uniqueness
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 400 });
    }
    if (existingUser) {
      return NextResponse.json(
        { error: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: username,
        },
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Check if email confirmation is required
    const isEmailConfirmationRequired = data.user && !data.session;

    return NextResponse.json({ success: true, isEmailConfirmationRequired });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
