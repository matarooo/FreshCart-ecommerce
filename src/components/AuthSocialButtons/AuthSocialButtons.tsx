"use client";

import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import type { AuthSocialButtonsProps } from "./@type";

export function AuthSocialButtons({
  compact,
  onSelect,
}: AuthSocialButtonsProps) {
  return (
    <div
      className={`grid gap-3 ${compact ? "mt-10 grid-cols-2 gap-2" : "mt-8"}`}
    >
      {(["Google", "Facebook"] as const).map((provider) => (
        <button
          key={provider}
          type="button"
          onClick={() => onSelect(provider)}
          className={`flex min-w-0 cursor-pointer items-center justify-center gap-3 border border-gray-300 bg-white px-2 text-base hover:bg-gray-50 ${compact ? "h-[42px] rounded-lg font-medium" : "h-[52px] rounded-xl border-2"}`}
        >
          <AuthIcon
            name={provider === "Google" ? "google" : "facebook"}
            className={`size-[18px] shrink-0 ${provider === "Google" ? "text-red-500" : "text-blue-600"}`}
          />
          {compact ? provider : `Continue with ${provider}`}
        </button>
      ))}
    </div>
  );
}
