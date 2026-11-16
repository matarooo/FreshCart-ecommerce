"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  egyptianPhoneError,
  normalizeEgyptianMobile,
} from "@/lib/addresses/egyptian-phone";
import { CommerceApiError } from "@/lib/api/commerce-request";
import { updatePassword, updateProfile } from "@/lib/auth/account.api";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceToken } from "@/lib/auth/commerce-session";
import { newPasswordSchema } from "@/lib/auth/password.schema";
import type { AccountActionResult } from "@/lib/auth/types/account.interface";
import { refreshAccountProfile, signOut } from "../../../authjs/authjs";

const settingsUrl = "/account?tab=settings";
const profileSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  phone: z.string().trim(),
});
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    password: newPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function saveProfile(
  accountEmail: string,
  _previous: AccountActionResult | null,
  form: FormData,
): Promise<AccountActionResult> {
  const result = profileSchema.safeParse(Object.fromEntries(form));
  if (!result.success)
    return { ok: false, message: result.error.issues[0].message };
  const { name, email, phone } = result.data;
  const normalizedPhone = phone ? normalizeEgyptianMobile(phone) : undefined;
  if (normalizedPhone === null)
    return { ok: false, message: egyptianPhoneError };
  const profile = { name, email, phone: normalizedPhone };

  const token = await getCommerceToken(accountEmail);
  if (!token) redirect(loginHref(settingsUrl));
  try {
    await updateProfile(token, profile);
  } catch (error) {
    if (error instanceof CommerceApiError && [401, 403].includes(error.status))
      redirect(loginHref(settingsUrl));
    return {
      ok: false,
      message:
        error instanceof CommerceApiError &&
        [400, 409, 422].includes(error.status)
          ? "Check that the email address is available and the profile details are valid."
          : "Your profile could not be saved. Try again.",
    };
  }

  const updatedSession = await refreshAccountProfile(token, profile).catch(
    () => null,
  );
  if (
    updatedSession?.user?.email !== email ||
    updatedSession?.user?.name !== name
  )
    await signInAgain();
  return { ok: true, message: "Profile saved." };
}

export async function changePassword(
  accountEmail: string,
  _previous: AccountActionResult | null,
  form: FormData,
): Promise<AccountActionResult> {
  const result = passwordSchema.safeParse(Object.fromEntries(form));
  if (!result.success)
    return { ok: false, message: result.error.issues[0].message };
  const token = await getCommerceToken(accountEmail);
  if (!token) redirect(loginHref(settingsUrl));
  try {
    await updatePassword(
      token,
      result.data.currentPassword,
      result.data.password,
    );
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof CommerceApiError &&
        [400, 401, 403, 422].includes(error.status)
          ? "Check your current password or sign in again and retry."
          : "Your password could not be changed. Try again.",
    };
  }
  return signInAgain();
}

async function signInAgain(): Promise<never> {
  await signOut({ redirect: false });
  redirect(loginHref(settingsUrl));
}
