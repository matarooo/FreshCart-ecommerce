"use server";

import { revalidatePath } from "next/cache";
import {
  addAddress,
  getAddresses,
  removeAddress,
} from "@/lib/addresses/address.api";
import {
  addressIdSchema,
  addressInputSchema,
} from "@/lib/addresses/address.schema";
import type { AddressActionResult } from "@/lib/addresses/types/address-action.interface";
import { getCommerceToken } from "@/lib/auth/commerce-session";

function refreshAddresses() {
  revalidatePath("/account");
  revalidatePath("/checkout");
}

export async function saveAddress(
  email: string,
  _previous: AddressActionResult | null,
  form: FormData,
): Promise<AddressActionResult> {
  const address = addressInputSchema.safeParse(Object.fromEntries(form));
  if (!address.success)
    return { ok: false, message: "Check your address and phone number." };

  try {
    const token = await getCommerceToken(email);
    if (!token)
      return { ok: false, message: "Sign in again to save an address." };
    await addAddress(token, address.data);
  } catch {
    return { ok: false, message: "The address could not be saved. Try again." };
  }
  refreshAddresses();
  return { ok: true, message: "Address saved." };
}

export async function deleteAddress(
  email: string,
  _previous: AddressActionResult | null,
  form: FormData,
): Promise<AddressActionResult> {
  const id = addressIdSchema.safeParse(form.get("addressId"));
  if (!id.success) return { ok: false, message: "Choose a saved address." };

  try {
    const token = await getCommerceToken(email);
    if (!token)
      return { ok: false, message: "Sign in again to remove an address." };
    const addresses = await getAddresses(token);
    if (addresses.some((address) => address.id === id.data))
      await removeAddress(token, id.data);
  } catch {
    return {
      ok: false,
      message: "The address could not be removed. Try again.",
    };
  }
  refreshAddresses();
  return { ok: true, message: "Address removed." };
}
