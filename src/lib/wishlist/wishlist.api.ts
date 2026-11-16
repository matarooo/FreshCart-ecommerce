import "server-only";

import type { Wishlist, WishlistChange } from "./types/wishlist.interface";
import { wishlistResponseSchema } from "./wishlist.schema";

export class WishlistApiError extends Error {
  constructor(public readonly status: number) {
    super(`Wishlist API returned ${status}.`);
  }
}

async function requestWishlist(token: string, change?: WishlistChange) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("Missing wishlist API base URL.");

  const removing = change?.saved === false;
  const productPath = removing
    ? `/${encodeURIComponent(change.productId)}`
    : "";
  const headers = new Headers({ token });
  let body: string | undefined;
  if (change?.saved) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify({ productId: change.productId });
  }

  const response = await fetch(`${baseUrl}/api/v1/wishlist${productPath}`, {
    method: change ? (removing ? "DELETE" : "POST") : "GET",
    headers,
    body,
    cache: "no-store",
  });
  if (!response.ok) throw new WishlistApiError(response.status);
  return response;
}

export async function getWishlist(token: string): Promise<Wishlist> {
  const response = await requestWishlist(token);
  const { data } = wishlistResponseSchema.parse(await response.json());
  return {
    products: data.map(({ _id, priceAfterDiscount, ...product }) => ({
      ...product,
      id: _id,
      priceAfterDiscount: priceAfterDiscount ?? undefined,
    })),
  };
}

export async function updateWishlist(token: string, change: WishlistChange) {
  await requestWishlist(token, change);
  // Write endpoints return saved IDs. Read back the products for the storefront.
  return getWishlist(token);
}
