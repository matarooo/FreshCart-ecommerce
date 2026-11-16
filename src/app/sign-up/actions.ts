"use server";

import { signUpSchema } from "@/components/AuthForm/AuthFormSchema";
import { register } from "@/lib/auth/auth.api";

export async function signUp(formData: FormData) {
  const result = signUpSchema.safeParse({
    ...Object.fromEntries(formData),
    terms: formData.get("terms") === "on",
  });
  if (!result.success)
    return { ok: false, message: "Check your registration details." };

  const { name, email, password, confirmPassword, phone } = result.data;
  return register({
    name,
    email,
    password,
    rePassword: confirmPassword,
    phone,
  });
}
