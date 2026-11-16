"use client";

import { useState } from "react";
import { z } from "zod";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
export function Newsletter() {
  const [notice, setNotice] = useState("");
  return (
    <section className="grid gap-8 rounded-3xl border border-emerald-50 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-[0_20px_60px_#10b98112] md:grid-cols-[1.6fr_1fr] sm:p-9">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <StoreIcon name="mail" />
          </span>
          <div className="text-[10px] text-emerald-600">
            <p className="font-semibold uppercase tracking-wide">Newsletter</p>
            <p className="mt-1 text-muted">50,000+ subscribers</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Get the Freshest Updates{" "}
          <span className="text-emerald-600">Delivered Free</span>
        </h2>
        <p className="mt-3 text-sm text-muted">
          Weekly recipes, seasonal offers & exclusive member perks.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Fresh Picks Weekly",
            "Free Delivery Codes",
            "Members-Only Deals",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-[10px]"
            >
              <StoreIcon name="check" className="size-3 text-emerald-500" />
              {item}
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
          className="mt-6 flex flex-wrap gap-2"
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
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
          />
          <button type="submit" className="store-button">
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
      <aside className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
        <span className="w-fit rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] uppercase tracking-wide text-emerald-300">
          Mobile app
        </span>
        <h3 className="mt-4 text-xl font-bold">Shop Faster on Our App</h3>
        <p className="mt-3 text-xs leading-6 text-slate-300">
          Get app-exclusive deals & 15% off your first order.
        </p>
        <p className="mt-5 rounded-lg bg-white/10 px-4 py-3 text-sm">
          App Store · Coming soon
        </p>
        <p className="mt-2 rounded-lg bg-white/10 px-4 py-3 text-sm">
          Google Play · Coming soon
        </p>
        <p className="mt-5 text-xs text-slate-300">
          <span className="text-amber-400">★★★★★</span> 4.9 · 100K+ downloads
        </p>
      </aside>
    </section>
  );
}
