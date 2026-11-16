"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider/CartProvider";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { useCommerce } from "@/lib/commerce-store";
export function ShoppingLinks() {
  const { wishlist } = useCommerce();
  const { cartCount } = useCart();
  return (
    <>
      {[
        {
          href: "/wishlist",
          label: "Wishlist",
          icon: "heart" as const,
          count: wishlist.length,
        },
        {
          href: "/cart",
          label: "Shopping cart",
          icon: "cart" as const,
          count: cartCount,
        },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-label={`${item.label}, ${item.count} items`}
          className="relative flex size-8 items-center justify-center hover:text-brand"
        >
          <StoreIcon name={item.icon} className="size-6" />
          {item.count > 0 && (
            <span
              className={`absolute -top-1 -right-1 flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] leading-4 text-white ${item.icon === "heart" ? "bg-rose-500" : "bg-brand"}`}
            >
              {item.count}
            </span>
          )}
        </Link>
      ))}
    </>
  );
}
