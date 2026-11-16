"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/account/settings-actions";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import type { ChangePasswordFormProps } from "./@type";

const fields = [
  {
    name: "currentPassword",
    label: "Current Password",
    autoComplete: "current-password",
    placeholder: "Enter your current password",
  },
  {
    name: "password",
    label: "New Password",
    autoComplete: "new-password",
    placeholder: "Enter your new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm New Password",
    autoComplete: "new-password",
    placeholder: "Confirm your new password",
  },
] as const;

export function ChangePasswordForm({ email }: ChangePasswordFormProps) {
  const [result, action, pending] = useActionState(
    changePassword.bind(null, email),
    null,
  );
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
      <header className="mb-6 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
          <AuthIcon name="lock" className="size-6" />
        </span>
        <div>
          <h3 className="font-bold text-slate-900">Change Password</h3>
          <p className="text-sm text-muted">
            You’ll sign in again after changing your password.
          </p>
        </div>
      </header>
      <form action={action} aria-busy={pending}>
        <fieldset disabled={pending} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={`settings-${field.name}`}
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {field.label}
              </label>
              <PasswordInput
                id={`settings-${field.name}`}
                name={field.name}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                describedBy={
                  field.name === "password"
                    ? "settings-password-hint"
                    : undefined
                }
                className="h-12 rounded-xl"
              />
              {field.name === "password" && (
                <p
                  id="settings-password-hint"
                  className="mt-1 text-xs text-muted"
                >
                  Use at least 8 characters, including a number and a symbol.
                </p>
              )}
            </div>
          ))}
          {result && (
            <p role="alert" className="text-sm text-red-700">
              {result.message}
            </p>
          )}
          <button
            type="submit"
            className="store-button mt-3 min-h-12 rounded-xl bg-amber-700 shadow-lg shadow-amber-700/20 hover:bg-amber-800"
          >
            <AuthIcon name="lock" className="size-4" />
            {pending ? "Changing Password…" : "Change Password"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
