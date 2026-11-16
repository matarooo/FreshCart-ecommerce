"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { signUp as registerAccount } from "@/app/sign-up/actions";
import { AuthFieldError } from "@/components/AuthFieldError/AuthFieldError";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import { AuthSocialButtons } from "@/components/AuthSocialButtons/AuthSocialButtons";
import { AuthTrustBadges } from "@/components/AuthTrustBadges/AuthTrustBadges";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { PasswordStrength } from "@/components/PasswordStrength/PasswordStrength";
import { authSuccessToastKey } from "@/components/Toaster/Toaster";
import type { AuthField, AuthFormErrors, AuthFormProps } from "./@type";
import { signInSchema, signUpSchema } from "./AuthFormSchema";

export function AuthForm({ mode }: AuthFormProps) {
  const signUp = mode === "sign-up";
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const inputClass =
    "mt-2 h-[42px] w-full rounded-md border border-gray-300 bg-white px-3 text-base outline-none placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100";

  function validateForm(
    form: HTMLFormElement,
    data: FormData,
    focusError = false,
  ) {
    const result = (signUp ? signUpSchema : signInSchema).safeParse({
      ...Object.fromEntries(data),
      terms: data.get("terms") === "on",
    });
    const nextErrors: AuthFormErrors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as AuthField;
        nextErrors[field] ??= issue.message;
      }
      if (focusError) {
        const firstField = form.elements.namedItem(
          result.error.issues[0].path[0] as string,
        );
        if (firstField instanceof HTMLInputElement) firstField.focus();
      }
    }
    setErrors(nextErrors);
    return result;
  }

  function errorId(field: AuthField) {
    return errors[field] ? `${mode}-${field}-error` : undefined;
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || accountCreated) return;
    setSubmitted(true);
    const data = new FormData(event.currentTarget);
    const result = validateForm(event.currentTarget, data, true);
    if (!result.success) {
      toast.error(result.error.issues[0].message, { id: "auth-error" });
      return;
    }

    const { email, password } = result.data;
    const callbackUrl = new URLSearchParams(window.location.search).get(
      "callbackUrl",
    );
    let failureMessage = signUp
      ? "Account creation is unavailable right now. Please try again."
      : "Sign-in is unavailable right now. Please try again.";
    let successMessage = "You’re signed in.";
    setIsSubmitting(true);

    try {
      if (signUp) {
        const registration = await registerAccount(data);
        if (!registration.ok) {
          toast.error(registration.message, { id: "auth-error" });
          return;
        }
        setAccountCreated(true);
        successMessage = registration.message;
        failureMessage =
          "Your account was created. Please sign in to continue.";
      }

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: callbackUrl || "/",
      });

      if (response?.ok && !response.error && response.url) {
        const { pathname, search, hash } = new URL(response.url);
        try {
          sessionStorage.setItem(authSuccessToastKey, successMessage);
        } catch {
          toast.success(successMessage);
        }
        window.location.assign(
          `${window.location.origin}${pathname}${search}${hash}`,
        );
        if (
          hash &&
          pathname === window.location.pathname &&
          search === window.location.search
        ) {
          window.location.reload();
        }
      } else {
        toast.error(
          !signUp && response?.error === "CredentialsSignin"
            ? "The email or password is incorrect."
            : failureMessage,
          { id: "auth-error" },
        );
      }
    } catch {
      toast.error(failureMessage, { id: "auth-error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="auth-title"
      className={`w-full rounded-2xl bg-white text-slate-700 shadow-[0_8px_24px_#0f172a14] ${signUp ? "px-6 py-10 lg:py-10" : "px-8 py-8 sm:p-12"}`}
    >
      <header className="text-center">
        {!signUp && (
          <Link
            href="/"
            aria-label="FreshCart home"
            className="inline-block text-[32px] font-bold tracking-tight text-slate-800"
          >
            <span className="text-brand">Fresh</span>Cart
          </Link>
        )}
        <h1
          id="auth-title"
          className={
            signUp
              ? "text-[30px] font-semibold leading-tight"
              : "mt-3 text-2xl font-bold text-slate-800"
          }
        >
          {signUp ? "Create Your Account" : "Welcome Back!"}
        </h1>
        <p className="mt-2 text-base leading-6">
          {signUp
            ? "Start your fresh journey with us today"
            : "Sign in to continue your fresh shopping experience"}
        </p>
      </header>
      <AuthSocialButtons
        compact={signUp}
        onSelect={(provider) =>
          toast.info(`${provider} sign-in is not connected yet.`)
        }
      />
      <div
        className={`flex items-center gap-4 ${signUp ? "mt-7 mb-2" : "my-6"}`}
      >
        <span className="h-px flex-1 bg-gray-200" />
        <span className={signUp ? "text-base" : "text-xs text-slate-500"}>
          {signUp ? "or" : "OR CONTINUE WITH EMAIL"}
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <form
        aria-busy={isSubmitting}
        noValidate
        method="post"
        onSubmit={submitForm}
        onChange={(event) => {
          if (isSubmitting || accountCreated) return;
          toast.dismiss("auth-error");
          if (submitted) {
            validateForm(
              event.currentTarget,
              new FormData(event.currentTarget),
            );
          }
        }}
        className={signUp ? "space-y-7" : "space-y-6"}
      >
        {signUp && (
          <div>
            <label htmlFor="signup-name">
              Name<span aria-hidden="true">*</span>
            </label>
            <input
              id="signup-name"
              name="name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errorId("name")}
              placeholder="Ali"
              required
              className={inputClass}
            />
            <AuthFieldError id={`${mode}-name-error`} message={errors.name} />
          </div>
        )}
        <div>
          <label
            htmlFor={`${mode}-email`}
            className={signUp ? "" : "text-sm font-medium"}
          >
            {signUp ? "Email*" : "Email Address"}
          </label>
          <div className={signUp ? "" : "relative mt-2"}>
            {!signUp && (
              <NavIcon
                name="mail"
                className="pointer-events-none absolute top-4.5 left-4 size-4 text-gray-400"
              />
            )}
            <input
              id={`${mode}-email`}
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errorId("email")}
              placeholder={signUp ? "ali@example.com" : "Enter your email"}
              required
              className={
                signUp
                  ? inputClass
                  : "h-13 w-full rounded-xl border-2 border-gray-200 bg-white pr-4 pl-12 text-base outline-none placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
              }
            />
          </div>
          <AuthFieldError id={`${mode}-email-error`} message={errors.email} />
        </div>
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor={`${mode}-password`}
              className={signUp ? "" : "text-sm font-medium"}
            >
              {signUp ? "Password*" : "Password"}
            </label>
            {!signUp && (
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "Password reset is not connected yet. Please contact support@freshcart.com for help.",
                  )
                }
                className="cursor-pointer text-sm text-brand hover:underline"
              >
                Forgot Password?
              </button>
            )}
          </div>
          <PasswordInput
            id={`${mode}-password`}
            name="password"
            autoComplete={signUp ? "new-password" : "current-password"}
            placeholder={
              signUp ? "create a strong password" : "Enter your password"
            }
            showIcon={!signUp}
            invalid={Boolean(errors.password)}
            describedBy={
              [signUp ? "password-guidance" : undefined, errorId("password")]
                .filter(Boolean)
                .join(" ") || undefined
            }
            onValueChange={setPassword}
          />
          <AuthFieldError
            id={`${mode}-password-error`}
            message={errors.password}
          />
          {signUp && <PasswordStrength password={password} />}
        </div>
        {signUp && (
          <>
            <div>
              <label htmlFor="signup-confirm-password">Confirm Password*</label>
              <div className="mt-2">
                <PasswordInput
                  id="signup-confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="confirm your password"
                  invalid={Boolean(errors.confirmPassword)}
                  describedBy={errorId("confirmPassword")}
                />
              </div>
              <AuthFieldError
                id={`${mode}-confirmPassword-error`}
                message={errors.confirmPassword}
              />
            </div>
            <div>
              <label htmlFor="signup-phone">Phone Number*</label>
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errorId("phone")}
                placeholder="+1 234 567 8900"
                required
                className={inputClass}
              />
              <AuthFieldError
                id={`${mode}-phone-error`}
                message={errors.phone}
              />
            </div>
          </>
        )}
        <label
          className={`flex cursor-pointer items-center gap-3 ${signUp ? "text-base leading-6" : "text-sm"}`}
        >
          <input
            type="checkbox"
            name={signUp ? "terms" : "remember"}
            required={signUp}
            aria-invalid={signUp ? Boolean(errors.terms) : undefined}
            aria-describedby={signUp ? errorId("terms") : undefined}
            className="size-4 shrink-0 accent-brand"
          />
          <span>
            {signUp ? (
              <>
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="text-brand hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-brand hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </>
            ) : (
              "Keep me signed in"
            )}
          </span>
        </label>
        {signUp && (
          <AuthFieldError id={`${mode}-terms-error`} message={errors.terms} />
        )}
        <button
          type="submit"
          disabled={isSubmitting || accountCreated}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 bg-brand px-4 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-default disabled:opacity-70 ${signUp ? "h-[42px] rounded-lg text-base" : "h-13 rounded-xl text-lg shadow-lg shadow-black/10"}`}
        >
          {signUp && <AuthIcon name="userPlus" />}
          {isSubmitting
            ? signUp
              ? "Creating account…"
              : "Signing in…"
            : signUp
              ? accountCreated
                ? "Account Created"
                : "Create My Account"
              : "Sign In"}
        </button>
      </form>
      <div
        className={`border-t border-gray-100 text-center text-base leading-6 ${signUp ? "mt-4 pt-10 pb-4" : "mt-8 pt-6"}`}
      >
        {signUp ? "Already have an account? " : "New to FreshCart? "}
        <Link
          href={signUp ? "/login" : "/sign-up"}
          className="font-medium text-brand hover:underline"
        >
          {signUp ? "Sign In" : "Create an account"}
        </Link>
      </div>
      {!signUp && <AuthTrustBadges />}
    </section>
  );
}
