import Link from "next/link";
import { NavIcon } from "@/components/NavIcon/NavIcon";

export function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="FreshCart home"
      className="flex shrink-0 items-center gap-1 text-[22px] font-bold tracking-[-1px] xl:gap-1.5 xl:text-[28px]"
    >
      <span className="relative text-[#0aad0a]">
        <NavIcon name="cart" className="size-6 xl:size-8" />
        <span className="absolute -bottom-1 left-0 h-px w-6 -rotate-12 bg-current xl:w-8" />
      </span>
      FreshCart
    </Link>
  );
}
