import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AddressBook } from "@/components/AddressBook/AddressBook";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { getAddresses } from "@/lib/addresses/address.api";
import { CommerceApiError } from "@/lib/api/commerce-request";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceSession } from "@/lib/auth/commerce-session";

export const metadata: Metadata = { title: "My Account | FreshCart" };

export default async function AccountPage({
  searchParams,
}: PageProps<"/account">) {
  const checkout = (await searchParams).checkout === "1";
  const signIn = loginHref(checkout ? "/account?checkout=1" : "/account");
  const session = await getCommerceSession();
  if (!session) redirect(signIn);

  const addresses = await getAddresses(session.token).catch(
    (error: unknown) => {
      if (
        error instanceof CommerceApiError &&
        [401, 403].includes(error.status)
      )
        redirect(signIn);
      return null;
    },
  );

  return (
    <main id="main-content" className="flex-1 bg-gray-50 pb-16">
      <header className="bg-linear-to-br from-green-600 via-green-500 to-green-400 py-11 text-white">
        <div className="store-container">
          <nav aria-label="Breadcrumb" className="mb-6 flex gap-2 text-sm">
            <Link href="/" className="text-white/85 hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">My Account</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <NavIcon name="user" className="size-8" />
            </span>
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="mt-1 text-sm text-white/90 sm:text-base">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="store-container grid items-start gap-7 pt-8 md:grid-cols-[minmax(12rem,18rem)_1fr]">
        <nav
          aria-label="My Account"
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs"
        >
          <p className="border-b border-gray-100 px-4 py-4 font-semibold text-slate-900">
            My Account
          </p>
          <div className="space-y-1 p-2">
            <Link
              href={checkout ? "/account?checkout=1" : "/account"}
              aria-current="page"
              className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-green-500 text-white">
                <FooterIcon name="location" className="size-4" />
              </span>
              My Addresses{" "}
              <StoreIcon
                name="chevron"
                className="ml-auto size-3 text-green-500"
              />
            </Link>
            <button
              type="button"
              disabled
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left text-sm text-slate-500"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-gray-100">
                <NavIcon name="settings" className="size-4" />
              </span>
              Settings{" "}
              <StoreIcon
                name="chevron"
                className="ml-auto size-3 text-gray-400"
              />
            </button>
          </div>
        </nav>
        <div className="min-w-0">
          {addresses ? (
            <AddressBook addresses={addresses} email={session.email} />
          ) : (
            <p
              role="alert"
              className="rounded-xl border border-gray-100 bg-white p-5 text-sm text-muted"
            >
              Your addresses are temporarily unavailable. Refresh the page to
              try again.
            </p>
          )}
          {checkout && (
            <Link href="/checkout" className="store-outline-button mt-5">
              Back to Checkout
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
