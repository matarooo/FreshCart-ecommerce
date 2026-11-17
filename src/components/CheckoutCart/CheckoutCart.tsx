"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import { CheckoutForm } from "@/components/CheckoutForm/CheckoutForm";
import { GuestTransferNotice } from "@/components/GuestTransferNotice/GuestTransferNotice";
import { loginHref } from "@/lib/auth/account-resource.client";
import { cartReview } from "@/lib/cart/cart-review";
import { useGuestTransfer } from "@/lib/guest-shopping/guest-transfer.client";
import type { CheckoutCartProps } from "./@type";

export function CheckoutCart({ email, addresses }: CheckoutCartProps) {
  const { state, accountEmail, refresh } = useCart();
  const transfer = useGuestTransfer(email);

  if (
    accountEmail === null ||
    (accountEmail === email && state.status === "sign-in")
  )
    return (
      <Link href={loginHref("/checkout")} className="store-button">
        Sign In to Check Out
      </Link>
    );

  if (!transfer.loaded || accountEmail !== email || state.status === "loading")
    return (
      <output className="block text-sm text-muted">Loading checkout…</output>
    );

  if (transfer.syncing || transfer.pendingCart)
    return <GuestTransferNotice email={email} />;

  if (
    state.status !== "ready" ||
    (state.data.items.length > 0 && !state.data.id)
  )
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p role="alert" className="text-sm text-muted">
          Checkout is temporarily unavailable.
        </p>
        <button
          type="button"
          onClick={() => void refresh()}
          className="store-button mt-4"
        >
          Reload Cart
        </button>
      </div>
    );

  const cart = state.data;
  return (
    <div className="space-y-5">
      {transfer.pendingWishlist && <GuestTransferNotice email={email} />}
      {cart.items.length ? (
        <CheckoutForm
          email={email}
          review={cartReview(cart)}
          addresses={addresses}
          cart={cart}
        />
      ) : (
        <p className="text-sm text-muted">Your cart is empty.</p>
      )}
    </div>
  );
}
