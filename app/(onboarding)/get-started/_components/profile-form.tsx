"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const createProfileSchema = (tVal: (key: string) => string) =>
  z.object({
    name: z.string().min(1, tVal("required")),
    age: z.string().min(1, tVal("required")),
    gender: z.string().min(1, tVal("required")),
    nickname: z.string().optional(),
  });

type ProfileValues = z.infer<ReturnType<typeof createProfileSchema>>;

type Props = {
  onNext: (data: ProfileValues) => void;
};

export function ProfileForm({ onNext }: Props) {
  const t = useTranslations("onboarding.profile");
  const tVal = useTranslations("auth.validation");

  const profileSchema = createProfileSchema(tVal);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      nickname: "",
    },
  });

  return (
    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
        {t("title")}
      </h1>
      <form onSubmit={handleSubmit(onNext)} className="w-full space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {t("fields.name")}
          </label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t("fields.namePlaceholder")}
                status={errors.name ? "incorrect" : "idle"}
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {t("fields.age")}
            </label>
            <Controller
              control={control}
              name="age"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="25"
                  status={errors.age ? "incorrect" : "idle"}
                />
              )}
            />
            {errors.age && (
              <span className="text-red-500 text-xs">{tVal("required")}</span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {t("fields.gender.label")}
            </label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full h-[52px] px-4 rounded-2xl border-[3px] border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                >
                  <option value="">{t("fields.gender.options.select")}</option>
                  <option value="male">
                    {t("fields.gender.options.male")}
                  </option>
                  <option value="female">
                    {t("fields.gender.options.female")}
                  </option>
                  <option value="other">
                    {t("fields.gender.options.other")}
                  </option>
                </select>
              )}
            />
            {errors.gender && (
              <span className="text-red-500 text-xs">{tVal("required")}</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {t("fields.nickname")}
          </label>
          <Controller
            control={control}
            name="nickname"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Mr. John"
                status={errors.nickname ? "incorrect" : "idle"}
              />
            )}
          />
        </div>
        <Button type="submit" variant="green" size="lg" className="w-full mt-4">
          {t("continue")}
        </Button>
      </form>
    </div>
  );
}
