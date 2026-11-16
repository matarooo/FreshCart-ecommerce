"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import {
  egyptianPhoneError,
  normalizeEgyptianMobile,
} from "@/lib/addresses/egyptian-phone";
import type { CheckoutAddressFieldsProps } from "./@type";

const empty = { city: "", details: "", phone: "" };
const field =
  "mt-2 min-h-14 w-full rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-14 text-base text-slate-900 placeholder:text-gray-400 focus:border-brand focus:outline-none";
const iconBox =
  "pointer-events-none absolute left-4 top-5 flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500";

export function CheckoutAddressFields({
  addresses,
  disabled,
}: CheckoutAddressFieldsProps) {
  const [selected, setSelected] = useState(addresses[0]?.id ?? "");
  const [shipping, setShipping] = useState<typeof empty>(addresses[0] ?? empty);
  const phoneInput = useRef<HTMLInputElement>(null);
  const [phoneTouched, setPhoneTouched] = useState(
    Boolean(addresses[0]?.phone),
  );
  const validPhone = normalizeEgyptianMobile(shipping.phone) !== null;
  const showPhoneError = phoneTouched && !validPhone;

  useEffect(() => {
    phoneInput.current?.setCustomValidity(
      shipping.phone && !validPhone ? egyptianPhoneError : "",
    );
  }, [shipping.phone, validPhone]);

  function edit(key: "city" | "details" | "phone", value: string) {
    setSelected("");
    setShipping((current) => ({ ...current, [key]: value }));
  }

  return (
    <section
      aria-labelledby="shipping-heading"
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="bg-linear-to-r from-green-600 to-green-800 px-6 py-4 text-white">
        <h2
          id="shipping-heading"
          className="flex items-center gap-2 text-lg font-bold"
        >
          <FooterIcon name="location" className="size-5" /> Shipping Address
        </h2>
        <p className="mt-1 text-sm text-green-50">
          Where should we deliver your order?
        </p>
      </div>
      <fieldset disabled={disabled} className="space-y-5 p-5 sm:p-6">
        <legend className="sr-only">Shipping address</legend>
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold"
          >
            i
          </span>
          <div>
            <p className="font-medium">Delivery Information</p>
            <p className="text-xs">
              Check that your address and phone number are accurate.
            </p>
          </div>
        </div>
        {addresses.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium">
              Saved address
              <select
                value={selected}
                onChange={(event) => {
                  const address = addresses.find(
                    (item) => item.id === event.target.value,
                  );
                  setSelected(address?.id ?? "");
                  setShipping(address ?? empty);
                  setPhoneTouched(Boolean(address?.phone));
                }}
                className="ml-2 max-w-full rounded-lg border border-gray-200 px-3 py-2"
              >
                <option value="">Enter an address</option>
                {addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.name}
                  </option>
                ))}
              </select>
            </label>
            <Link
              href="/account?checkout=1"
              className="text-xs text-brand hover:underline"
            >
              Manage addresses
            </Link>
          </div>
        )}
        <label className="block text-sm font-medium text-slate-900">
          City{" "}
          <span aria-hidden="true" className="text-rose-600">
            *
          </span>
          <span className="relative block">
            <span className={iconBox}>
              <StoreIcon name="grid" className="size-4" />
            </span>
            <input
              className={field}
              name="city"
              placeholder="e.g. Cairo, Alexandria, Giza"
              autoComplete="address-level2"
              maxLength={80}
              required
              value={shipping.city}
              onChange={(event) => edit("city", event.target.value)}
            />
          </span>
        </label>
        <label className="block text-sm font-medium text-slate-900">
          Street Address{" "}
          <span aria-hidden="true" className="text-rose-600">
            *
          </span>
          <span className="relative block">
            <span className={iconBox}>
              <FooterIcon name="location" className="size-4" />
            </span>
            <textarea
              className={field}
              name="details"
              placeholder="Street name, building number, floor, apartment..."
              autoComplete="street-address"
              maxLength={240}
              rows={3}
              required
              value={shipping.details}
              onChange={(event) => edit("details", event.target.value)}
            />
          </span>
        </label>
        <div className="text-sm font-medium text-slate-900">
          <label htmlFor="checkout-phone" className="block">
            Phone Number{" "}
            <span aria-hidden="true" className="text-rose-600">
              *
            </span>
          </label>
          <span className="relative block">
            <span className={iconBox}>
              <NavIcon name="phone" className="size-4" />
            </span>
            <input
              ref={phoneInput}
              className={`${field} aria-invalid:border-rose-400 aria-invalid:focus:border-rose-500 sm:pr-44`}
              id="checkout-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={25}
              placeholder="01xxxxxxxxx"
              required
              aria-invalid={showPhoneError || undefined}
              aria-describedby={
                showPhoneError
                  ? "checkout-phone-hint checkout-phone-error"
                  : "checkout-phone-hint"
              }
              value={shipping.phone}
              onChange={(event) => edit("phone", event.target.value)}
              onBlur={() => setPhoneTouched(true)}
              onInvalid={(event) => {
                event.preventDefault();
                setPhoneTouched(true);
                event.currentTarget.focus();
              }}
            />
            <span
              id="checkout-phone-hint"
              className="mt-1 block text-xs font-normal text-muted sm:pointer-events-none sm:absolute sm:top-1/2 sm:right-4 sm:mt-0 sm:-translate-y-1/2"
            >
              Egyptian numbers only
            </span>
          </span>
          {showPhoneError && (
            <span
              id="checkout-phone-error"
              role="alert"
              className="mt-2 block text-sm font-normal text-red-600"
            >
              {egyptianPhoneError}
            </span>
          )}
        </div>
        <details className="text-sm text-muted">
          <summary className="cursor-pointer text-brand">
            Add postal code (optional)
          </summary>
          <label className="mt-2 block max-w-xs">
            Postal code{" "}
            <input
              className="mt-2 block w-full rounded-lg border border-gray-200 px-3 py-2 text-slate-900"
              name="postalCode"
              autoComplete="postal-code"
              maxLength={12}
            />
          </label>
        </details>
      </fieldset>
    </section>
  );
}
