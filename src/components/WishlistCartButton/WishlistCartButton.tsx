"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { isInStock } from "@/lib/catalog";
import type { WishlistCartButtonProps } from "./@type";

export function WishlistCartButton({
  product,
  inCart,
}: WishlistCartButtonProps) {
  const { addToCart, state, isProductUpdating } = useCart();
  const [added, setAdded] = useState(false);
  const adding = isProductUpdating(product.id);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [added]);

  return (
    <>
      {inCart ? (
        <Link
          href="/cart"
          className="inline-flex min-h-9 min-w-28 items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-gray-200"
        >
          <StoreIcon name="check" className="size-3.5 text-brand" />
          {added ? "Added" : "View Cart"}
        </Link>
      ) : (
        <button
          type="button"
          disabled={!isInStock(product) || adding || state.status === "loading"}
          onClick={async () => {
            if (await addToCart(product.id)) setAdded(true);
          }}
          className="store-button min-h-9 min-w-28 px-3 py-2 text-xs"
        >
          <StoreIcon name="cart" className="size-3" />
          {adding ? "Adding…" : "Add to Cart"}
        </button>
      )}
      <output className="sr-only">
        {added && inCart ? `${product.title} added to cart.` : ""}
      </output>
    </>
  );
}
