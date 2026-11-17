"use client";

import { useState } from "react";
import { z } from "zod";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";

const perks = [
  { label: "Fresh Picks Weekly", icon: "check" },
  { label: "Free Delivery Codes", icon: "truck" },
  { label: "Members-Only Deals", icon: "tag" },
] as const;

export function Newsletter() {
  const [notice, setNotice] = useState("");
  return (
    <section className="grid gap-8 rounded-[2.5rem] border border-emerald-100/50 bg-linear-to-br from-emerald-50 via-white to-teal-50 p-7 shadow-2xl shadow-emerald-500/10 sm:p-8 lg:grid-cols-5 lg:p-14">
      <div className="min-w-0 lg:col-span-3">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
            <StoreIcon name="mail" />
          </span>
          <div className="text-emerald-600">
            <p className="text-sm font-semibold uppercase tracking-wide">
              Newsletter
            </p>
            <p className="text-xs text-muted">50,000+ subscribers</p>
          </div>
        </div>
        <h2 className="text-3xl leading-snug font-bold text-gray-900 lg:text-4xl">
          Get the Freshest Updates{" "}
          <span className="text-emerald-600">Delivered Free</span>
        </h2>
        <p className="mt-3 text-lg text-muted">
          Weekly recipes, seasonal offers & exclusive member perks.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {perks.map(({ label, icon }) => (
            <span
              key={label}
              className="flex items-center gap-2.5 rounded-full border border-emerald-100 bg-white px-4 py-2.5 text-sm shadow-sm"
            >
              <span className="grid size-7 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <StoreIcon name={icon} className="size-3.5" />
              </span>
              {label}
            </span>
          ))}
        </div>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            const email = new FormData(event.currentTarget).get("email");
            setNotice(
              z.email().safeParse(email).success
                ? "Newsletter subscriptions are coming soon. Your email has not been submitted."
                : "Please enter a valid email address.",
            );
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            aria-describedby="newsletter-notice"
            required
            className="min-h-15 min-w-0 flex-1 rounded-2xl border-2 border-gray-200 bg-white px-5 shadow-sm placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="store-button min-h-15 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-8 text-base shadow-lg shadow-emerald-600/20"
          >
            Subscribe
            <StoreIcon name="arrow" className="size-4" />
          </button>
        </form>
        <p
          id="newsletter-notice"
          aria-live="polite"
          className="mt-3 text-xs text-muted"
        >
          {notice || "Unsubscribe anytime. No spam, ever."}
        </p>
      </div>
      <div className="lg:col-span-2 lg:border-l lg:border-emerald-100/60 lg:pl-8">
        <aside className="flex h-full min-h-98 flex-col items-start justify-center rounded-3xl bg-[radial-gradient(ellipse_at_top_right,#123c3b_0%,transparent_52%),linear-gradient(145deg,#111827,#1f2937)] p-8 text-white">
          <span className="w-fit rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] uppercase tracking-wide text-emerald-300">
            Mobile app
          </span>
          <h3 className="mt-5 text-2xl font-bold">Shop Faster on Our App</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Get app-exclusive deals & 15% off your first order.
          </p>
          <p className="mt-7 w-full rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold">
            <span className="block text-[10px] font-medium uppercase text-gray-400">
              Coming soon
            </span>
            App Store
          </p>
          <p className="mt-3 w-full rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold">
            <span className="block text-[10px] font-medium uppercase text-gray-400">
              Coming soon
            </span>
            Google Play
          </p>
          <p className="mt-6 text-sm text-slate-300">
            <span className="text-amber-400">★★★★★</span> 4.9 · 100K+ downloads
          </p>
        </aside>
      </div>
    </section>
  );
}
