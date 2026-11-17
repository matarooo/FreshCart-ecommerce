"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useCart } from "@/components/CartProvider/CartProvider";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import {
  skipGuestCartItem,
  syncGuestShopping,
  useGuestTransfer,
} from "@/lib/guest-shopping/guest-transfer.client";
import type { GuestTransferNoticeProps } from "./@type";

export function GuestTransferNotice({ email }: GuestTransferNoticeProps) {
  const { refresh: refreshCart } = useCart();
  const { refresh: refreshWishlist } = useWishlist();
  const { syncing, error, transfer } = useGuestTransfer(email);
  const retry = useCallback(
    () =>
      syncGuestShopping(email, () =>
        Promise.all([refreshCart(), refreshWishlist()]),
      ),
    [email, refreshCart, refreshWishlist],
  );
  useEffect(() => {
    if (!syncing && !error) void retry();
  }, [error, retry, syncing]);

  if (syncing || !error)
    return (
      <output className="block rounded-xl border border-gray-200 bg-white p-5 text-sm text-muted">
        Syncing your cart and wishlist…
      </output>
    );

  return (
    <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <p role="alert" className="text-sm text-amber-900">
        {error}
      </p>
      {transfer?.cart.length ? (
        <ul className="mt-3 space-y-2 text-sm">
          {transfer.cart.map(({ item, issue }) => (
            <li
              key={item.productId}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p>
                  {item.title} × {item.quantity}
                </p>
                {issue && (
                  <p className="mt-1 text-xs text-amber-900">{issue}</p>
                )}
              </div>
              <button
                type="button"
                className="text-sm font-medium text-amber-900 underline underline-offset-2"
                aria-label={`Skip transferring ${item.title}`}
                onClick={() =>
                  void skipGuestCartItem(email, item.productId)
                    .then(retry)
                    .catch(() =>
                      toast.error(
                        "Your browser couldn’t update the pending items.",
                      ),
                    )
                }
              >
                Skip This Item
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {transfer?.wishlist.length ? (
        <p className="mt-3 text-sm text-amber-900">
          {transfer.wishlist.length}{" "}
          {transfer.wishlist.length === 1
            ? "wishlist item is"
            : "wishlist items are"}{" "}
          still waiting to sync.
        </p>
      ) : null}
      <button
        type="button"
        className="store-button mt-4"
        onClick={() => void retry()}
      >
        Retry Sync
      </button>
    </section>
  );
}
