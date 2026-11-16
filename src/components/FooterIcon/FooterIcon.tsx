import type { ReactNode } from "react";
import type { FooterIconName, FooterIconProps } from "./@type";

const paths: Record<FooterIconName, ReactNode> = {
  returns: <path d="M3 4v6h6M3.6 10a8 8 0 1 1 .9 7" />,
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
      <path d="M12 3v18" />
    </>
  ),
  location: (
    <path
      fill="currentColor"
      stroke="none"
      fillRule="evenodd"
      d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
    />
  ),
  card: (
    <>
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        fill="currentColor"
        stroke="none"
      />
      <path d="M2 10h20" stroke="#111827" />
      <path d="M5 15h3m3 0h2" stroke="#111827" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9Z"
    />
  ),
  twitter: (
    <path
      fill="currentColor"
      stroke="none"
      d="M22 5.8a8 8 0 0 1-2.4.7A4.2 4.2 0 0 0 21.4 4a8.3 8.3 0 0 1-2.7 1A4.2 4.2 0 0 0 11.5 9 11.9 11.9 0 0 1 2.9 4.6a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5 4.2 4.2 0 0 0 3.4 4.2 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.6a11.8 11.8 0 0 0 18.2-10A8.5 8.5 0 0 0 22 5.8Z"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <path
      fill="currentColor"
      stroke="none"
      fillRule="evenodd"
      d="M21.6 6.4c-.2-1-1-1.8-2-2C17.9 4 12 4 12 4s-5.9 0-7.6.4c-1 .2-1.8 1-2 2C2 8.1 2 12 2 12s0 3.9.4 5.6c.2 1 1 1.8 2 2C6.1 20 12 20 12 20s5.9 0 7.6-.4c1-.2 1.8-1 2-2 .4-1.7.4-5.6.4-5.6s0-3.9-.4-5.6ZM10 8l6 4-6 4Z"
    />
  ),
};

export function FooterIcon({ name, className = "size-4" }: FooterIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
