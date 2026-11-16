"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    label: "Shop Now",
    href: "/shop",
  },
  {
    title: "Everyday Essentials, Extraordinary Value",
    description: "Discover great finds for your home and wardrobe",
    label: "Explore Products",
    href: "/shop",
  },
  {
    title: "Your Favorite Brands, All in One Place",
    description: "Quality you love. Prices that make you smile.",
    label: "Discover Brands",
    href: "/brands",
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  function move(direction: number) {
    setActive(
      (current) => (current + direction + slides.length) % slides.length,
    );
  }
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Store offers"
      className="relative isolate overflow-hidden bg-emerald-800 text-white"
    >
      <Image
        src="/images/banners/fresh-market.png"
        alt="Fresh vegetables at the market"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-700/95 via-emerald-600/65 to-emerald-950/15" />
      <div className="store-container flex min-h-72 items-center py-14 sm:min-h-80 lg:min-h-96">
        <div className="max-w-lg px-6 sm:px-0" aria-live="polite">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-100">
            Fresh finds. Every day.
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            {slide.title}
          </h1>
          <p className="mt-4 text-sm text-green-50 sm:text-base">
            {slide.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={slide.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              {slide.label}
              <StoreIcon name="arrow" className="size-4" />
            </Link>
            <Link
              href="/shop?deals=true"
              className="inline-flex min-h-11 items-center rounded-lg border border-white/60 px-5 py-3 text-sm font-medium hover:bg-white/10"
            >
              View Deals
            </Link>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="Previous offer"
        onClick={() => move(-1)}
        className="absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-green-700 sm:left-5"
      >
        <StoreIcon name="chevron" className="size-4 rotate-180" />
      </button>
      <button
        type="button"
        aria-label="Next offer"
        onClick={() => move(1)}
        className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-green-700 sm:right-5"
      >
        <StoreIcon name="chevron" className="size-4" />
      </button>
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show offer ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full ${active === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
