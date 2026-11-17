"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import { toast } from "sonner";
import { useAccountResource } from "@/lib/auth/use-account-resource";
import { fetchAccountCart } from "@/lib/cart/cart.client";
import type { CartChange, CartState } from "@/lib/cart/types/cart.interface";
import {
  guestCart,
  updateGuestCart,
  useGuestShopping,
} from "@/lib/guest-shopping/guest-shopping.client";
import { useGuestTransfer } from "@/lib/guest-shopping/guest-transfer.client";
import type { ProductSummary } from "@/lib/products/types/product.interface";
import type { CartContextValue } from "./@type";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const cart = useAccountResource(
    fetchAccountCart,
    "Your cart could not be updated.",
  );
  const guest = useGuestShopping();
  const transfer = useGuestTransfer(cart.accountEmail);
  const state: CartState =
    cart.accountEmail === null && guest
      ? { status: "ready", data: guestCart(guest.cart) }
      : cart.state;
  const cartCount =
    state.status === "ready"
      ? state.data.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

  function update(change: CartChange, product?: ProductSummary) {
    if (cart.accountEmail === null)
      return updateGuestCart(change, product).catch((error: unknown) => {
        toast.error(
          error instanceof Error && !(error instanceof DOMException)
            ? error.message
            : "Your browser couldn’t save the cart.",
        );
        return false;
      });
    const productId = "productId" in change ? change.productId : null;
    if (productId ? transfer.isCartItemSyncing(productId) : transfer.syncing)
      return Promise.resolve(false);
    return cart.update(change, productId);
  }

  return (
    <CartContext.Provider
      value={{
        ...cart,
        state,
        cartCount,
        updating: cart.updating || transfer.syncing,
        isProductUpdating: (productId) =>
          cart.isProductUpdating(productId) ||
          transfer.isCartItemSyncing(productId),
        update,
        addToCart: (product, quantity = 1) =>
          update({ type: "add", productId: product.id, quantity }, product),
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
