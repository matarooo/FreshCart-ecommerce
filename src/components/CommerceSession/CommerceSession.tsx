"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import { syncGuestShopping } from "@/lib/guest-shopping/guest-transfer.client";
import type { CommerceSessionProps } from "./@type";

export function CommerceSession({ email }: CommerceSessionProps) {
  const { bindAccount: bindCart, refresh: refreshCart } = useCart();
  const { bindAccount: bindWishlist, refresh: refreshWishlist } = useWishlist();
  useEffect(() => {
    bindCart(email);
    bindWishlist(email);
    if (email)
      void syncGuestShopping(email, () =>
        Promise.all([refreshCart(), refreshWishlist()]),
      );
  }, [bindCart, bindWishlist, email, refreshCart, refreshWishlist]);
  return null;
}
