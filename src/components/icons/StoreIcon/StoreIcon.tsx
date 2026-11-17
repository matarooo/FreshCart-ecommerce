import type { StoreIconName, StoreIconProps } from "./@type";

const paths: Record<StoreIconName, React.ReactNode> = {
  cart: (
    <>
      <path d="M3 3h2l3 13h11l3-10H6M8 10h12" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  box: (
    <>
      <path d="m12 2 10 5-10 5L2 7l10-5ZM2 7v10l10 5 10-5V7M12 12v10M7 4.5l10 5" />
    </>
  ),
  bag: <path d="M5 8h14l1 13H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4m8-4v4m-8 7h.01m4 0h.01m4 0h.01" />
    </>
  ),
  cash: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01m12 0h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  receipt: (
    <path d="M5 3l2 2 2-2 3 2 3-2 2 2 2-2v18l-2-2-2 2-3-2-3 2-2-2-2 2V3Zm4 6h6m-6 4h6m-6 4h4" />
  ),
  tag: (
    <>
      <path d="M3 3h9l10 10-9 9L3 12V3Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </>
  ),
  truck: (
    <>
      <path d="M2 5h12v12H2zM14 9h4l4 4v4h-8M14 13h8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  shield: <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6" />,
  return: <path d="M3 10a9 9 0 1 1 2 9M3 3v7h7" />,
  compare: (
    <path d="M20 4v6h-6M4 20v-6h6M4.8 9a7.5 7.5 0 0 1 12.7-3L20 10M4 14l2.5 4A7.5 7.5 0 0 0 19.2 15" />
  ),
  eye: (
    <>
      <path d="M2 12c2.5-4.3 6-6.5 10-6.5s7.5 2.2 10 6.5c-2.5 4.3-6 6.5-10 6.5S4.5 16.3 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-2a8 8 0 0 1 16 0v6a4 4 0 0 1-4 4h-3" />
      <rect x="3" y="11" width="4" height="7" rx="2" />
      <rect x="17" y="11" width="4" height="7" rx="2" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m9 10 6-4M9 14l6 4" />
    </>
  ),
  bolt: <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" />,
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  folder: <path d="M3 19V5h6l2 2h10v3M3 19l3-9h16l-3 9H3Z" />,
  file: (
    <path d="M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 0v6h5M8 12h7m-7 4h7" />
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  cookie: (
    <>
      <path d="M21 13a4 4 0 0 1-5-5 4 4 0 0 1-5-5 9 9 0 1 0 10 10Z" />
      <path d="M8 12h.01m2 5h.01m5-3h.01" strokeWidth="3" />
    </>
  ),
  handshake: (
    <path d="m2 12 4-8 4 2m8-2 4 8-4 3-6-5-2 2a2 2 0 0 1-3-2l4-4h4l3-2M2 12l4 3 4 4a2 2 0 0 0 3 0l4-4" />
  ),
  scales: (
    <path d="M12 3v17M7 21h10M3 6h18M6 6l-4 8h8L6 6Zm12 0-4 8h8l-4-8ZM2 14a4 4 0 0 0 8 0m4 0a4 4 0 0 0 8 0" />
  ),
  verifiedUser: (
    <>
      <circle cx="9" cy="7" r="3.5" />
      <path d="M2 20v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2M16 10l2 2 4-5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
};

export function StoreIcon({ name, className = "size-5" }: StoreIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
