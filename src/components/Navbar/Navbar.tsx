import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import { ProfileMenu } from "@/components/ProfileMenu/ProfileMenu";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { ShoppingLinks } from "@/components/ShoppingLinks/ShoppingLinks";
import { UtilityBar } from "@/components/UtilityBar/UtilityBar";
import type { NavbarProps } from "./@type";

export function Navbar({ userName, userEmail }: NavbarProps) {
  return (
    <>
      <UtilityBar userName={userName} />
      <header className="sticky top-0 z-50 shrink-0 border-b border-gray-200 bg-white shadow-[0_1px_3px_0_#00000005]">
        <div className="mx-auto flex h-[68px] max-w-[1540px] items-center gap-6 px-5 xl:h-[76px] xl:gap-8">
          <BrandLogo />
          <div className="hidden min-w-0 flex-1 xl:flex">
            <SearchBar id="desktop-product-search" />
          </div>
          <nav
            aria-label="Main navigation"
            className="hidden shrink-0 items-center gap-6 text-base text-slate-700 xl:flex"
          >
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            <Link href="/shop" className="hover:text-brand">
              Shop
            </Link>
            <details className="group relative">
              <summary className="flex cursor-pointer items-center gap-2 hover:text-brand">
                Categories
                <NavIcon
                  name="chevron"
                  className="size-3 transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="absolute left-0 top-full mt-5 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                <Link
                  href="/categories"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-green-50 hover:text-brand"
                >
                  Browse all categories
                </Link>
              </div>
            </details>
            <Link href="/brands" className="hover:text-brand">
              Brands
            </Link>
          </nav>
          <Link
            href="/contact"
            className="hidden shrink-0 items-center gap-2 border-r border-gray-200 pr-4 xl:flex"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-green-50 text-brand">
              <NavIcon name="headset" className="size-5" />
            </span>
            <span className="text-xs">
              <span className="block text-gray-400">Support</span>
              <span className="font-medium text-slate-700">24/7 Help</span>
            </span>
          </Link>
          <div className="ml-auto flex shrink-0 items-center gap-1.5 text-muted min-[375px]:gap-4 xl:ml-0 xl:gap-5">
            <ShoppingLinks />
            {userName ? (
              <ProfileMenu userName={userName} userEmail={userEmail} />
            ) : (
              <Link
                href="/login"
                aria-label="Sign In"
                className="hidden size-8 items-center justify-center hover:text-brand xl:flex"
              >
                <NavIcon name="profile" className="size-5" />
              </Link>
            )}
            <MobileMenu key={userName} userName={userName} />
          </div>
        </div>
      </header>
    </>
  );
}
