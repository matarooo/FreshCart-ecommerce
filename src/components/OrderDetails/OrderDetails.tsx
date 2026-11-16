import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { OrderThumbnail } from "@/components/OrderThumbnail/OrderThumbnail";
import { formatAmount, formatPrice } from "@/lib/catalog";
import type { OrderDetailsProps } from "./@type";

export function OrderDetails({ order }: OrderDetailsProps) {
  const { details, city, phone } = order.shippingAddress ?? {};

  return (
    <div className="rounded-b-2xl border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <span className="grid size-6 place-items-center rounded-lg bg-green-100 text-green-700">
          <StoreIcon name="receipt" className="size-3.5" />
        </span>
        Order Items
      </h2>
      {order.items.length > 0 ? (
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:gap-4 sm:p-4"
            >
              <OrderThumbnail image={item.imageCover} />
              <div className="min-w-0 flex-1">
                <p className="font-medium wrap-break-word text-slate-900">
                  {item.title ?? "Product unavailable"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {item.unitPrice === undefined
                    ? `Qty ${item.quantity}`
                    : `${item.quantity} × ${formatPrice(item.unitPrice)}`}
                </p>
              </div>
              {item.unitPrice !== undefined && (
                <p className="shrink-0 text-right text-lg font-bold text-slate-900">
                  {formatAmount(item.quantity * item.unitPrice)}
                  <span className="block text-xs font-medium text-slate-500">
                    EGP
                  </span>
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-600">No item details available.</p>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-gray-100 bg-white p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span className="grid size-6 place-items-center rounded-lg bg-blue-100 text-blue-700">
              <FooterIcon name="location" className="size-3.5" />
            </span>
            Delivery Address
          </h2>
          {details || city || phone ? (
            <address className="mt-3 space-y-2 text-sm not-italic text-slate-600">
              {details && (
                <p className="text-base wrap-break-word text-slate-900">
                  {details}
                </p>
              )}
              {city && <p className="wrap-break-word">{city}</p>}
              {phone && (
                <p className="flex items-center gap-2">
                  <NavIcon name="phone" className="size-3.5 text-gray-400" />
                  <bdi>{phone}</bdi>
                </p>
              )}
            </address>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              No delivery address available.
            </p>
          )}
        </section>
        <section className="rounded-xl border border-amber-200 bg-amber-100 p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span className="grid size-6 place-items-center rounded-lg bg-amber-500 text-white">
              <StoreIcon name="clock" className="size-3.5" />
            </span>
            Order Summary
          </h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-700">
            {order.subtotal !== undefined && (
              <div className="flex justify-between gap-3">
                <dt>Subtotal</dt>
                <dd>{formatPrice(order.subtotal)}</dd>
              </div>
            )}
            {order.shipping !== undefined && (
              <div className="flex justify-between gap-3">
                <dt>Shipping</dt>
                <dd>
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </dd>
              </div>
            )}
            {!!order.tax && (
              <div className="flex justify-between gap-3">
                <dt>Tax</dt>
                <dd>{formatPrice(order.tax)}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-3 border-t border-amber-200/70 pt-3 font-semibold text-slate-900">
              <dt>Total</dt>
              <dd className="text-lg font-bold">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
