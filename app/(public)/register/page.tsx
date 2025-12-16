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

const registerSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          username: values.username.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registrasi gagal");
      }

      if (data.isEmailConfirmationRequired) {
        setSuccess(true);
      } else {
        if (typeof window !== "undefined") window.location.assign("/learn");
      }
    } catch (e: any) {
      setError(e?.message ?? "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center px-4")}>
        <div className="w-full max-w-[480px]">
          <Card>
            <CardHeader>
              <CardTitle>Cek Email Kamu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <Mail className="size-8 text-emerald-600" />
                </div>
                <div className="text-neutral-600">
                  Kami telah mengirimkan link konfirmasi ke{" "}
                  <strong>{getValues("email")}</strong>. Silakan cek inbox (atau
                  folder spam) kamu untuk mengaktifkan akun.
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="blue"
                  size="md"
                  onClick={() => (window.location.href = "/login")}
                  label="KEMBALI KE LOGIN"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[480px]">
        <Card>
          <CardHeader>
            <CardTitle>Daftar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Username"
                    prefix={<User className="size-4" />}
                    status={errors.username ? "incorrect" : "idle"}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Email"
                    prefix={<Mail className="size-4" />}
                    status={errors.email ? "incorrect" : "idle"}
                    helperText={errors.email?.message}
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

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Konfirmasi Password"
                    type="password"
                    prefix={<Lock className="size-4" />}
                    status={errors.confirmPassword ? "incorrect" : "idle"}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />

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
                  // onClick handled by form onSubmit
                  disabled={loading}
                  label="DAFTAR"
                />
              </div>
              <div className="text-sm text-neutral-600">
                Sudah punya akun?{" "}
                <a href="/login" className="underline">
                  Masuk
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
