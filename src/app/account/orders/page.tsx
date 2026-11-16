import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { OrderCard } from "@/components/OrderCard/OrderCard";
import { CommerceApiError } from "@/lib/api/commerce-request";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceSession } from "@/lib/auth/commerce-session";
import { getOrders } from "@/lib/orders/order.api";

export const metadata: Metadata = { title: "My Orders | FreshCart" };

export default async function OrdersPage() {
  const signIn = loginHref("/account/orders");
  const session = await getCommerceSession();
  if (!session) redirect(signIn);
  const orders = await getOrders(session.token).catch((error: unknown) => {
    if (error instanceof CommerceApiError && [401, 403].includes(error.status))
      redirect(signIn);
    return null;
  });

  return (
    <main id="main-content" className="flex-1 bg-white py-8">
      <div className="store-container">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-slate-600 hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li aria-current="page" className="font-medium text-slate-900">
              My Orders
            </li>
          </ol>
        </nav>
        <header className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-7">
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-green-500 to-brand text-white shadow-lg shadow-green-600/20">
              <StoreIcon name="bag" className="size-7" />
            </span>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
              {!!orders?.length && (
                <p className="mt-0.5 text-sm text-slate-600">
                  Track and manage your {orders.length}{" "}
                  {orders.length === 1 ? "order" : "orders"}
                </p>
              )}
            </div>
          </div>
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-brand hover:bg-green-50"
          >
            <StoreIcon name="bag" className="size-4" />
            Continue Shopping
          </Link>
        </header>
        {!orders ? (
          <p
            role="alert"
            className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-muted"
          >
            Your orders are temporarily unavailable. Refresh the page to try
            again.
          </p>
        ) : orders.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No Orders Yet
            </h2>
            <Link href="/shop" className="store-button mt-5">
              Start Shopping
            </Link>
          </section>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((order) => (
              <li key={order.id}>
                <OrderCard order={order} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
