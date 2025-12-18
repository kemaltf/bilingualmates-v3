import * as z from "zod";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

export const validationRules = {
  email: (t?: TranslationFn) =>
    z
      .string()
      .trim()
      .email(t ? t("emailInvalid") : "Invalid email format"),
  password: (t?: TranslationFn) =>
    z
      .string()
      .min(
        6,
        t ? t("minChar", { min: 6 }) : "Password must be at least 6 characters"
      ),
  username: (t?: TranslationFn) =>
    z
      .string()
      .trim()
      .min(
        3,
        t
          ? t("usernameMin", { min: 3 })
          : "Username must be at least 3 characters"
      ),
  required: (t?: TranslationFn) =>
    z.string().min(1, t ? t("required") : "Required"),
};

export const createLoginSchema = (t?: TranslationFn, tVal?: TranslationFn) => {
  return z.object({
    identifier: validationRules.required(tVal),
    password: validationRules.required(tVal),
  });
};

export const createRegisterSchema = (
  t?: TranslationFn,
  tVal?: TranslationFn
) => {
  return z
    .object({
      username: validationRules.username(tVal),
      email: validationRules.email(tVal),
      password: validationRules.password(tVal),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tVal ? tVal("passwordMismatch") : "Passwords do not match",
      path: ["confirmPassword"],
    });
};

// For API routes where we just want the base shape without refine for confirmPassword
export const registerBaseSchema = (t?: TranslationFn) =>
  z.object({
    username: validationRules.username(t),
    email: validationRules.email(t),
    password: validationRules.password(t),
  });

export const createForgotPasswordSchema = (
  t?: TranslationFn,
  tVal?: TranslationFn
) => {
  return z.object({
    email: validationRules.email(tVal),
  });
};

export const createUpdatePasswordSchema = (
  t?: TranslationFn,
  tVal?: TranslationFn
) => {
  return z
    .object({
      password: validationRules.password(tVal),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tVal ? tVal("passwordMismatch") : "Passwords do not match",
      path: ["confirmPassword"],
    });
};

export const calculatePasswordStrength = (pass: string) => {
  let score = 0;
  if (!pass) return 0;
  if (pass.length > 5) score++;
  if (pass.length > 7) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return score > 4 ? 4 : score;
};

export const checkPasswordRequirements = (password: string) => {
  return [
    { key: "length", met: (password || "").length >= 6 },
    { key: "lowercase", met: /[a-z]/.test(password || "") },
    { key: "uppercase", met: /[A-Z]/.test(password || "") },
    { key: "number", met: /[0-9]/.test(password || "") },
    { key: "special", met: /[^A-Za-z0-9]/.test(password || "") },
  ] as const;
};
