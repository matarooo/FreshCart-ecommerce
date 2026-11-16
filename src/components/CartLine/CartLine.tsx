"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { QuantitySelector } from "@/components/QuantitySelector/QuantitySelector";
import { formatPrice } from "@/lib/catalog";
import type { CartLineProps } from "./@type";

export function CartLine({ item }: CartLineProps) {
  const { update, isProductUpdating } = useCart();
  const { productId, title, imageCover, category, stock, quantity, unitPrice } =
    item;
  const href = `/products/${productId}`;
  const pending = isProductUpdating(productId);

  return (
    <article className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:gap-x-6 sm:p-5">
      <div className="flex flex-col items-end gap-2 sm:row-span-2">
        <Link
          href={href}
          aria-label={`View ${title}`}
          className="flex size-20 items-center justify-center rounded-xl border border-gray-100 bg-linear-to-br from-gray-50 to-gray-100 p-2 sm:size-32"
        >
          {imageCover ? (
            <Image
              src={imageCover}
              alt=""
              width={112}
              height={112}
              className="h-full w-full object-contain"
            />
          ) : (
            <StoreIcon name="box" className="size-8 text-gray-400" />
          )}
        </Link>
        {stock !== undefined && (
          <span
            className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${stock > 0 ? "bg-green-600 text-white" : "bg-rose-50 text-rose-700"}`}
          >
            {stock > 0 && <StoreIcon name="check" className="size-3" />}
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <Link
          href={href}
          className="text-base font-semibold text-slate-900 hover:text-brand sm:text-lg"
        >
          {title}
        </Link>
        {category && (
          <p className="mt-2 w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-green-800">
            {category}
          </p>
        )}
        <p className="mt-3 text-base font-bold text-brand sm:text-lg">
          {formatPrice(unitPrice)}{" "}
          <span className="text-xs font-normal text-muted">per unit</span>
        </p>
      </div>
      <div className="col-span-2 flex flex-wrap items-end justify-between gap-3 sm:col-span-1">
        <QuantitySelector
          value={quantity}
          max={stock ?? Number.MAX_SAFE_INTEGER}
          disabled={pending}
          onChange={(value) =>
            void update({ type: "quantity", productId, quantity: value })
          }
          label={title}
        />
        <div className="ml-auto flex items-end gap-3">
          <div className="text-right">
            <p className="text-xs text-muted">Total</p>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(unitPrice * quantity)}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${title} from cart`}
            disabled={pending}
            onClick={() => void update({ type: "remove", productId })}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 disabled:opacity-50"
          >
            <StoreIcon name="trash" className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
