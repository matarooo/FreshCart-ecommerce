import { fetchAccountResource } from "@/lib/auth/account-resource.client";
import type { Cart, CartChange, CartState } from "./types/cart.interface";

export function fetchAccountCart(
  account: string,
  change?: CartChange,
): Promise<CartState> {
  return fetchAccountResource<Cart>(
    "/api/cart",
    "x-cart-account",
    account,
    change,
  );
}
