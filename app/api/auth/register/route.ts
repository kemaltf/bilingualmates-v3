import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: username,
        },
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
