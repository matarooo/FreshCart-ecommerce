"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import { useAccountResource } from "@/lib/auth/use-account-resource";
import type { ProductSummary } from "@/lib/products/types/product.interface";
import { fetchAccountWishlist } from "@/lib/wishlist/wishlist.client";
import type { WishlistContextValue } from "./@type";

const WishlistContext = createContext<WishlistContextValue | null>(null);
const emptyWishlist: ProductSummary[] = [];

export function WishlistProvider({ children }: PropsWithChildren) {
  const wishlist = useAccountResource(
    fetchAccountWishlist,
    "Your wishlist could not be updated.",
  );
  const products =
    wishlist.state.status === "ready"
      ? wishlist.state.data.products
      : emptyWishlist;
  const isSaved = (productId: string) =>
    products.some((product) => product.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        state: wishlist.state,
        products,
        isSaved,
        isProductUpdating: wishlist.isProductUpdating,
        bindAccount: wishlist.bindAccount,
        refresh: wishlist.refresh,
        toggle: (productId) =>
          wishlist.update({ productId, saved: !isSaved(productId) }, productId),
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
