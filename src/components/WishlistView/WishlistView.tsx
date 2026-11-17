"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import { GuestTransferNotice } from "@/components/GuestTransferNotice/GuestTransferNotice";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { WishlistCartButton } from "@/components/WishlistCartButton/WishlistCartButton";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import { loginHref } from "@/lib/auth/account-resource.client";
import { finalPrice, formatPrice, isInStock } from "@/lib/catalog";
import { useGuestTransfer } from "@/lib/guest-shopping/guest-transfer.client";
export function WishlistView() {
  const wishlist = useWishlist();
  const {
    products: items,
    state: wishlistState,
    accountEmail,
    toggle,
    refresh,
  } = wishlist;
  const signIn = accountEmail === null || wishlistState.status === "sign-in";
  const transfer = useGuestTransfer(accountEmail);
  const { state: cartState } = useCart();
  const cartProductIds = new Set(
    cartState.status === "ready"
      ? cartState.data.items.map((item) => item.productId)
      : [],
  );
  if (wishlistState.status === "loading")
    return (
      <output className="store-container block min-h-[60vh] py-12">
        Loading your wishlist…
      </output>
    );
  if (accountEmail && (transfer.syncing || transfer.pendingWishlist))
    return (
      <div className="store-container min-h-[60vh] py-8">
        <GuestTransferNotice email={accountEmail} />
      </div>
    );
  if (wishlistState.status === "error")
    return (
      <div className="store-container flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Your wishlist is temporarily unavailable
        </h1>
        <button
          type="button"
          className="store-button mt-6"
          onClick={() => void refresh()}
        >
          Try Again
        </button>
      </div>
    );
  if (!items.length)
    return (
      <div className="store-container flex min-h-screen flex-col items-center pt-20 pb-16 text-center">
        <span className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
          <StoreIcon name="heart" className="size-9" />
        </span>
        <h1 className="text-xl font-bold text-slate-900">
          Your wishlist is empty
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-5 text-muted">
          Browse products and save your favorites here.
          {signIn && " Sign in to sync your wishlist across devices."}
        </p>
        <Link
          href="/shop"
          className="store-button mt-6 min-h-12 w-full max-w-sm rounded-xl text-base"
        >
          Browse Products
          <StoreIcon name="arrow" className="size-4" />
        </Link>
        {signIn && (
          <Link
            href={loginHref("/wishlist")}
            className="store-outline-button mt-3 min-h-12 w-full max-w-sm rounded-xl text-base"
          >
            Sign In
          </Link>
        )}
      </div>
    );
  return (
    <>
      <header className="border-b border-gray-100 bg-white">
        <div className="store-container py-7">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex gap-2 text-xs text-muted"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Wishlist</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <StoreIcon name="heart" className="size-6 fill-current" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
              <p className="mt-1 text-xs text-muted">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="store-container min-h-[55vh] py-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="hidden grid-cols-[2.5fr_1fr_1fr_1.4fr] gap-5 bg-gray-50 px-5 py-4 text-xs text-muted md:grid">
            <span>Product</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {items.map((product) => (
            <article
              key={product.id}
              className="grid items-center gap-4 border-t border-gray-100 p-5 first:border-t-0 sm:grid-cols-2 md:grid-cols-[2.5fr_1fr_1fr_1.4fr] md:gap-5"
            >
              <Link
                href={`/products/${product.id}`}
                className="flex items-center gap-4 hover:text-brand"
              >
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={72}
                  height={80}
                  className="h-20 w-18 rounded-lg border border-gray-100 bg-gray-50 object-contain p-2"
                />
                <div>
                  <h2 className="text-sm font-medium">{product.title}</h2>
                  <p className="mt-2 text-xs text-muted">
                    {product.category.name}
                  </p>
                </div>
              </Link>
              <p className="text-sm font-semibold text-slate-900">
                {formatPrice(finalPrice(product))}
              </p>
              {cartProductIds.has(product.id) ? (
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs text-brand">
                  <StoreIcon name="cart" className="size-3" />
                  In Cart
                </span>
              ) : (
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs ${isInStock(product) ? "bg-green-50 text-brand" : "bg-rose-50 text-rose-500"}`}
                >
                  ● {isInStock(product) ? "In Stock" : "Out of Stock"}
                </span>
              )}
              <div className="flex items-center gap-2">
                <WishlistCartButton
                  product={product}
                  inCart={cartProductIds.has(product.id)}
                />
                <button
                  type="button"
                  aria-label={`Remove ${product.title} from wishlist`}
                  disabled={wishlist.isProductUpdating(product.id)}
                  onClick={() => void toggle(product)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-rose-50 hover:text-rose-500"
                >
                  <StoreIcon name="trash" className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/shop"
          className="mt-5 inline-block text-xs text-muted hover:text-brand"
        >
          ← Continue Shopping
        </Link>
      </div>
    </>
  );
}
