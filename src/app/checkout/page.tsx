import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/CheckoutForm/CheckoutForm";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { getAddresses } from "@/lib/addresses/address.api";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceSession } from "@/lib/auth/commerce-session";
import { CartApiError, getCart } from "@/lib/cart/cart.api";
import { cartReview } from "@/lib/cart/cart-review";

export const metadata: Metadata = { title: "Checkout | FreshCart" };

export default async function CheckoutPage() {
  const signIn = loginHref("/checkout");
  const session = await getCommerceSession();
  if (!session) redirect(signIn);
  const [cart, addresses] = await Promise.all([
    getCart(session.token).catch((error: unknown) => {
      if (error instanceof CartApiError && [401, 403].includes(error.status))
        redirect(signIn);
      return null;
    }),
    getAddresses(session.token).catch(() => []),
  ]);

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
        {!cart || (cart.items.length > 0 && !cart.id) ? (
          <p
            role="alert"
            className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-muted"
          >
            Checkout is temporarily unavailable. Return to your cart to try
            again.
          </p>
        ) : !cart.items.length ? (
          <p className="text-sm text-muted">Your cart is empty.</p>
        ) : (
          <CheckoutForm
            email={session.email}
            review={cartReview(cart)}
            addresses={addresses}
            cart={cart}
          />
        )}
      </div>
    </main>
  );
}
