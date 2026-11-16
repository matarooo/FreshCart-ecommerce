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
} from "@/lib/catalog";
import type { ProductCardProps } from "./@type";

export function ProductCard({ product }: ProductCardProps) {
  const wishlist = useWishlist();
  const { addToCart, state, isProductUpdating } = useCart();
  const [added, setAdded] = useState(false);
  const saved = wishlist.isSaved(product.id);
  const discount = discountPercent(product);
  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="block overflow-hidden bg-white p-3 pr-9 after:absolute after:inset-0 after:content-['']"
        aria-label={`View ${product.title}`}
      >
        <Image
          src={product.imageCover}
          alt={product.title}
          width={218}
          height={240}
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 240px"
          className="aspect-[218/240] w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      {discount > 0 && (
        <span className="pointer-events-none absolute top-2 left-2 rounded bg-rose-500 px-1.5 py-1 text-[10px] font-semibold text-white">
          -{discount}%
        </span>
      )}
      <button
        type="button"
        disabled={
          wishlist.state.status === "loading" ||
          wishlist.isProductUpdating(product.id)
        }
        onClick={() => void wishlist.toggle(product.id)}
        aria-label={`${saved ? "Remove" : "Save"} ${product.title} ${saved ? "from" : "to"} wishlist`}
        aria-pressed={saved}
        className={`absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-rose-50 ${saved ? "text-rose-500" : "text-slate-400"}`}
      >
        <StoreIcon
          name="heart"
          className={`size-4 ${saved ? "fill-current" : ""}`}
        />
      </button>
      <div className="flex flex-1 flex-col p-3 pt-1">
        <span className="mb-1 text-[10px] text-muted sm:text-xs">
          {product.category.name}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="relative z-10 line-clamp-2 min-h-10 text-xs leading-5 hover:text-brand sm:text-sm"
        >
          {product.title}
        </Link>
        <ProductRating
          rating={product.ratingsAverage}
          reviews={product.ratingsQuantity}
        />
        <div className="mt-auto flex items-center justify-between gap-1 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span
              className={`text-xs font-bold sm:text-sm ${discount > 0 ? "text-brand" : "text-slate-800"}`}
            >
              {formatPrice(finalPrice(product))}
            </span>
            {discount > 0 && (
              <del className="text-[10px] text-gray-400">
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
              setAdded(await addToCart(product.id));
            }}
            aria-label={`Add ${product.title} to cart`}
            className="relative z-10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
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
