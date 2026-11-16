"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { logout } from "@/app/login/actions";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import type { ProfileMenuProps } from "./@type";

export function ProfileMenu({ userName, userEmail }: ProfileMenuProps) {
  const details = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    if (details.current) details.current.open = false;
  }, []);

  useEffect(() => {
    function dismissOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !details.current?.contains(event.target)
      ) {
        close();
      }
    }

    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [close]);

  const row = "flex min-h-10 w-full items-center gap-3 rounded-lg px-2 text-sm";
  const icon = "size-4 shrink-0 text-slate-400";

  return (
    <details
      ref={details}
      className="group relative shrink-0"
      onKeyDown={(event) => {
        if (event.key === "Escape" && details.current?.open) {
          close();
          trigger.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          close();
        }
      }}
    >
      <summary
        ref={trigger}
        aria-label="Account menu"
        className="flex size-7 cursor-pointer list-none items-center justify-center rounded-full hover:text-brand group-open:text-brand xl:size-8 [&::-webkit-details-marker]:hidden"
      >
        <NavIcon name="profile" className="size-5" />
      </summary>
      <div className="absolute top-full right-0 z-10 mt-4 max-h-[calc(100dvh-5rem)] w-64 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-slate-100 bg-white text-slate-700 shadow-xl shadow-slate-900/10">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-brand">
            <NavIcon name="profile" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {userName}
            </p>
            {userEmail && (
              <p className="truncate text-xs text-slate-500">{userEmail}</p>
            )}
          </div>
        </div>
        <nav aria-label="Profile navigation" className="p-2.5">
          <Link
            href="/account"
            onClick={close}
            className={`${row} hover:bg-green-50 hover:text-brand`}
          >
            <NavIcon name="user" className={icon} /> My Profile
          </Link>
          <Link
            href="/account/orders"
            onClick={close}
            className={`${row} hover:bg-green-50 hover:text-brand`}
          >
            <NavIcon name="orders" className={icon} /> My Orders
          </Link>
          <Link
            href="/wishlist"
            onClick={close}
            className={`${row} hover:bg-green-50 hover:text-brand`}
          >
            <NavIcon name="heart" className={icon} /> My Wishlist
          </Link>
          <Link
            href="/account"
            onClick={close}
            className={`${row} hover:bg-green-50 hover:text-brand`}
          >
            <NavIcon name="account" className={icon} /> Addresses
          </Link>
          <Link
            href="/account?tab=settings"
            onClick={close}
            className={`${row} hover:bg-green-50 hover:text-brand`}
          >
            <NavIcon name="settings" className={icon} /> Settings
          </Link>
        </nav>
        <form action={logout} className="border-t border-slate-100 p-2.5">
          <button
            type="submit"
            className={`${row} cursor-pointer text-red-600 hover:bg-red-50`}
          >
            <NavIcon name="signOut" className="size-4 shrink-0" /> Sign Out
          </button>
        </form>
      </div>
    </details>
  );
}
