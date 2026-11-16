"use server";

import { z } from "zod";
import { signUpSchema } from "@/components/AuthForm/AuthFormSchema";

const validationError = z.object({ msg: z.string() });
const registrationResponse = z.object({
  message: z.string().optional(),
  errors: z
    .union([validationError, z.array(validationError)])
    .optional()
    .catch(undefined),
});

async function readRegistrationMessage(response: Response) {
  const result = registrationResponse.safeParse(
    await response.json().catch(() => null),
  );
  if (!result.success) return undefined;

  const { message, errors } = result.data;
  const validationMessage = Array.isArray(errors)
    ? errors[0]?.msg
    : errors?.msg;

  return [message, validationMessage]
    .map((value) => value?.trim())
    .find(
      (value) =>
        value &&
        value.length <= 180 &&
        !/^(success|fail(?:ed)?|error)[.!]?$/i.test(value),
    );
}

export async function signUp(formData: FormData) {
  const result = signUpSchema.safeParse({
    ...Object.fromEntries(formData),
    terms: formData.get("terms") === "on",
  });
  if (!result.success)
    return { ok: false, message: "Check your registration details." };

  const unavailable =
    "Account creation is unavailable right now. Please try again.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) return { ok: false, message: unavailable };

  const { name, email, password, confirmPassword, phone } = result.data;

  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        rePassword: confirmPassword,
        phone,
      }),
    });

    const rejected = [400, 409, 422].includes(response.status);
    if (!response.ok && !rejected) return { ok: false, message: unavailable };
    const message = await readRegistrationMessage(response);
    if (response.ok)
      return {
        ok: true,
        message: message || "Your account was created. You’re signed in.",
      };
    return {
      ok: false,
      message:
        message ||
        "Check your registration details or sign in if you already have an account.",
    };
  } catch {
    return { ok: false, message: unavailable };
  }
}
