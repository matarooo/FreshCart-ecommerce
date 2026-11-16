import type { Cart, CartChange, CartState } from "./types/cart.interface";

export function cartLoginHref(callbackUrl: string) {
  return `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export async function fetchAccountCart(
  account: string,
  change?: CartChange,
): Promise<CartState> {
  const response = await fetch("/api/cart", {
    method: change ? "POST" : "GET",
    cache: "no-store",
    headers: {
      "x-cart-account": account,
      ...(change && { "Content-Type": "application/json" }),
    },
    body: change ? JSON.stringify(change) : undefined,
  });
  if (response.status === 401) return { status: "sign-in" };
  if (response.status === 409)
    throw new Error("Check product availability and try again.");
  if (!response.ok) throw new Error("Your cart is temporarily unavailable.");
  return { status: "ready", cart: (await response.json()) as Cart };
}
