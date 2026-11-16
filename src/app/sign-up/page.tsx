import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm/AuthForm";
import { AuthPromotion } from "@/components/AuthPromotion/AuthPromotion";

export const metadata: Metadata = {
  title: "Create an Account | FreshCart",
  description:
    "Create a FreshCart account and start your fresh shopping journey.",
};

export default function SignUpPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-gray-50 px-4 py-10 sm:px-6 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 lg:grid-cols-2">
        <AuthPromotion mode="sign-up" />
        <div className="mx-auto w-full max-w-[616px]">
          <AuthForm mode="sign-up" />
        </div>
      </div>
    </main>
  );
}
