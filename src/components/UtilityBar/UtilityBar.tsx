import Link from "next/link";
import { logout } from "@/app/login/actions";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import type { UtilityBarProps } from "./@type";

export function UtilityBar({ userName }: UtilityBarProps) {
  return (
    <div className="hidden border-b border-gray-100 xl:block">
      <div className="store-container flex h-10 items-center justify-between gap-6 text-sm text-muted">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <NavIcon name="truck" className="size-3.5 text-brand" />
            Free Shipping on Orders 500 EGP
          </span>
          <Link
            href="/shop?sort=newest"
            className="flex items-center gap-2 hover:text-brand"
          >
            <NavIcon name="gift" className="size-3.5 text-brand" />
            New Arrivals Daily
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="tel:+18001234567"
            className="flex items-center gap-2 hover:text-brand"
          >
            <NavIcon name="phone" className="size-3" />
            +1 (800) 123-4567
          </a>
          <a
            href="mailto:support@freshcart.com"
            className="flex items-center gap-2 hover:text-brand"
          >
            <NavIcon name="mail" className="size-3" />
            support@freshcart.com
          </a>
          <div className="flex items-center gap-5 border-l border-gray-200 pl-6 text-slate-600">
            <Link
              href={userName ? "/account" : "/login"}
              className="flex items-center gap-2 hover:text-brand"
            >
              <NavIcon name="user" className="size-3" />
              {userName ?? "Sign In"}
            </Link>
            {userName ? (
              <form action={logout}>
                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-2 hover:text-brand"
                >
                  <NavIcon name="signOut" className="size-3" />
                  Sign Out
                </button>
              </form>
            ) : (
              <Link
                href="/sign-up"
                className="flex items-center gap-2 transition-colors hover:text-brand"
              >
                <NavIcon name="user" className="size-3" />
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
