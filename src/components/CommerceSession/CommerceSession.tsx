"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import type { CommerceSessionProps } from "./@type";

export function CommerceSession({ email }: CommerceSessionProps) {
  const { bindAccount: bindCart } = useCart();
  const { bindAccount: bindWishlist } = useWishlist();
  useEffect(() => {
    bindCart(email);
    bindWishlist(email);
  }, [bindCart, bindWishlist, email]);
  return null;
}
