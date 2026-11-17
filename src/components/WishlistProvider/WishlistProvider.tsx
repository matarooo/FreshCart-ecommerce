"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import { toast } from "sonner";
import { useAccountResource } from "@/lib/auth/use-account-resource";
import {
  toggleGuestWishlist,
  useGuestShopping,
} from "@/lib/guest-shopping/guest-shopping.client";
import { useGuestTransfer } from "@/lib/guest-shopping/guest-transfer.client";
import type { ProductSummary } from "@/lib/products/types/product.interface";
import type { WishlistState } from "@/lib/wishlist/types/wishlist.interface";
import { fetchAccountWishlist } from "@/lib/wishlist/wishlist.client";
import type { WishlistContextValue } from "./@type";

const WishlistContext = createContext<WishlistContextValue | null>(null);
const emptyWishlist: ProductSummary[] = [];

export function WishlistProvider({ children }: PropsWithChildren) {
  const wishlist = useAccountResource(
    fetchAccountWishlist,
    "Your wishlist could not be updated.",
  );
  const guest = useGuestShopping();
  const transfer = useGuestTransfer(wishlist.accountEmail);
  const state: WishlistState =
    wishlist.accountEmail === null && guest
      ? { status: "ready", data: { products: guest.wishlist } }
      : wishlist.state;
  const products =
    state.status === "ready" ? state.data.products : emptyWishlist;
  const isSaved = (productId: string) =>
    products.some((product) => product.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        state,
        accountEmail: wishlist.accountEmail,
        products,
        isSaved,
        isProductUpdating: (productId) =>
          wishlist.isProductUpdating(productId) ||
          transfer.isWishlistItemSyncing(productId),
        bindAccount: wishlist.bindAccount,
        refresh: wishlist.refresh,
        toggle: (product) => {
          if (wishlist.accountEmail === null)
            return toggleGuestWishlist(product).catch(() => {
              toast.error("Your browser couldn’t save the wishlist.");
              return false;
            });
          if (transfer.isWishlistItemSyncing(product.id))
            return Promise.resolve(false);
          return wishlist.update(
            { productId: product.id, saved: !isSaved(product.id) },
            product.id,
          );
        },
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const wishlist = useContext(WishlistContext);
  if (!wishlist) throw new Error("useWishlist requires a WishlistProvider.");
  return wishlist;
}
