import Image from "next/image";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { formatPrice } from "@/lib/catalog";
import type { OrderSummaryProps } from "./@type";

// Match the storefront’s free shipping offer in the header and footer.
const freeShippingThreshold = 500;

export function OrderSummary({
  cart,
  checkout = false,
  children,
}: OrderSummaryProps) {
  const { items, total, discountedTotal } = cart;
  const freeShipping = total >= freeShippingThreshold;
  const estimate = discountedTotal ?? total;

  return (
    <aside
      aria-label="Order Summary"
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-5"
    >
      <div className="bg-linear-to-r from-green-600 to-green-800 px-6 py-4 text-white">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <AuthIcon name="lock" className="size-4" /> Order Summary
        </h2>
        <p className="mt-1 text-sm text-green-50">
          {items.length} {items.length === 1 ? "item" : "items"}
          {!checkout && " in your cart"}
        </p>
      </div>
      <div className="space-y-5 p-5 sm:p-6">
        {checkout ? (
          <ul className="space-y-3 border-b border-gray-100 pb-5">
            {items.map(
              ({ productId, title, imageCover, quantity, unitPrice }) => (
                <li
                  key={productId}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 text-sm"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white p-1.5">
                    {imageCover ? (
                      <Image
                        src={imageCover}
                        alt=""
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <StoreIcon name="box" className="size-5 text-gray-400" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {quantity} × {formatPrice(unitPrice)}
                    </p>
                  </div>
                  <p className="shrink-0 font-bold text-slate-900">
                    {formatPrice(quantity * unitPrice)}
                  </p>
                </li>
              ),
            )}
          </ul>
        ) : freeShipping ? (
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-4 text-green-800">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-brand">
              <StoreIcon name="truck" className="size-5" />
            </span>
            <div>
              <p className="font-semibold">Free Shipping!</p>
              <p className="text-sm">You qualify for free delivery</p>
            </div>
          </div>
        ) : null}
        <dl className="space-y-3 text-sm sm:text-base">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted">
              {checkout && <StoreIcon name="truck" className="size-4" />}{" "}
              Shipping
            </dt>
            <dd
              className={
                freeShipping
                  ? "font-semibold text-brand"
                  : "text-right text-sm text-muted"
              }
            >
              {freeShipping
                ? "FREE"
                : checkout
                  ? "Confirmed with order"
                  : "Calculated at checkout"}
            </dd>
          </div>
          {estimate < total && (
            <div className="flex justify-between gap-3 text-brand">
              <dt>Coupon discount</dt>
              <dd>−{formatPrice(total - estimate)}</dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-gray-200 pt-3 font-bold text-slate-900">
            <dt>{freeShipping ? "Total" : "Estimated Total"}</dt>
            <dd className={`text-2xl ${checkout ? "text-brand" : ""}`}>
              {formatPrice(estimate)}
            </dd>
          </div>
        </dl>
        {children}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-muted">
          <li className="flex items-center gap-1.5">
            <StoreIcon name="shield" className="size-3.5 text-green-600" />{" "}
            Secure Payment
          </li>
          <li className="flex items-center gap-1.5">
            <StoreIcon name="truck" className="size-3.5 text-blue-600" /> Fast
            Delivery
          </li>
          {checkout && (
            <li className="flex items-center gap-1.5">
              <StoreIcon name="return" className="size-3.5 text-orange-600" />{" "}
              Easy Returns
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
