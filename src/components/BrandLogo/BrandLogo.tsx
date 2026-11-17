import Image from "next/image";
import Link from "next/link";

export function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="FreshCart home"
      className="flex shrink-0 items-center"
    >
      <Image
        src="/images/freshcart-logo.svg"
        alt=""
        width={160}
        height={31}
        className="h-auto w-30 lg:w-40"
      />
    </Link>
  );
}
