"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { saveAddress } from "@/app/account/actions";
import type { AddressEditorProps } from "./@type";

const fieldClass =
  "mt-2 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-gray-400 focus:border-brand focus:outline-brand";

export function AddressEditor({ email, onClose }: AddressEditorProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [result, save, pending] = useActionState(
    saveAddress.bind(null, email),
    null,
  );

  useEffect(() => {
    const modal = dialog.current;
    if (modal && !modal.open) modal.showModal();
  }, []);

  useEffect(() => {
    if (result?.ok) dialog.current?.close();
  }, [result]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => {
        if (pending) event.preventDefault();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl bg-white p-5 text-slate-700 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 id={titleId} className="text-xl font-bold text-slate-900">
          Add New Address
        </h3>
        <button
          type="button"
          aria-label="Close"
          disabled={pending}
          onClick={() => dialog.current?.close()}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl leading-none font-semibold hover:bg-gray-200 disabled:opacity-50"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form action={save} className="space-y-5">
        <label className="block text-sm font-medium">
          Address Name
          <input
            className={fieldClass}
            name="name"
            required
            maxLength={60}
            placeholder="e.g. Home, Office"
          />
        </label>
        <label className="block text-sm font-medium">
          Full Address
          <textarea
            className={fieldClass}
            name="details"
            required
            maxLength={240}
            rows={3}
            autoComplete="street-address"
            placeholder="Street, building, apartment..."
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Phone Number
            <input
              className={fieldClass}
              name="phone"
              type="tel"
              required
              maxLength={25}
              autoComplete="tel"
              placeholder="01xxxxxxxxx"
            />
          </label>
          <label className="text-sm font-medium">
            City
            <input
              className={fieldClass}
              name="city"
              required
              maxLength={80}
              autoComplete="address-level2"
              placeholder="Cairo"
            />
          </label>
        </div>
        {result && !result.ok && (
          <p role="alert" className="text-sm text-red-700">
            {result.message}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => dialog.current?.close()}
            className="min-h-12 rounded-xl bg-gray-100 px-3 py-2.5 text-sm font-semibold hover:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="store-button min-h-12 rounded-xl shadow-lg shadow-green-900/15"
          >
            {pending ? "Saving…" : "Add Address"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
