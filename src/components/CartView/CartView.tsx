"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { QuantitySelector } from "@/components/QuantitySelector/QuantitySelector";
import { cartLoginHref } from "@/lib/cart/cart.client";
import { formatPrice } from "@/lib/catalog";
export function CartView() {
  const { state, cartCount, updating, isProductUpdating, refresh, update } =
    useCart();
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
        <Link href={cartLoginHref("/cart")} className="store-button mt-7">
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
  const { items, total } = state.cart;
  if (!items.length)
    return (
      <div className="store-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="mb-7 flex size-28 items-center justify-center rounded-full bg-gray-100 text-gray-300">
          <StoreIcon name="box" className="size-12" />
        </span>
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          Looks like you haven’t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>
        <Link
          href="/shop"
          className="store-button mt-7 shadow-lg shadow-green-900/10"
        >
          Start Shopping
          <StoreIcon name="arrow" className="size-4" />
        </Link>
      </div>
    );
  return (
    <div className="store-container min-h-[65vh] py-7 sm:py-9">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex gap-2 text-xs text-muted"
      >
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Shopping Cart</span>
      </nav>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
          <StoreIcon name="cart" className="size-7" />
        </span>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Shopping Cart
        </h1>
      </div>
      <p className="mt-3 text-sm text-muted">
        You have{" "}
        <span className="font-semibold text-brand">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>{" "}
        in your cart
      </p>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="space-y-4">
            {items.map(
              ({
                productId,
                title,
                imageCover,
                category,
                stock,
                quantity,
                unitPrice,
              }) => (
                <article
                  key={productId}
                  className="flex flex-wrap items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <Link
                    href={`/products/${productId}`}
                    className="shrink-0 rounded-xl border border-gray-100 bg-gray-50 p-2"
                  >
                    {imageCover ? (
                      <Image
                        src={imageCover}
                        alt={title}
                        width={92}
                        height={104}
                        className="h-24 w-20 object-contain"
                      />
                    ) : (
                      <StoreIcon
                        name="box"
                        className="h-24 w-20 p-4 text-gray-300"
                      />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${productId}`}
                      className="text-sm font-semibold hover:text-brand sm:text-base"
                    >
                      {title}
                    </Link>
                    {category && (
                      <p className="mt-2">
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] text-brand">
                          {category}
                        </span>
                      </p>
                    )}
                    <p className="mt-3 text-sm font-bold text-brand">
                      {formatPrice(unitPrice)}
                    </p>
                    <div className="mt-4">
                      <QuantitySelector
                        value={quantity}
                        max={stock ?? Number.MAX_SAFE_INTEGER}
                        disabled={isProductUpdating(productId)}
                        onChange={(value) =>
                          void update({
                            type: "quantity",
                            productId,
                            quantity: value,
                          })
                        }
                        label={title}
                      />
                    </div>
                  </div>
                  <div className="ml-auto flex items-end gap-3 self-end">
                    <div className="text-right">
                      <p className="mb-1 text-[10px] text-gray-400">Total</p>
                      <p className="text-sm font-bold text-slate-900">
                        {formatPrice(unitPrice * quantity)}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${title} from cart`}
                      disabled={isProductUpdating(productId)}
                      onClick={() => void update({ type: "remove", productId })}
                      className="flex size-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100"
                    >
                      <StoreIcon name="trash" className="size-4" />
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5 text-xs">
            <Link href="/shop" className="text-brand hover:underline">
              ← Continue Shopping
            </Link>
            <button
              type="button"
              disabled={updating}
              onClick={() => void update({ type: "clear" })}
              className="flex cursor-pointer items-center gap-2 text-muted hover:text-rose-500"
            >
              <StoreIcon name="trash" className="size-3" />
              Clear all items
            </button>
          </div>
        </div>
        <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <h2 className="bg-slate-900 px-5 py-5 font-semibold text-white">
            Order Summary
          </h2>
          <div className="p-5">
            <dl className="space-y-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Subtotal ({cartCount} items)</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-right text-brand">
                  Calculated at checkout
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-5 font-bold">
                <dt>Estimated Total</dt>
                <dd className="text-brand">{formatPrice(total)}</dd>
              </div>
            </dl>
            <ul className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-xs text-muted">
              {[
                "Your cart items will be saved",
                "Track your orders easily",
                "Access exclusive member deals",
              ].map((text) => (
                <li key={text} className="flex gap-2">
                  <StoreIcon name="check" className="size-3" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
