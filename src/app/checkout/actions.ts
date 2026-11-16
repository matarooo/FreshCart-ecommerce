"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { shippingAddressSchema } from "@/lib/addresses/address.schema";
import {
  egyptianPhoneError,
  normalizeEgyptianMobile,
} from "@/lib/addresses/egyptian-phone";
import { CommerceApiError } from "@/lib/api/commerce-request";
import { getCommerceToken } from "@/lib/auth/commerce-session";
import { CartApiError, getCart } from "@/lib/cart/cart.api";
import { cartReview } from "@/lib/cart/cart-review";
import { createCashOrder, createCheckoutSession } from "@/lib/orders/order.api";
import type { CheckoutResult } from "@/lib/orders/types/checkout.interface";

const checkoutInput = shippingAddressSchema.extend({
  phone: z.string().transform((phone, context) => {
    const normalized = normalizeEgyptianMobile(phone);
    if (normalized) return normalized;
    context.addIssue({ code: "custom", message: egyptianPhoneError });
    return z.NEVER;
  }),
  payment: z.enum(["cash", "card"]),
  postalCode: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9 -]{3,12}$/)
    .optional(),
});

async function checkoutOrigin() {
  const configured = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  const supplied = (await headers()).get("origin");
  const url = new URL(configured || supplied || "");
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Invalid checkout origin.");
  return url.origin;
}

export async function placeOrder(
  email: string,
  expectedReview: string,
  _previous: CheckoutResult | null,
  form: FormData,
): Promise<CheckoutResult> {
  const postalCode = form.get("postalCode");
  const input = checkoutInput.safeParse({
    city: form.get("city"),
    details: form.get("details"),
    phone: form.get("phone"),
    payment: form.get("payment"),
    postalCode: postalCode || undefined,
  });
  if (!input.success)
    return {
      message: input.error.issues.some((issue) => issue.path[0] === "phone")
        ? egyptianPhoneError
        : "Check your delivery address, payment method, and postal code.",
    };

  try {
    const token = await getCommerceToken(email);
    if (!token) return { message: "Sign in again to continue to checkout." };
    const cart = await getCart(token);
    if (!cart.items.length || !cart.id || cartReview(cart) !== expectedReview)
      return {
        message:
          "Your cart changed. Reload checkout to review the current items and total.",
      };

    const { payment, ...shippingAddress } = input.data;
    if (payment === "card") {
      const nextUrl = await createCheckoutSession(
        token,
        cart.id,
        shippingAddress,
        await checkoutOrigin(),
      );
      return { nextUrl };
    }
    await createCashOrder(token, cart.id, shippingAddress);
  } catch (error) {
    if (
      (error instanceof CommerceApiError || error instanceof CartApiError) &&
      [401, 403].includes(error.status)
    )
      return { message: "Sign in again to continue to checkout." };
    return {
      message:
        input.data.payment === "cash"
          ? "We couldn’t confirm the order. Check My Orders before trying again."
          : "Online checkout is unavailable right now. Try again from your cart.",
    };
  }

  return { nextUrl: "/account/orders" };
}
