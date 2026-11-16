import { BrandLogo } from "@/components/BrandLogo/BrandLogo";
import { FooterBenefits } from "@/components/FooterBenefits/FooterBenefits";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { FooterLinks } from "@/components/FooterLinks/FooterLinks";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import type { FooterSocialLink } from "./@type";

const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/shop?category=electronics" },
      { label: "Men's Fashion", href: "/shop?category=men-s-fashion" },
      { label: "Women's Fashion", href: "/shop?category=women-s-fashion" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/account/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/sign-up" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const socialLinks: FooterSocialLink[] = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
  { label: "Twitter", icon: "twitter", href: "https://twitter.com/" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/" },
];

export function Footer() {
  return (
    <footer className="bg-[#111827] text-sm text-gray-400">
      <FooterBenefits />
      <div className="mx-auto grid max-w-[1368px] gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-[2.15fr_repeat(4,1fr)] lg:gap-10">
        <div className="md:col-span-2 lg:col-span-1">
          <div className="inline-flex rounded-lg bg-white px-4 py-2 text-[#263640] [&_a]:gap-1.5 [&_a]:text-[28px] [&_svg]:size-8">
            <BrandLogo />
          </div>
          <p className="mt-8 max-w-[430px] leading-[1.6]">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>
          <address className="mt-6 space-y-3 not-italic">
            <a
              href="tel:+18001234567"
              className="flex w-fit items-center gap-3 hover:text-white"
            >
              <NavIcon
                name="phone"
                className="size-4 shrink-0 text-green-500"
              />
              +1 (800) 123-4567
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex w-fit items-center gap-3 hover:text-white"
            >
              <NavIcon name="mail" className="size-4 shrink-0 text-green-500" />
              support@freshcart.com
            </a>
            <p className="flex items-center gap-3">
              <FooterIcon
                name="location"
                className="size-4 shrink-0 text-green-500"
              />
              123 Commerce Street, New York, NY 10001
            </p>
          </address>
          <ul aria-label="Social media" className="mt-6 flex gap-3">
            {socialLinks.map(({ label, icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  <FooterIcon name={icon} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {linkGroups.map((group) => (
          <FooterLinks key={group.title} {...group} />
        ))}
      </div>
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-[1368px] flex-col items-center justify-between gap-0 px-4 py-6 text-gray-500 md:flex-row md:gap-4">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <ul
            aria-label="Accepted payment methods"
            className="flex flex-wrap justify-center gap-4"
          >
            {["Visa", "Mastercard", "PayPal"].map((method) => (
              <li key={method} className="flex items-center gap-2 leading-6">
                <FooterIcon name="card" />
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
