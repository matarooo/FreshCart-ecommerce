"use client";

import { useSyncExternalStore } from "react";
import type {
  Cart,
  CartChange,
  CartItem,
} from "@/lib/cart/types/cart.interface";
import { finalPrice, toSummary } from "@/lib/catalog";
import type { ProductSummary } from "@/lib/products/types/product.interface";
import { guestShoppingSchema } from "./guest-shopping.schema";
import type { GuestShopping } from "./types/guest-shopping.interface";

const storageKey = "freshcart-guest-shopping-v1";
const emptyShopping: GuestShopping = { cart: [], wishlist: [], transfers: [] };
const listeners = new Set<() => void>();
let lastStored: string | null | undefined;
let snapshot = emptyShopping;
let fallbackLock = Promise.resolve();

export function readGuestShopping() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored !== lastStored) {
      lastStored = stored;
      snapshot = stored
        ? (guestShoppingSchema.safeParse(JSON.parse(stored)).data ??
          emptyShopping)
        : emptyShopping;
    }
  } catch {
    snapshot = emptyShopping;
  }
  return snapshot;
}

export function writeGuestShopping(next: GuestShopping) {
  const stored = JSON.stringify(next);
  window.localStorage.setItem(storageKey, stored);
  lastStored = stored;
  snapshot = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function onStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) listener();
  }
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useGuestShopping() {
  return useSyncExternalStore(subscribe, readGuestShopping, () => null);
}

export async function withGuestShoppingLock<T>(
  work: () => T | Promise<T>,
): Promise<T> {
  if (navigator.locks) return await navigator.locks.request(storageKey, work);
  const result = fallbackLock.then(work);
  fallbackLock = result.then(
    () => {},
    () => {},
  );
  return result;
}

export function guestCart(items: CartItem[]): Cart {
  return {
    items,
    total: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  };
}

export function updateGuestCart(change: CartChange, product?: ProductSummary) {
  return withGuestShoppingLock(() => {
    const shopping = readGuestShopping();
    const items = shopping.cart;
    switch (change.type) {
      case "add": {
        if (!product || product.id !== change.productId) return false;
        const current = items.find((item) => item.productId === product.id);
        const quantity = (current?.quantity ?? 0) + change.quantity;
        if (
          !Number.isSafeInteger(quantity) ||
          quantity < 1 ||
          quantity > product.quantity
        )
          throw new Error("That quantity isn’t available.");
        const item: CartItem = {
          productId: product.id,
          title: product.title,
          imageCover: product.imageCover,
          category: product.category.name,
          stock: product.quantity,
          quantity,
          unitPrice: finalPrice(product),
        };
        const cart = current
          ? items.map((entry) =>
              entry.productId === item.productId ? item : entry,
            )
          : [...items, item];
        writeGuestShopping({ ...shopping, cart });
        return true;
      }
      case "quantity": {
        const current = items.find(
          (item) => item.productId === change.productId,
        );
        if (!current) return false;
        const { quantity } = change;
        if (
          !Number.isSafeInteger(quantity) ||
          quantity < 1 ||
          quantity > (current.stock ?? Number.MAX_SAFE_INTEGER)
        )
          throw new Error("That quantity isn’t available.");
        writeGuestShopping({
          ...shopping,
          cart: items.map((item) =>
            item.productId === change.productId ? { ...item, quantity } : item,
          ),
        });
        return true;
      }
      case "remove":
        writeGuestShopping({
          ...shopping,
          cart: items.filter((item) => item.productId !== change.productId),
        });
        return true;
      case "clear":
        writeGuestShopping({ ...shopping, cart: [] });
        return true;
      case "coupon":
        return false;
    }
  });
}

export function toggleGuestWishlist(product: ProductSummary) {
  return withGuestShoppingLock(() => {
    const shopping = readGuestShopping();
    const existing = shopping.wishlist.some((item) => item.id === product.id);
    const wishlist = existing
      ? shopping.wishlist.filter((item) => item.id !== product.id)
      : [...shopping.wishlist, toSummary(product)];
    writeGuestShopping({ ...shopping, wishlist });
    return true;
  });
}
