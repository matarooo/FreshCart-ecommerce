"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { logout } from "@/app/login/actions";
import { useCart } from "@/components/CartProvider/CartProvider";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { useWishlist } from "@/components/WishlistProvider/WishlistProvider";
import type { MobileMenuProps } from "./@type";

export function MobileMenu({ userName }: MobileMenuProps) {
  const { products: wishlist } = useWishlist();
  const { cartCount } = useCart();
  const wishlistCount = wishlist.length;
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Navigation menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand text-white hover:bg-green-700"
      >
        <NavIcon name="menu" className="size-5" />
      </button>
      {isOpen && (
        <div
          id={menuId}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto border-b border-gray-200 bg-white text-sm text-slate-700 shadow-lg"
        >
          <search className="border-b border-gray-100 px-4 py-5">
            <form
              action="/shop"
              onSubmit={closeMenu}
              className="flex h-12 items-center rounded-xl border border-gray-200 bg-gray-50 p-1.5 pl-4 focus-within:border-brand"
            >
              <label htmlFor="mobile-product-search" className="sr-only">
                Search products
              </label>
              <input
                id="mobile-product-search"
                name="q"
                type="search"
                placeholder="Search products..."
                required
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400 focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white hover:bg-green-700"
              >
                <NavIcon name="search" className="size-5" />
              </button>
            </form>
          </search>
          <div className="flex flex-1 flex-col px-4">
            <nav
              aria-label="Mobile main navigation"
              className="space-y-1 border-b border-gray-100 py-4"
            >
              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["Categories", "/categories"],
                ["Brands", "/brands"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="flex min-h-14 items-center rounded-lg px-4 hover:bg-green-50 hover:text-brand"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <nav
              aria-label="Mobile shopping navigation"
              className="space-y-2 border-b border-gray-100 py-4"
            >
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex min-h-14 items-center gap-3 rounded-lg px-4 hover:bg-gray-50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <NavIcon name="heart" className="size-5" />
                </span>
                Wishlist
                <span className="ml-auto flex min-w-7 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                  {wishlistCount}
                  <span className="sr-only"> items</span>
                </span>
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex min-h-14 items-center gap-3 rounded-lg px-4 hover:bg-gray-50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-brand">
                  <NavIcon name="cart" className="size-5" />
                </span>
                Cart
                <span className="ml-auto flex min-w-7 items-center justify-center rounded-full bg-brand px-1.5 py-0.5 text-xs font-medium text-white">
                  {cartCount}
                  <span className="sr-only"> items</span>
                </span>
              </Link>
            </nav>
            <nav
              aria-label="Mobile account navigation"
              className="space-y-2 py-5"
            >
              <Link
                href={userName ? "/account" : "/login"}
                onClick={closeMenu}
                className="flex min-h-14 items-center gap-3 rounded-lg px-4 hover:bg-gray-50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  <NavIcon name="user" className="size-5" />
                </span>
                {userName ?? "Sign In"}
              </Link>
              {userName && (
                <Link
                  href="/account/orders"
                  onClick={closeMenu}
                  className="flex min-h-14 items-center gap-3 rounded-lg px-4 hover:bg-gray-50"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <NavIcon name="orders" className="size-5" />
                  </span>
                  My Orders
                </Link>
              )}
              {userName && (
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-lg px-4 text-red-500 hover:bg-red-50"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                      <NavIcon name="signOut" className="size-5" />
                    </span>
                    Sign Out
                  </button>
                </form>
              )}
            </nav>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-auto mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-4"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-brand">
                <NavIcon name="headset" className="size-5" />
              </span>
              <span className="text-sm font-medium">
                <span className="block">Need Help?</span>
                <span className="block text-brand">Contact Support</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
