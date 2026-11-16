import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { OrderDetails } from "@/components/OrderDetails/OrderDetails";
import { OrderThumbnail } from "@/components/OrderThumbnail/OrderThumbnail";
import { formatAmount } from "@/lib/catalog";
import type { OrderCardProps } from "./@type";

const orderDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "Africa/Cairo",
});

export function OrderCard({ order }: OrderCardProps) {
  const extraItems = order.items.length - 1;
  const paymentLabel = `${order.paymentMethod === "cash" ? "Cash on delivery" : "Online payment"} · ${order.paid ? "Paid" : "Unpaid"}`;
  const addressPreview =
    order.shippingAddress?.details ?? order.shippingAddress?.city;

  return (
    <details
      name="order-history"
      className="group rounded-2xl border border-gray-100 bg-white shadow-sm open:border-green-200"
    >
      <summary className="grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 rounded-2xl p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-5 sm:p-6">
        <span className="relative">
          <OrderThumbnail image={order.items[0]?.imageCover} size="large" />
          {extraItems > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-sm"
            >
              +{extraItems}
            </span>
          )}
        </span>
        <span className="min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${order.delivered ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
          >
            <StoreIcon
              name={order.delivered ? "check" : "clock"}
              className="size-3.5"
            />
            {order.delivered ? "Delivered" : "Processing"}
          </span>
          <span className="mt-2 block text-lg font-bold text-slate-900">
            <span className="mr-2 text-gray-400">#</span>
            {order.number ?? order.id.slice(-8).toUpperCase()}
          </span>
          <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
            <time
              className="inline-flex items-center gap-1.5"
              dateTime={order.createdAt}
            >
              <StoreIcon name="calendar" className="size-3.5 text-gray-400" />
              {orderDate.format(new Date(order.createdAt))}
            </time>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <StoreIcon name="box" className="size-3.5 text-gray-400" />
              {order.quantity} {order.quantity === 1 ? "item" : "items"}
            </span>
            {addressPreview && (
              <span className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <FooterIcon
                  name="location"
                  className="size-3.5 shrink-0 text-gray-400"
                />
                <span className="truncate">{addressPreview}</span>
              </span>
            )}
          </span>
          <span className="mt-4 block text-2xl font-bold text-slate-900">
            {formatAmount(order.total)}{" "}
            <span className="text-sm font-medium text-slate-500">EGP</span>
          </span>
        </span>
        <span className="col-span-full flex items-end justify-between gap-4 sm:col-span-1 sm:h-full sm:flex-col sm:items-end">
          <span
            title={paymentLabel}
            className="grid size-10 place-items-center rounded-xl bg-gray-100 text-slate-600"
          >
            {order.paymentMethod === "cash" ? (
              <StoreIcon name="cash" className="size-4" />
            ) : (
              <FooterIcon name="card" />
            )}
            <span className="sr-only">{paymentLabel}</span>
          </span>
          <span className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gray-100 px-4 text-sm font-semibold text-slate-700 transition-colors group-open:bg-brand group-open:text-white group-open:shadow-md group-open:shadow-green-700/20 group-hover:bg-gray-200 group-open:group-hover:bg-green-700">
            <span className="group-open:hidden">Details</span>
            <span className="hidden group-open:inline">Hide</span>
            <NavIcon name="chevron" className="size-4 group-open:rotate-180" />
          </span>
        </span>
      </summary>
      <OrderDetails order={order} />
    </details>
  );
}
