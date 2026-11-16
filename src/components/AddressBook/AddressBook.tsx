"use client";

import { useActionState, useCallback, useState } from "react";
import { deleteAddress } from "@/app/account/actions";
import { AddressEditor } from "@/components/AddressEditor/AddressEditor";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { AddressBookProps } from "./@type";

export function AddressBook({ addresses, email }: AddressBookProps) {
  const [editing, setEditing] = useState(false);
  const closeEditor = useCallback(() => setEditing(false), []);
  const [removed, remove, removing] = useActionState(
    deleteAddress.bind(null, email),
    null,
  );
  return (
    <section aria-labelledby="my-addresses" className="min-w-0">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="my-addresses" className="text-xl font-bold text-slate-900">
            My Addresses
          </h2>
          <p className="mt-1 text-sm text-muted">
            Manage your saved delivery addresses
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="store-button rounded-xl shadow-lg shadow-green-900/15"
        >
          <StoreIcon name="plus" className="size-4" /> Add Address
        </button>
      </div>
      {editing && <AddressEditor email={email} onClose={closeEditor} />}
      {!addresses.length && (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center">
          <span className="mb-5 flex size-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FooterIcon name="location" className="size-8" />
          </span>
          <h3 className="text-lg font-bold text-slate-900">No Addresses Yet</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="store-button mt-6 rounded-xl shadow-lg shadow-green-900/15"
          >
            <StoreIcon name="plus" className="size-4" /> Add Your First Address
          </button>
        </div>
      )}
      {addresses.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                  <FooterIcon
                    name="location"
                    className="size-4 shrink-0 text-brand"
                  />{" "}
                  {address.name}
                </h3>
                <form action={remove}>
                  <input type="hidden" name="addressId" value={address.id} />
                  <button
                    type="submit"
                    disabled={removing}
                    aria-label={`Remove address ${address.name}`}
                    className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                  >
                    <StoreIcon name="trash" className="size-4" />
                  </button>
                </form>
              </div>
              <p className="mt-3 text-sm text-slate-700">{address.details}</p>
              <p className="mt-1 text-sm text-muted">
                {address.city} · {address.phone}
              </p>
            </li>
          ))}
        </ul>
      )}
      {removed && (
        <output
          className={`mt-4 block text-sm ${removed.ok ? "text-brand" : "text-red-700"}`}
        >
          {removed.message}
        </output>
      )}
    </section>
  );
}
