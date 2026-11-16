import "server-only";

import { z } from "zod";
import { commerceRequest } from "@/lib/api/commerce-request";
import type { AccountIdentity, ProfileUpdate } from "./types/account.interface";

export const commerceId = z.string().regex(/^[a-f0-9]{24}$/i);
const accountIdentity = z.object({
  decoded: z.object({
    id: commerceId,
    role: z.string().optional().catch(undefined),
  }),
});

export async function verifyCommerceAccount(
  token: string,
): Promise<AccountIdentity> {
  const result = await commerceRequest("v1/auth/verifyToken", token);
  return accountIdentity.parse(await result.json()).decoded;
}

export async function updateProfile(token: string, profile: ProfileUpdate) {
  await commerceRequest("v1/users/updateMe/", token, "PUT", profile);
}

export async function updatePassword(
  token: string,
  currentPassword: string,
  password: string,
) {
  await commerceRequest("v1/users/changeMyPassword", token, "PUT", {
    currentPassword,
    password,
    rePassword: password,
  });
}
