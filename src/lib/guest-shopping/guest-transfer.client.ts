"use client";

import { useSyncExternalStore } from "react";
import type { AccountResourceState } from "@/lib/auth/types/account-resource.interface";
import { fetchAccountCart, mergeAccountCartItem } from "@/lib/cart/cart.client";
import { fetchAccountWishlist } from "@/lib/wishlist/wishlist.client";
import {
  readGuestShopping,
  useGuestShopping,
  withGuestShoppingLock,
  writeGuestShopping,
} from "./guest-shopping.client";
import type {
  GuestTransfer,
  GuestTransferStatus,
} from "./types/guest-shopping.interface";

const idle: GuestTransferStatus = { syncing: false };
const statusByAccount = new Map<string, GuestTransferStatus>();
const inFlight = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setStatus(email: string, status: GuestTransferStatus) {
  statusByAccount.set(email, status);
  for (const listener of listeners) listener();
}

export function useGuestTransfer(email: string | null | undefined) {
  const shopping = useGuestShopping();
  const status = useSyncExternalStore(
    subscribe,
    () => (email && statusByAccount.get(email)) || idle,
    () => idle,
  );
  const transfer = email
    ? shopping?.transfers.find((entry) => entry.email === email)
    : undefined;
  return {
    ...status,
    loaded: shopping !== null,
    pendingCart: Boolean(shopping?.cart.length || transfer?.cart.length),
    pendingWishlist: Boolean(
      shopping?.wishlist.length || transfer?.wishlist.length,
    ),
    isCartItemSyncing: (productId: string) =>
      status.syncing &&
      Boolean(
        shopping?.cart.some((item) => item.productId === productId) ||
          transfer?.cart.some(({ item }) => item.productId === productId),
      ),
    isWishlistItemSyncing: (productId: string) =>
      status.syncing &&
      Boolean(
        shopping?.wishlist.some(({ id }) => id === productId) ||
          transfer?.wishlist.some(({ id }) => id === productId),
      ),
    transfer,
  };
}

function replaceTransfer(transfer: GuestTransfer) {
  const shopping = readGuestShopping();
  const transfers = shopping.transfers.filter(
    ({ email }) => email !== transfer.email,
  );
  if (transfer.cart.length || transfer.wishlist.length)
    transfers.push(transfer);
  writeGuestShopping({ ...shopping, transfers });
}

function requireAccount<Data>(state: AccountResourceState<Data>) {
  if (state.status !== "ready")
    throw new Error("Sign in again to sync your shopping items.");
  return state.data;
}

function claimGuestShopping(email: string) {
  const shopping = readGuestShopping();
  const existing = shopping.transfers.find((entry) => entry.email === email);
  if (existing) return existing;
  if (!shopping.cart.length && !shopping.wishlist.length) return undefined;

  const transfer = {
    email,
    cart: shopping.cart.map((item) => ({ item })),
    wishlist: shopping.wishlist,
  };
  writeGuestShopping({
    cart: [],
    wishlist: [],
    transfers: [...shopping.transfers, transfer],
  });
  return transfer;
}

async function syncCart(transfer: GuestTransfer) {
  if (!transfer.cart.length) return transfer;
  const initial = requireAccount(await fetchAccountCart(transfer.email));
  // Persist absolute quantities before the first write, including for products
  // already in the account cart. Retrying uses these same quantities.
  let pending = {
    ...transfer,
    cart: transfer.cart.map((entry) => ({
      ...entry,
      targetQuantity:
        entry.targetQuantity ??
        (initial.items.find((item) => item.productId === entry.item.productId)
          ?.quantity ?? 0) + entry.item.quantity,
    })),
  };
  replaceTransfer(pending);

  for (const { item, targetQuantity } of pending.cart) {
    let issue: string | undefined;
    try {
      const updated = requireAccount(
        await mergeAccountCartItem(
          transfer.email,
          item.productId,
          targetQuantity,
        ),
      );
      if (
        !updated.items.some(
          (entry) =>
            entry.productId === item.productId &&
            entry.quantity >= targetQuantity,
        )
      )
        issue = "The requested quantity could not be confirmed.";
    } catch (error) {
      issue =
        error instanceof Error
          ? error.message
          : "This item could not be synced.";
    }
    pending = {
      ...pending,
      cart: issue
        ? pending.cart.map((entry) =>
            entry.item.productId === item.productId
              ? { ...entry, issue }
              : entry,
          )
        : pending.cart.filter(
            (entry) => entry.item.productId !== item.productId,
          ),
    };
    replaceTransfer(pending);
  }
  return pending;
}

async function syncWishlist(transfer: GuestTransfer) {
  if (!transfer.wishlist.length) return transfer;
  let remote = requireAccount(await fetchAccountWishlist(transfer.email));
  let pending = transfer;
  for (const product of transfer.wishlist) {
    try {
      if (!remote.products.some(({ id }) => id === product.id))
        remote = requireAccount(
          await fetchAccountWishlist(transfer.email, {
            productId: product.id,
            saved: true,
          }),
        );
      if (!remote.products.some(({ id }) => id === product.id)) continue;
    } catch {
      continue;
    }
    pending = {
      ...pending,
      wishlist: pending.wishlist.filter(({ id }) => id !== product.id),
    };
    replaceTransfer(pending);
  }
  return pending;
}

async function syncGuestShoppingItems(email: string) {
  const shopping = readGuestShopping();
  const existing = shopping.transfers.some((entry) => entry.email === email);
  if (!existing && !shopping.cart.length && !shopping.wishlist.length) return;

  // Verify the current Auth.js account before assigning unclaimed browser items.
  if (existing || shopping.cart.length)
    requireAccount(await fetchAccountCart(email));
  else requireAccount(await fetchAccountWishlist(email));

  let transfer = claimGuestShopping(email);
  while (transfer) {
    const cart = await syncCart(transfer);
    const remaining = await syncWishlist(cart);
    if (remaining.cart.length || remaining.wishlist.length)
      throw new Error(
        "Some items couldn’t sync. Check availability and try again.",
      );
    transfer = claimGuestShopping(email);
  }
}

export function syncGuestShopping(
  email: string,
  refresh: () => Promise<unknown>,
) {
  const active = inFlight.get(email);
  if (active) return active;
  const shopping = readGuestShopping();
  if (
    !shopping.cart.length &&
    !shopping.wishlist.length &&
    !shopping.transfers.some((entry) => entry.email === email)
  )
    return Promise.resolve();

  setStatus(email, { syncing: true });
  const sync = withGuestShoppingLock(() => syncGuestShoppingItems(email))
    .then(
      () => undefined,
      (error: unknown) =>
        error instanceof Error
          ? error.message
          : "Your shopping items couldn’t sync.",
    )
    .then(async (error) => {
      await refresh().catch(() => {});
      inFlight.delete(email);
      setStatus(email, { syncing: false, error });
    });
  inFlight.set(email, sync);
  return sync;
}

export function skipGuestCartItem(email: string, productId: string) {
  return withGuestShoppingLock(() => {
    const transfer = readGuestShopping().transfers.find(
      (entry) => entry.email === email,
    );
    if (transfer)
      replaceTransfer({
        ...transfer,
        cart: transfer.cart.filter(({ item }) => item.productId !== productId),
      });
  });
}
