"use client";
import * as React from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertOctagon, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email atau username harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const isEmail = (str: string) => /@/.test(str);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const resolveEmailByUsername = async (username: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", username.toLowerCase())
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data?.email ?? null;
  };

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    setLoading(true);
    try {
      let email = values.identifier.trim();
      if (!isEmail(email)) {
        const resolved = await resolveEmailByUsername(email);
        if (!resolved) throw new Error("Username tidak ditemukan");
        email = resolved;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: values.password,
      });
      if (error) throw error;
      if (typeof window !== "undefined") window.location.assign("/learn");
    } catch (e: any) {
      setError(e?.message ?? "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[440px]">
        <Card>
          <CardHeader>
            <CardTitle>Masuk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="blue"
              size="md"
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  d="M21.35 11.1h-9.4v2.82h5.4c-.23 1.4-1.64 4.1-5.4 4.1-3.26 0-5.93-2.7-5.93-6.03s2.67-6.03 5.93-6.03c1.86 0 3.1.78 3.82 1.45l2.62-2.54C17.5 3.3 15.3 2.4 12.95 2.4 7.96 2.4 3.94 6.4 3.94 11.4s4.02 9 9.01 9c5.2 0 8.64-3.65 8.64-8.8 0-.6-.07-1.06-.24-1.5Z"
                  fill="currentColor"
                />
              </svg>
              <span>Masuk dengan Google</span>
            </Button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-500">ATAU</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                control={control}
                name="identifier"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Email atau username"
                    prefix={<User className="size-4" />}
                    status={errors.identifier ? "incorrect" : "idle"}
                    helperText={errors.identifier?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Password"
                    type="password"
                    prefix={<Lock className="size-4" />}
                    status={errors.password ? "incorrect" : "idle"}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-neutral-500 hover:text-neutral-700 uppercase"
                >
                  Lupa Password?
                </Link>
              </div>

              {error && (
                <div className="text-sm text-rose-600 flex items-center gap-2">
                  <AlertOctagon className="size-4" />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex justify-end">
                <Button
                  variant="green"
                  size="md"
                  disabled={loading}
                  label="MASUK"
                />
              </div>
            </form>

            <div className="text-sm text-neutral-600">
              Belum punya akun?{" "}
              <a href="/register" className="underline">
                Daftar
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
