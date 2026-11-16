import { fetchAccountResource } from "@/lib/auth/account-resource.client";
import type {
  Wishlist,
  WishlistChange,
  WishlistState,
} from "./types/wishlist.interface";

export function fetchAccountWishlist(
  account: string,
  change?: WishlistChange,
): Promise<WishlistState> {
  return fetchAccountResource<Wishlist>(
    "/api/wishlist",
    "x-wishlist-account",
    account,
    change,
  );
}
