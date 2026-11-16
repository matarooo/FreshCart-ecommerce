"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { saveProfile } from "@/app/account/settings-actions";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import type { AccountProfileFormProps } from "./@type";

const fields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Enter your name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
    placeholder: "Enter your email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "tel",
    placeholder: "01xxxxxxxxx",
  },
] as const;

export function AccountProfileForm({
  profile,
  account,
}: AccountProfileFormProps) {
  const router = useRouter();
  const [draft, setDraft] = useState(profile);
  const [result, action, pending] = useActionState(
    saveProfile.bind(null, profile.email),
    null,
  );
  useEffect(() => {
    if (result?.ok) router.refresh();
  }, [result, router]);

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="p-5 sm:p-8">
        <header className="mb-6 flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-green-100 text-brand">
            <NavIcon name="user" className="size-6" />
          </span>
          <div>
            <h3 className="font-bold text-slate-900">Profile Information</h3>
            <p className="text-sm text-muted">Update your personal details</p>
          </div>
        </header>
        <form action={action} aria-busy={pending}>
          <fieldset disabled={pending} className="space-y-5">
            {fields.map((field) => (
              <label
                key={field.name}
                className="block text-sm font-medium text-slate-700"
              >
                {field.label}
                <input
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  value={draft[field.name] ?? ""}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      [field.name]: event.currentTarget.value,
                    })
                  }
                  required={field.name !== "phone"}
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 text-base text-slate-900 placeholder:text-gray-400"
                />
              </label>
            ))}
            {result && (
              <p
                role={result.ok ? "status" : "alert"}
                className={`text-sm ${result.ok ? "text-green-800" : "text-red-700"}`}
              >
                {result.message}
              </p>
            )}
            <button
              type="submit"
              className="store-button mt-3 min-h-12 rounded-xl shadow-lg shadow-green-700/20"
            >
              <StoreIcon name="check" className="size-4" />
              {pending ? "Saving…" : "Save Changes"}
            </button>
          </fieldset>
        </form>
      </div>
      <div className="border-t border-gray-100 bg-gray-50 p-5 sm:p-8">
        <h4 className="font-bold text-slate-900">Account Information</h4>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <dt className="text-muted">User ID</dt>
            <dd className="font-mono text-xs text-slate-700">{account.id}</dd>
          </div>
          {account.role && (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Role</dt>
              <dd className="rounded-lg bg-green-100 px-3 py-1 text-green-800 capitalize">
                {account.role}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
