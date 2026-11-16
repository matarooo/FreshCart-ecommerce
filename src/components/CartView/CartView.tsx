"use client";

import Link from "next/link";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import { CartCouponForm } from "@/components/CartCouponForm/CartCouponForm";
import { CartLine } from "@/components/CartLine/CartLine";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { OrderSummary } from "@/components/OrderSummary/OrderSummary";
import { loginHref } from "@/lib/auth/account-resource.client";

export function CartView() {
  const { state, updating, refresh, update } = useCart();
  if (state.status === "loading")
    return (
      <output className="store-container block min-h-[60vh] py-12">
        Loading your cart…
      </output>
    );
  if (state.status === "sign-in")
    return (
      <div className="store-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Sign in to see your cart
        </h1>
        <Link href={loginHref("/cart")} className="store-button mt-7">
          Sign In
        </Link>
      </div>
    );
  if (state.status !== "ready")
    return (
      <div className="store-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart is temporarily unavailable
        </h1>
        <button
          type="button"
          onClick={() => void refresh()}
          className="store-button mt-7"
        >
          Try Again
        </button>
      </div>
    );
  const cart = state.data;
  if (!cart.items.length)
    return (
      <div className="store-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="mb-7 flex size-28 items-center justify-center rounded-full bg-gray-100 text-gray-300">
          <StoreIcon name="box" className="size-12" />
        </span>
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-3 text-sm text-muted">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link href="/shop" className="store-button mt-7">
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="store-container min-h-[65vh] py-7 sm:py-9">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex gap-2 text-sm text-muted"
      >
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-slate-900">
          Shopping Cart
        </span>
      </nav>
      <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-900 sm:text-3xl">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-green-600 to-green-800 text-white">
          <StoreIcon name="cart" className="size-8" />
        </span>
        Shopping Cart
      </h1>
      <p className="mt-2 text-muted">
        You have{" "}
        <strong className="font-semibold text-brand">
          {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
        </strong>{" "}
        in your cart
      </p>
      <div className="mt-8 grid items-start gap-7 lg:grid-cols-[minmax(0,2.05fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartLine key={item.productId} item={item} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5 text-sm">
            <Link href="/shop" className="text-brand hover:underline">
              ← Continue Shopping
            </Link>
            <button
              type="button"
              disabled={updating}
              onClick={() => void update({ type: "clear" })}
              className="flex cursor-pointer items-center gap-2 text-muted hover:text-rose-600 disabled:opacity-50"
            >
              <StoreIcon name="trash" className="size-3.5" /> Clear all items
            </button>
          </div>
        </div>
        <OrderSummary cart={cart}>
          <CartCouponForm />
          <Link
            href="/checkout"
            className="store-button min-h-14 w-full rounded-xl bg-linear-to-r from-green-600 to-green-800 shadow-lg shadow-green-900/15"
          >
            <AuthIcon name="lock" className="size-4" /> Secure Checkout
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
