"use client";

import { useActionState, useEffect, useState } from "react";
import { placeOrder } from "@/app/checkout/actions";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import { CheckoutAddressFields } from "@/components/CheckoutAddressFields/CheckoutAddressFields";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { OrderSummary } from "@/components/OrderSummary/OrderSummary";
import type { CheckoutFormProps } from "./@type";

const paymentOptions = [
  {
    value: "cash",
    title: "Cash on Delivery",
    description: "Pay when your order arrives at your doorstep",
  },
  {
    value: "card",
    title: "Pay Online",
    description: "Pay by credit or debit card through Stripe",
  },
] as const;

export function CheckoutForm({
  email,
  review,
  addresses,
  cart,
}: CheckoutFormProps) {
  const [payment, setPayment] = useState<"cash" | "card">("cash");
  const [result, submit, pending] = useActionState(
    placeOrder.bind(null, email, review),
    null,
  );
  const nextUrl = result?.nextUrl;
  const disabled = pending || Boolean(nextUrl);

  useEffect(() => {
    if (nextUrl) window.location.assign(nextUrl);
  }, [nextUrl]);

  return (
    <form
      action={submit}
      className="grid items-start gap-7 lg:grid-cols-[minmax(0,2.05fr)_minmax(0,1fr)]"
    >
      <div className="min-w-0 space-y-6">
        <CheckoutAddressFields addresses={addresses} disabled={disabled} />
        <section
          aria-labelledby="payment-heading"
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="bg-linear-to-r from-green-600 to-green-800 px-6 py-4 text-white">
            <h2
              id="payment-heading"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <FooterIcon name="card" className="size-5" /> Payment Method
            </h2>
            <p className="mt-1 text-sm text-green-50">
              Choose how you’d like to pay
            </p>
          </div>
          <fieldset disabled={disabled} className="space-y-4 p-5 sm:p-6">
            <legend className="sr-only">Payment method</legend>
            {paymentOptions.map(({ value, title, description }) => {
              const selected = payment === value;
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 has-focus-visible:ring-2 has-focus-visible:ring-brand sm:gap-4 sm:p-5 ${selected ? "border-green-500 bg-emerald-50" : "border-gray-200 bg-white"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={selected}
                    onChange={() => setPayment(value)}
                    required
                    className="sr-only"
                  />
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl sm:size-14 ${selected ? "bg-linear-to-br from-green-500 to-green-700 text-white shadow-md shadow-green-900/20" : "bg-gray-100 text-gray-500"}`}
                  >
                    {value === "cash" ? (
                      <StoreIcon name="box" className="size-5" />
                    ) : (
                      <FooterIcon name="card" className="size-5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong
                      className={selected ? "text-green-800" : "text-slate-900"}
                    >
                      {title}
                    </strong>
                    <span className="mt-1 block text-sm text-muted">
                      {description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-green-600 bg-green-600 text-white" : "border-gray-200"}`}
                  >
                    {selected && <StoreIcon name="check" className="size-4" />}
                  </span>
                </label>
              );
            })}
            <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-emerald-50 p-4 text-sm text-green-800">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-brand">
                <StoreIcon name="shield" className="size-5" />
              </span>
              <div>
                <p className="font-medium">Secure checkout</p>
                <p className="text-xs">Stripe handles online card payments.</p>
              </div>
            </div>
          </fieldset>
        </section>
      </div>
      <OrderSummary cart={cart} checkout>
        {result?.message && (
          <p role="alert" className="text-sm text-red-700">
            {result.message}
          </p>
        )}
        <button
          type="submit"
          disabled={disabled}
          className="store-button min-h-14 w-full rounded-xl bg-linear-to-r from-green-600 to-green-800 shadow-lg shadow-green-900/15"
        >
          <AuthIcon name="lock" className="size-4" />
          {nextUrl
            ? "Redirecting…"
            : pending
              ? "Submitting…"
              : payment === "cash"
                ? "Place Order"
                : "Continue to Stripe"}
        </button>
      </OrderSummary>
    </form>
  );
}
