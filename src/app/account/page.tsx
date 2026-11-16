import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountProfileForm } from "@/components/AccountProfileForm/AccountProfileForm";
import { AddressBook } from "@/components/AddressBook/AddressBook";
import { ChangePasswordForm } from "@/components/ChangePasswordForm/ChangePasswordForm";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { getAddresses } from "@/lib/addresses/address.api";
import { CommerceApiError } from "@/lib/api/commerce-request";
import { verifyCommerceAccount } from "@/lib/auth/account.api";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceSession } from "@/lib/auth/commerce-session";

export const metadata: Metadata = { title: "My Account | FreshCart" };
const navItem =
  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gray-50 aria-[current=page]:bg-green-50 aria-[current=page]:text-green-800";
const navIcon =
  "flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-slate-600 group-aria-[current=page]:bg-green-500 group-aria-[current=page]:text-white";
const navChevron =
  "ml-auto size-3 text-gray-400 group-aria-[current=page]:text-green-600";

export default async function AccountPage({
  searchParams,
}: PageProps<"/account">) {
  const query = await searchParams;
  const checkout = query.checkout === "1";
  const settings = query.tab === "settings";
  const addressesHref = checkout ? "/account?checkout=1" : "/account";
  const settingsHref = "/account?tab=settings";
  const signIn = loginHref(settings ? settingsHref : addressesHref);
  const session = await getCommerceSession();
  if (!session) redirect(signIn);

  function accountLoadError(error: unknown) {
    if (error instanceof CommerceApiError && [401, 403].includes(error.status))
      redirect(signIn);
    return null;
  }
  const [addresses, identity] = await Promise.all(
    settings
      ? [null, verifyCommerceAccount(session.token).catch(accountLoadError)]
      : [getAddresses(session.token).catch(accountLoadError), null],
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
              href={addressesHref}
              aria-current={settings ? undefined : "page"}
              className={navItem}
            >
              <span className={navIcon}>
                <FooterIcon name="location" className="size-4" />
              </span>
              My Addresses <StoreIcon name="chevron" className={navChevron} />
            </Link>
            <Link
              href={settingsHref}
              aria-current={settings ? "page" : undefined}
              className={navItem}
            >
              <span className={navIcon}>
                <NavIcon name="settings" className="size-4" />
              </span>
              Settings <StoreIcon name="chevron" className={navChevron} />
            </Link>
          </div>
        </nav>
        <div className="min-w-0">
          {settings && identity ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Account Settings
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Update your profile information and change your password
                </p>
              </div>
              <AccountProfileForm
                key={identity.id}
                profile={{
                  name: session.name,
                  email: session.email,
                  phone: session.phone,
                }}
                account={identity}
              />
              <ChangePasswordForm email={session.email} />
            </div>
          ) : addresses ? (
            <AddressBook addresses={addresses} email={session.email} />
          ) : (
            <p
              role="alert"
              className="rounded-xl border border-gray-100 bg-white p-5 text-sm text-muted"
            >
              {settings
                ? "Your account settings are temporarily unavailable."
                : "Your addresses are temporarily unavailable."}{" "}
              Refresh the page to try again.
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
