import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo/BrandLogo";
import { CategoryMenu } from "@/components/CategoryMenu/CategoryMenu";
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
      <header className="sticky top-0 z-40 shrink-0 bg-white shadow-sm">
        <div className="store-container flex h-16 items-center gap-6 xl:h-[72px] xl:gap-8">
          <BrandLogo />
          <div className="hidden min-w-0 flex-1 xl:ml-[5px] xl:flex">
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
            <CategoryMenu />
            <Link href="/brands" className="hover:text-brand">
              Brands
            </Link>
          </nav>
          <Link
            href="/contact"
            className="hidden shrink-0 items-center gap-2 border-r border-gray-200 pr-4 xl:-mr-2.5 xl:flex"
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
                className="hidden h-10 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 xl:flex"
              >
                <NavIcon name="user" className="size-4" />
                Sign In
              </Link>
            )}
            <MobileMenu key={userName} userName={userName} />
          </div>
        </div>
      </header>
    </>
  );
}
