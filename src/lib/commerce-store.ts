"use client";

import { useSyncExternalStore } from "react";
import { toSummary } from "./catalog";
import type { ProductSummary } from "./products/types/product.interface";

type CommerceState = { wishlist: ProductSummary[] };
const storageKey = "freshcart-shopping-v2";
const changeEvent = "freshcart-shopping-change";
const emptyState: CommerceState = { wishlist: [] };
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
    const wishlist: ProductSummary[] = [];
    for (const product of Array.isArray(value.wishlist) ? value.wishlist : []) {
      if (isProduct(product) && !wishlist.some((p) => p.id === product.id))
        wishlist.push(product);
    }
    return { wishlist };
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
    isWishlisted(id: string) {
      return state.wishlist.some((product) => product.id === id);
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
