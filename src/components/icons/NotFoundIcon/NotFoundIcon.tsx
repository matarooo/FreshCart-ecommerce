import type { NotFoundIconProps } from "./@type";

const artwork = {
  apple: (
    <>
      <path d="M12 7C5 1 0 10 5 18c3 5 5 2 7 2s4 3 7-2c5-8 0-17-7-11Z" />
      <path d="M12 6c-1-5 3-6 6-6 0 4-2 6-6 6Z" />
    </>
  ),
  carrot: (
    <>
      <path d="M15 6C7 2 2 19 2 22c4-1 20-6 15-14L15 6Z" />
      <path d="M16 5c0-4 3-5 4-4l-1 4c4-2 6 0 4 2l-5 1Z" />
      <path d="m8 12 3 3m-6 1 2 2" stroke="white" strokeWidth="1.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M3 20C-2 8 9 1 22 2c0 14-5 23-19 18Z" />
      <path
        d="M5 18c3-6 7-10 12-12"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  sprout: (
    <>
      <path d="M11 23V10h2v13Z" />
      <path d="M12 12C3 15 0 8 1 2c8 0 13 3 11 10Zm1-3C12 2 18 0 24 1c0 7-5 12-11 8Z" />
    </>
  ),
  cart: (
    <>
      <path d="M2 3h3l3.5 12H19a3 3 0 0 0 3-2l2-8a1 1 0 0 0-1-1H6L5.5 2H2a1 1 0 0 0 0 2Z" />
      <path d="M9 16h11a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2Z" />
      <circle cx="10" cy="21" r="2" />
      <circle cx="19" cy="21" r="2" />
    </>
  ),
  home: (
    <>
      <path d="m1 11 11-9 11 9-2 2-2-2v11h-5v-7h-4v7H5V11l-2 2Z" />
    </>
  ),
};
export function NotFoundIcon({
  name,
  className = "size-6",
}: NotFoundIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {artwork[name]}
    </svg>
  );
}
