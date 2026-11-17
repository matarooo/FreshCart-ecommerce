"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { ProductRating } from "@/components/ProductRating/ProductRating";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import {
  discountPercent,
  finalPrice,
  formatPrice,
  isInStock,
  shopHref,
} from "@/lib/catalog";
import type { ProductCardProps } from "./@type";

export function ProductCard({ product }: ProductCardProps) {
  const wishlist = useWishlist();
  const { addToCart, state, isProductUpdating } = useCart();
  const [added, setAdded] = useState(false);
  const saved = wishlist.isSaved(product.id);
  const discount = discountPercent(product);
  const detailsHref = `/products/${product.id}`;
  const iconButton =
    "flex size-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors";
  return (
    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Link
        href={detailsHref}
        className="block overflow-hidden bg-white"
        aria-label={`View ${product.title}`}
      >
        <Image
          src={product.imageCover}
          alt={product.title}
          width={218}
          height={240}
          sizes="(max-width: 639px) 95vw, (max-width: 767px) 46vw, (max-width: 1023px) 30vw, 280px"
          className="h-60 w-full object-contain"
        />
      </Link>
      {discount > 0 && (
        <span className="pointer-events-none absolute top-3 left-3 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{discount}%
        </span>
      )}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 text-gray-600">
        <button
          type="button"
          disabled={
            wishlist.state.status === "loading" ||
            wishlist.isProductUpdating(product.id)
          }
          onClick={() => void wishlist.toggle(product)}
          aria-label={`${saved ? "Remove" : "Save"} ${product.title} ${saved ? "from" : "to"} wishlist`}
          aria-pressed={saved}
          className={`${iconButton} cursor-pointer hover:text-red-500 ${saved ? "text-red-500" : ""}`}
        >
          <StoreIcon
            name="heart"
            className={`size-4 ${saved ? "fill-current" : ""}`}
          />
        </button>
        <Link
          href={shopHref("category", product.category.name)}
          aria-label={`Browse products like ${product.title}`}
          title="Browse similar products"
          className={`${iconButton} hover:text-brand`}
        >
          <StoreIcon name="compare" className="size-4" />
        </Link>
        <Link
          href={detailsHref}
          aria-label={`View details for ${product.title}`}
          title="View details"
          className={`${iconButton} hover:text-brand`}
        >
          <StoreIcon name="eye" className="size-4" />
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs text-muted">{product.category.name}</span>
        <h3 className="mb-1 font-medium">
          <Link
            href={detailsHref}
            className="line-clamp-2 transition-colors hover:text-brand"
          >
            {product.title}
          </Link>
        </h3>
        <ProductRating
          rating={product.ratingsAverage}
          reviews={product.ratingsQuantity}
        />
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className={`text-lg font-bold ${discount > 0 ? "text-brand" : "text-gray-900"}`}
            >
              {formatPrice(finalPrice(product))}
            </span>
            {discount > 0 && (
              <del className="text-sm text-gray-500">
                {formatPrice(product.price)}
              </del>
            )}
          </div>
          <button
            type="button"
            disabled={
              !isInStock(product) ||
              isProductUpdating(product.id) ||
              state.status === "loading"
            }
            onClick={async () => {
              setAdded(await addToCart(product));
            }}
            aria-label={`Add ${product.title} to cart`}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <StoreIcon name={added ? "check" : "plus"} className="size-4" />
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {added ? `${product.title} added to cart.` : ""}
        </span>
      </div>
    </article>
  );
}
