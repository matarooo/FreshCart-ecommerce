"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { ProductRating } from "@/components/ProductRating/ProductRating";
import { QuantitySelector } from "@/components/QuantitySelector/QuantitySelector";
import { ServiceBenefits } from "@/components/ServiceBenefits/ServiceBenefits";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import {
  discountPercent,
  finalPrice,
  formatPrice,
  isInStock,
  shopHref,
} from "@/lib/catalog";
import type { ProductPurchaseProps } from "./@type";
export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const wishlist = useWishlist();
  const { addToCart, state, isProductUpdating } = useCart();
  const router = useRouter();
  const saved = wishlist.isSaved(product.id);
  const discount = discountPercent(product);
  const price = finalPrice(product);
  const inStock = isInStock(product);
  const canAdd =
    inStock && !isProductUpdating(product.id) && state.status !== "loading";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        <Link
          href={shopHref("category", product.category.name)}
          className="rounded-full bg-green-50 px-3 py-1 text-xs text-brand"
        >
          {product.category.name}
        </Link>
        <Link
          href={shopHref("brand", product.brand.name)}
          className="rounded-full bg-gray-100 px-3 py-1 text-xs"
        >
          {product.brand.name}
        </Link>
      </div>
      <h1 className="text-2xl font-bold leading-snug text-slate-900">
        {product.title}
      </h1>
      <ProductRating
        rating={product.ratingsAverage}
        reviews={product.ratingsQuantity}
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <strong className="text-2xl text-slate-900">
          {formatPrice(price)}
        </strong>
        {discount > 0 && (
          <>
            <del className="text-sm text-gray-400">
              {formatPrice(product.price)}
            </del>
            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">
              Save {discount}%
            </span>
          </>
        )}
      </div>
      <p
        className={`mt-5 inline-block rounded-full px-3 py-1 text-xs ${inStock ? "bg-green-50 text-brand" : "bg-rose-50 text-rose-500"}`}
      >
        ● {inStock ? "In Stock" : "Out of Stock"}
      </p>
      <p className="mt-5 border-t border-gray-100 pt-5 whitespace-pre-line text-sm leading-7 text-muted">
        {product.description}
      </p>
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium">Quantity</p>
        <div className="flex items-center gap-3">
          <QuantitySelector
            value={quantity}
            max={product.quantity}
            onChange={setQuantity}
            label={product.title}
          />
          <span className="text-xs text-muted">
            {product.quantity} available
          </span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50 p-4 text-sm">
        <span>Total Price:</span>
        <strong className="text-xl text-brand">
          {formatPrice(price * quantity)}
        </strong>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!canAdd}
          onClick={async () => {
            setNotice("");
            if (await addToCart(product.id, quantity))
              setNotice(`${product.title} added to your cart.`);
          }}
          className="store-button"
        >
          <StoreIcon name="cart" className="size-4" />
          Add to Cart
        </button>
        <button
          type="button"
          disabled={!canAdd}
          onClick={async () => {
            if (await addToCart(product.id, quantity)) router.push("/cart");
          }}
          className="store-button bg-slate-900 hover:bg-slate-700"
        >
          <StoreIcon name="bolt" className="size-4" />
          Buy Now
        </button>
      </div>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          aria-pressed={saved}
          disabled={
            wishlist.state.status === "loading" ||
            wishlist.isProductUpdating(product.id)
          }
          onClick={() => void wishlist.toggle(product.id)}
          className={`store-outline-button flex-1 ${saved ? "text-rose-500" : ""}`}
        >
          <StoreIcon
            name="heart"
            className={`size-4 ${saved ? "fill-current" : ""}`}
          />
          {saved ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
        <button
          type="button"
          aria-label="Copy product link"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setNotice("Product link copied.");
            } catch {
              setNotice(
                "Copy the address from your browser to share this product.",
              );
            }
          }}
          className="store-outline-button px-3"
        >
          <StoreIcon name="share" className="size-4" />
        </button>
      </div>
      <output className="mt-3 block text-xs text-brand">{notice}</output>
      <div className="mt-4 border-t border-gray-100 pt-4">
        <ServiceBenefits compact />
      </div>
    </div>
  );
}
