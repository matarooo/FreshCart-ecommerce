"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import { useAccountResource } from "@/lib/auth/use-account-resource";
import { fetchAccountCart } from "@/lib/cart/cart.client";
import type { CartChange } from "@/lib/cart/types/cart.interface";
import type { CartContextValue } from "./@type";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const cart = useAccountResource(
    fetchAccountCart,
    "Your cart could not be updated.",
  );
  const cartCount =
    cart.state.status === "ready"
      ? cart.state.data.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

  function update(change: CartChange) {
    return cart.update(
      change,
      change.type === "clear" ? null : change.productId,
    );
  }

  return (
    <CartContext.Provider
      value={{
        ...cart,
        cartCount,
        update,
        addToCart: (productId, quantity = 1) =>
          update({ type: "add", productId, quantity }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart requires a CartProvider.");
  return cart;
}
