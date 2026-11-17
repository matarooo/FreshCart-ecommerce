"use client";
import { useState } from "react";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
export function ContactForm() {
  const [notice, setNotice] = useState("");
  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base placeholder:text-gray-400";
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-brand">
          <StoreIcon name="headset" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Send us a Message
          </h2>
          <p className="text-sm text-muted">
            Fill out the form and we’ll get back to you
          </p>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setNotice(
            "Message delivery is not connected yet. Please email support@freshcart.com or call +1 (800) 123-4567 for assistance. Your message has not been submitted.",
          );
        }}
        onChange={() => setNotice("")}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="John Doe"
              minLength={2}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              required
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm font-medium">
            Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option>Order inquiry</option>
            <option>Shipping & delivery</option>
            <option>Returns & refunds</option>
            <option>Product question</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="How can we help you?"
            rows={5}
            minLength={10}
            required
            className={`${inputClass} resize-y`}
          />
        </div>
        <button
          type="submit"
          className="store-button min-h-13 rounded-xl px-8 text-base"
        >
          <StoreIcon name="mail" className="size-4" />
          Send Message
        </button>
        <output
          className={notice ? "block text-sm leading-6 text-muted" : "sr-only"}
        >
          {notice}
        </output>
      </form>
    </section>
  );
}
