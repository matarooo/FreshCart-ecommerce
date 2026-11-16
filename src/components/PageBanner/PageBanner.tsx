import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { PageBannerProps } from "./@type";
export function PageBanner({ title, subtitle, icon, purple }: PageBannerProps) {
  return (
    <header
      className={`py-8 text-white sm:py-10 ${purple ? "bg-gradient-to-br from-violet-600 to-purple-400" : "bg-gradient-to-br from-green-600 to-green-400"}`}
    >
      <div className="store-container">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex gap-2 text-xs text-white/80"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-xl bg-white/20">
            <StoreIcon name={icon} className="size-7" />
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-white/90">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
