import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm/AuthForm";
import { AuthPromotion } from "@/components/AuthPromotion/AuthPromotion";

export const metadata: Metadata = {
  title: "Sign In | FreshCart",
  description:
    "Sign in to your FreshCart account for fresh groceries and everyday essentials.",
};

export default function SignInPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-gray-50 px-4 py-10 sm:px-6 lg:py-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <AuthPromotion mode="sign-in" />
        <div className="mx-auto w-full max-w-154">
          <AuthForm mode="sign-in" />
        </div>
      </div>
    </main>
  );
}
