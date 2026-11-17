import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
export function HomePromotions() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[
        {
          tag: "Deal of the Day",
          title: "Fresh Organic Fruits",
          description: "Get up to 40% off on selected organic fruits",
          discount: "40% OFF",
          code: "ORGANIC40",
          color: "from-emerald-500 to-emerald-700",
          label: "Shop Now",
          accent: "text-emerald-600",
          icon: "🔥",
          href: "/shop?deals=true",
        },
        {
          tag: "New Arrivals",
          title: "Exotic Vegetables",
          description: "Discover our latest collection of premium vegetables",
          discount: "25% OFF",
          code: "FRESH25",
          color: "from-orange-400 to-rose-500",
          label: "Explore Now",
          accent: "text-orange-600",
          icon: "✨",
          href: "/shop?sort=newest",
        },
      ].map((offer, index) => (
        <ScrollReveal
          key={offer.title}
          direction={index === 0 ? "left" : "right"}
        >
          <section
            className={`relative isolate h-full overflow-hidden rounded-2xl bg-linear-to-br ${offer.color} p-8 text-white`}
          >
            <div className="absolute -top-20 -right-20 -z-10 size-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-16 -z-10 size-32 rounded-full bg-white/10" />
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              <span aria-hidden="true">{offer.icon}</span>
              {offer.tag}
            </span>
            <h3 className="mt-4 text-2xl font-bold md:text-3xl">
              {offer.title}
            </h3>
            <p className="mt-2 text-white/90">{offer.description}</p>
            <p className="mt-4 flex flex-wrap items-center gap-4">
              <strong className="text-3xl">{offer.discount}</strong>
              <span className="text-sm">
                Use code: <b>{offer.code}</b>
              </span>
            </p>
            <Link
              href={offer.href}
              className={`mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold transition-transform motion-safe:hover:scale-105 ${offer.accent}`}
            >
              {offer.label}
              <StoreIcon name="arrow" className="size-4" />
            </Link>
          </section>
        </ScrollReveal>
      ))}
    </div>
  );
}
