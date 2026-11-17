import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { PageBannerProps } from "./@type";
export function PageBanner({
  title,
  subtitle,
  icon,
  purple,
  prominent,
}: PageBannerProps) {
  const gradient = purple
    ? "bg-gradient-to-br from-violet-600 to-purple-400"
    : prominent
      ? "bg-linear-to-br from-brand via-[#22c55e] to-[#4ade80]"
      : "bg-gradient-to-br from-green-600 to-green-400";

  return (
    <header
      className={`text-white ${prominent ? "py-10 sm:py-16" : "py-8 sm:py-10"} ${gradient}`}
    >
      <div className="store-container">
        <nav
          aria-label="Breadcrumb"
          className={`flex gap-2 text-white/80 ${prominent ? "mb-8 text-sm" : "mb-5 text-xs"}`}
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden="true" className="text-white/60">
            /
          </span>
          <span
            aria-current="page"
            className={prominent ? "text-white" : undefined}
          >
            {title}
          </span>
        </nav>
        <div
          className={`flex items-center gap-4 ${prominent ? "sm:gap-6" : ""}`}
        >
          <span
            className={`flex size-14 shrink-0 items-center justify-center bg-white/20 ${prominent ? "rounded-2xl shadow-lg shadow-black/10 ring-1 ring-white/15 sm:size-20 sm:rounded-3xl" : "rounded-xl"}`}
          >
            <StoreIcon
              name={icon}
              className={prominent ? "size-7 sm:size-10" : "size-7"}
            />
          </span>
          <div>
            <h1
              className={`font-bold ${prominent ? "text-3xl tracking-tight sm:text-5xl" : "text-2xl sm:text-3xl"}`}
            >
              {title}
            </h1>
            <p
              className={`text-sm text-white/90 ${prominent ? "mt-2 sm:text-lg" : "mt-1"}`}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
