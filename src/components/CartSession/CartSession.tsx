"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import type { CartSessionProps } from "./@type";

export function CartSession({ email }: CartSessionProps) {
  const { bindAccount } = useCart();
  useEffect(() => bindAccount(email), [bindAccount, email]);
  return null;
}
