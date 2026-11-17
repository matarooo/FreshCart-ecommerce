import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutCart } from "@/components/CheckoutCart/CheckoutCart";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { getAddresses } from "@/lib/addresses/address.api";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceSession } from "@/lib/auth/commerce-session";

export const metadata: Metadata = { title: "Checkout | FreshCart" };

export default async function CheckoutPage() {
  const signIn = loginHref("/checkout");
  const session = await getCommerceSession();
  if (!session) redirect(signIn);
  const addresses = await getAddresses(session.token).catch(() => []);

  return (
    <main
      id="main-content"
      className="flex-1 bg-linear-to-b from-gray-50 to-white py-8 sm:py-9"
    >
      <div className="store-container">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex gap-2 text-sm text-muted"
        >
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/cart" className="hover:text-brand">
            Cart
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-slate-900">
            Checkout
          </span>
        </nav>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-green-600 to-green-800 text-white shadow-md shadow-green-900/15">
                <NavIcon name="orders" className="size-7" />
              </span>
              Complete Your Order
            </h1>
            <p className="mt-2 text-muted">
              Review your items and complete your purchase
            </p>
          </div>
          <Link
            href="/cart"
            className="text-sm font-medium text-brand hover:underline"
          >
            ← Back to Cart
          </Link>
        </div>
        <CheckoutCart email={session.email} addresses={addresses} />
      </div>
    </main>
  );
}
