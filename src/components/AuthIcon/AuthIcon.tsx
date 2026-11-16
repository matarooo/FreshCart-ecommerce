import type { ReactNode } from "react";
import type { AuthIconName, AuthIconProps } from "./@type";

const paths: Record<AuthIconName, ReactNode> = {
  google: (
    <path
      fill="currentColor"
      stroke="none"
      d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.7 4.7 0 0 1-2 3.1 6 6 0 1 1 1.5-9.5l3-2.9A10 10 0 1 0 22 12c0 .1-.4.1-.4.2Z"
    />
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="11" fill="currentColor" stroke="none" />
      <path
        d="M13 22v-9h3l.5-3H13V8c0-1 .5-1.5 1.5-1.5H17V3.2L14.5 3C11.5 3 10 4.8 10 7.5V10H7v3h3v9"
        fill="white"
        stroke="none"
      />
    </>
  ),
  lock: (
    <>
      <rect
        x="5"
        y="10"
        width="14"
        height="12"
        rx="2"
        fill="currentColor"
        stroke="none"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="m3 3 18 18M10.5 5.1 12 5c6.5 0 10 7 10 7a19 19 0 0 1-3.3 4M6.1 6.1A20 20 0 0 0 2 12s3.5 7 10 7a12 12 0 0 0 5.4-1.4" />
      <path d="M10 10a3 3 0 0 0 4 4" />
    </>
  ),
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="m12 2 3.1 6.3 7 .9-5 4.9 1.2 6.9-6.3-3.3L5.7 21l1.2-6.9-5-4.9 7-.9Z"
    />
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 4 5v2" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="9" cy="6" r="4" fill="currentColor" stroke="none" />
      <path d="M1 22v-3a8 8 0 0 1 16 0v3" fill="currentColor" stroke="none" />
      <path d="M20 5v6m-3-3h6" />
    </>
  ),
};

export function AuthIcon({ name, className = "size-5" }: AuthIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
