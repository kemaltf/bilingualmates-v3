"use client";
import * as React from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const updatePasswordSchema = z
  .object({
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

export default function UpdatePasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: UpdatePasswordValues) => {
    setMessage(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });
      if (error) throw error;
      setMessage({
        type: "success",
        text: "Password berhasil diperbarui. Mengalihkan...",
      });
      setTimeout(() => {
        router.push("/learn");
      }, 2000);
    } catch (e: any) {
      setMessage({ type: "error", text: e?.message ?? "Gagal memperbarui password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[440px]">
        <Card>
          <CardHeader>
            <CardTitle>Perbarui Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <div
                className={cn(
                  "p-3 rounded-md text-sm font-medium",
                  message.type === "success"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Password Baru
                </label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        type="password"
                        placeholder="Masukkan password baru"
                        className="pl-10"
                        disabled={loading}
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                    </div>
                  )}
                />
                {errors.password && (
                  <span className="text-xs font-bold text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Konfirmasi Password
                </label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        type="password"
                        placeholder="Ulangi password baru"
                        className="pl-10"
                        disabled={loading}
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                    </div>
                  )}
                />
                {errors.confirmPassword && (
                  <span className="text-xs font-bold text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="green"
                size="lg"
                className="w-full"
                loading={loading}
                label="SIMPAN PASSWORD"
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
