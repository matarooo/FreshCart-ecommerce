"use client";

import { useSyncExternalStore } from "react";
import { isInStock, toSummary } from "./catalog";
import type { ProductSummary } from "./products/types/product.interface";

type CartItem = { product: ProductSummary; quantity: number };
type CommerceState = { cart: CartItem[]; wishlist: ProductSummary[] };
const storageKey = "freshcart-shopping-v2";
const changeEvent = "freshcart-shopping-change";
const emptyState: CommerceState = { cart: [], wishlist: [] };
let fallback = JSON.stringify(emptyState);
let memoryOnly = false;

function readSnapshot() {
  if (memoryOnly) return fallback;
  try {
    return localStorage.getItem(storageKey) ?? fallback;
  } catch {
    return fallback;
  }
}

function isProduct(value: unknown): value is ProductSummary {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.imageCover === "string" &&
    typeof item.price === "number" &&
    typeof item.quantity === "number" &&
    typeof (item.category as { name?: unknown } | undefined)?.name === "string"
  );
}

// Every useCommerce() instance reads the same string, so parse it once per change.
let parsed = { raw: "", state: emptyState };

function parseSnapshot(raw: string): CommerceState {
  if (raw !== parsed.raw) parsed = { raw, state: parseRaw(raw) };
  return parsed.state;
}

function parseRaw(raw: string): CommerceState {
  try {
    const value = JSON.parse(raw);
    const cart: CartItem[] = [];
    for (const item of Array.isArray(value.cart) ? value.cart : []) {
      if (
        isProduct(item?.product) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        !cart.some((entry) => entry.product.id === item.product.id)
      )
        cart.push({
          product: item.product,
          quantity: Math.min(item.quantity, item.product.quantity),
        });
    }
    const wishlist: ProductSummary[] = [];
    for (const product of Array.isArray(value.wishlist) ? value.wishlist : []) {
      if (isProduct(product) && !wishlist.some((p) => p.id === product.id))
        wishlist.push(product);
    }
    return { cart, wishlist };
  } catch {
    return emptyState;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function update(change: (state: CommerceState) => CommerceState) {
  fallback = JSON.stringify(change(parseSnapshot(readSnapshot())));
  try {
    localStorage.setItem(storageKey, fallback);
  } catch {
    memoryOnly = true;
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function useCommerce() {
  const raw = useSyncExternalStore(subscribe, readSnapshot, () => "");
  const state = parseSnapshot(raw);
  return {
    ...state,
    ready: raw !== "",
    cartCount: state.cart.reduce((total, item) => total + item.quantity, 0),
    isWishlisted(id: string) {
      return state.wishlist.some((product) => product.id === id);
    },
    addToCart(product: ProductSummary, quantity = 1) {
      if (!Number.isInteger(quantity) || quantity < 1 || !isInStock(product))
        return;
      update((current) => {
        const existing = current.cart.find(
          (item) => item.product.id === product.id,
        );
        const item = {
          product: toSummary(product),
          quantity: Math.min(
            (existing?.quantity ?? 0) + quantity,
            product.quantity,
          ),
        };
        return {
          ...current,
          cart: existing
            ? current.cart.map((entry) => (entry === existing ? item : entry))
            : [...current.cart, item],
        };
      });
    },
    setQuantity(id: string, quantity: number) {
      if (!Number.isInteger(quantity) || quantity < 1) return;
      update((current) => ({
        ...current,
        cart: current.cart.map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.min(quantity, item.product.quantity) }
            : item,
        ),
      }));
    },
    removeFromCart(id: string) {
      update((current) => ({
        ...current,
        cart: current.cart.filter((item) => item.product.id !== id),
      }));
    },
    clearCart() {
      update((current) => ({ ...current, cart: [] }));
    },
    toggleWishlist(product: ProductSummary) {
      update((current) => ({
        ...current,
        wishlist: current.wishlist.some((item) => item.id === product.id)
          ? current.wishlist.filter((item) => item.id !== product.id)
          : [...current.wishlist, toSummary(product)],
      }));
    },
  };
}
