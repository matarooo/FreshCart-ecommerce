import Image from "next/image";
import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { PageBannerProps } from "./@type";
export function PageBanner({
  title,
  subtitle,
  icon,
  purple,
  spacious,
  prominent,
  breadcrumb = title,
  parent,
  image,
}: PageBannerProps) {
  const gradient = purple
    ? "from-violet-600 via-violet-500 to-purple-400"
    : prominent
      ? "from-brand via-[#22c55e] to-[#4ade80]"
      : "from-green-600 via-green-500 to-green-400";

  return (
    <header
      className={`bg-linear-to-br py-10 text-white ${spacious || prominent ? "sm:py-16" : "sm:py-14"} ${gradient}`}
    >
      <div className="store-container">
        <nav
          aria-label="Breadcrumb"
          className={`flex gap-2 text-sm text-white/80 ${prominent ? "mb-8" : "mb-6"}`}
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden="true" className="text-white/60">
            /
          </span>
          {parent && (
            <>
              <Link href={parent.href} className="hover:text-white">
                {parent.label}
              </Link>
              <span aria-hidden="true" className="text-white/60">
                /
              </span>
            </>
          )}
          <span aria-current="page" className="text-white">
            {breadcrumb}
          </span>
        </nav>
        <div
          className={`flex items-center ${prominent ? "gap-4 sm:gap-6" : "gap-5"}`}
        >
          <span
            className={`flex size-14 shrink-0 items-center justify-center bg-white/20 shadow-lg shadow-black/10 ring-1 ring-white/15 ${prominent ? "rounded-2xl sm:size-20 sm:rounded-3xl" : "rounded-2xl sm:size-16"}`}
          >
            {image ? (
              <Image
                src={image}
                alt=""
                width={48}
                height={48}
                className="size-12 object-contain"
              />
            ) : (
              <StoreIcon
                name={icon}
                className={prominent ? "size-7 sm:size-10" : "size-8"}
              />
            )}
          </span>
          <div>
            <h1
              className={`text-3xl font-bold tracking-tight ${prominent ? "sm:text-5xl" : "sm:text-4xl"}`}
            >
              {title}
            </h1>
            <p
              className={`text-sm text-white/90 ${prominent ? "mt-2 sm:text-lg" : "mt-1 sm:text-base"}`}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
