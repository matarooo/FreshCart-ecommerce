import type { NavIconName, NavIconProps } from "./@type";

const paths: Record<NavIconName, React.ReactNode> = {
  cart: (
    <>
      <path d="M2 3h3l3 13h11l3-10H6" />
      <path d="M8 10h12M9 13h10" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  menu: <path d="M5 6h14M5 12h14M5 18h14" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  headset: (
    <>
      <path d="M4 13v-2a8 8 0 0 1 16 0v6a4 4 0 0 1-4 4h-3" />
      <rect x="3" y="11" width="4" height="7" rx="2" />
      <rect x="17" y="11" width="4" height="7" rx="2" />
    </>
  ),
  account: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <circle cx="8" cy="10" r="2" />
      <path d="M4 17a4 4 0 0 1 8 0M15 9h4M15 13h4" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6 19a6 6 0 0 1 12 0" />
    </>
  ),
  orders: (
    <path d="m12 3 9 5v8l-9 5-9-5V8l9-5Zm0 9 9-4M12 12 3 8m9 4v9m-5-16 9 5" />
  ),
  settings: (
    <>
      <path d="M10 3h4l.6 2.4 1.8 1 2.4-.7 2 3.5-1.8 1.7v2.2l1.8 1.7-2 3.5-2.4-.7-1.8 1-.6 2.4h-4l-.6-2.4-1.8-1-2.4.7-2-3.5L5 13.1v-2.2L3.2 9.2l2-3.5 2.4.7 1.8-1L10 3Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="6" r="4" />
      <path d="M4 22v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  signOut: <path d="M10 4H4v16h6M9 12h12m-4-4 4 4-4 4" />,
  phone: <path d="m5 3 4 4-2 3a16 16 0 0 0 7 7l3-2 4 4-2 3C10 23 1 14 2 5Z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  truck: (
    <>
      <path d="M2 5h12v12H2zM14 9h4l4 4v4h-8M14 13h8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  gift: (
    <>
      <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13" />
      <path d="M12 8H8a3 3 0 1 1 3-3Zm0 0h4a3 3 0 1 0-3-3Z" />
    </>
  ),
};

export function NavIcon({ name, className = "size-5" }: NavIconProps) {
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
