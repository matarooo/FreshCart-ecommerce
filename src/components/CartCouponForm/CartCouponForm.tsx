"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";

export function CartCouponForm() {
  const { update, updating } = useCart();
  const [couponName, setCouponName] = useState("");
  const [applied, setApplied] = useState(false);

  return (
    <details>
      <summary className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 text-sm text-slate-600 hover:bg-gray-50">
        <StoreIcon name="tag" className="size-4" /> Apply Promo Code
      </summary>
      <form
        className="mt-3 space-y-2"
        onSubmit={async (event) => {
          event.preventDefault();
          const code = couponName.trim();
          if (!code) return;
          setApplied(await update({ type: "coupon", couponName: code }));
        }}
      >
        <label htmlFor="cart-coupon" className="text-sm font-medium">
          Coupon code
        </label>
        <div className="flex gap-2">
          <input
            id="cart-coupon"
            value={couponName}
            onChange={(event) => {
              setCouponName(event.target.value);
              setApplied(false);
            }}
            required
            maxLength={80}
            disabled={updating}
            className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="store-outline-button shrink-0"
            disabled={updating || !couponName.trim()}
          >
            Apply
          </button>
        </div>
        <output className="block text-xs text-brand">
          {applied ? "Coupon applied." : ""}
        </output>
      </form>
    </details>
  );
}
