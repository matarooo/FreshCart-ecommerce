"use client";

import { useState } from "react";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import type { PasswordInputProps } from "./@type";

export function PasswordInput({
  id,
  name,
  placeholder,
  autoComplete,
  showIcon = false,
  describedBy,
  invalid,
  onValueChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`relative flex items-center border border-gray-300 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-green-100 ${showIcon ? "h-[52px] rounded-xl" : "h-[42px] rounded-md"}`}
    >
      {showIcon && (
        <AuthIcon
          name="lock"
          className="absolute left-4 size-4 text-gray-400"
        />
      )}
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        minLength={autoComplete === "new-password" ? 8 : undefined}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        onChange={(event) => {
          onValueChange?.(event.currentTarget.value);
        }}
        className={`h-full w-full min-w-0 rounded-[inherit] bg-transparent pr-12 text-base outline-none placeholder:text-gray-400 focus-visible:outline-none ${showIcon ? "pl-12" : "pl-3"}`}
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        aria-label={`${visible ? "Hide" : "Show"} ${name === "confirmPassword" ? "confirmation password" : "password"}`}
        aria-pressed={visible}
        className="absolute right-1 flex size-10 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:text-slate-700"
      >
        <AuthIcon name={visible ? "eyeOff" : "eye"} className="size-[18px]" />
      </button>
    </div>
  );
}
