"use client";

import Link from "next/link";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { shopHref } from "@/lib/catalog";

const featuredCategories = [
  "Electronics",
  "Women's Fashion",
  "Men's Fashion",
  "Beauty & Health",
];

export function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);

  function handleEscape(event: KeyboardEvent) {
    if (event.key !== "Escape" || !open) return;
    event.preventDefault();
    trigger.current?.focus();
    setOpen(false);
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: Groups the category links and their disclosure button.
    <div
      role="group"
      aria-label="Browse categories"
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="flex cursor-pointer items-center gap-2 py-3 transition-colors hover:text-brand"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleEscape}
      >
        Categories
        <NavIcon
          name="chevron"
          className={`size-3 motion-safe:transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={menuId}
        inert={!open}
        className={`absolute top-full left-0 z-10 w-52 pt-1 text-sm motion-safe:transition-[opacity,translate] ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        <ul className="rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
          {[
            { label: "All Categories", href: "/categories" },
            ...featuredCategories.map((label) => ({
              label,
              href: shopHref("category", label),
            })),
          ].map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                onKeyDown={handleEscape}
                className="block px-4 py-2.5 transition-colors hover:bg-green-50 hover:text-brand"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
