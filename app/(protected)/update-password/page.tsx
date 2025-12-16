"use client";
import * as React from "react";
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
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
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
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memperbarui password");
      }

      setMessage({
        type: "success",
        text: "Password berhasil diperbarui. Mengalihkan...",
      });
      setTimeout(() => {
        router.push("/learn");
      }, 2000);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Gagal memperbarui password";
      setMessage({
        type: "error",
        text: message,
      });
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
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      type="password"
                      placeholder="Masukkan password baru"
                      disabled={loading}
                      prefix={<Lock className="h-5 w-5 text-neutral-400" />}
                      status={errors.password ? "incorrect" : "idle"}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Konfirmasi Password
                </label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      type="password"
                      placeholder="Ulangi password baru"
                      disabled={loading}
                      prefix={<Lock className="h-5 w-5 text-neutral-400" />}
                      status={errors.confirmPassword ? "incorrect" : "idle"}
                      helperText={errors.confirmPassword?.message}
                    />
                  )}
                />
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
