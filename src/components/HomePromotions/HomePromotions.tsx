import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
export function HomePromotions() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {[
        {
          tag: "Deal of the Day",
          title: "Fresh Organic Fruits",
          description: "Get up to 40% off on selected organic fruits",
          discount: "40% OFF",
          code: "ORGANIC40",
          color: "from-emerald-500 to-emerald-700",
          label: "Shop Now",
        },
        {
          tag: "New Arrivals",
          title: "Exotic Vegetables",
          description: "Discover our latest collection of premium vegetables",
          discount: "25% OFF",
          code: "FRESH25",
          color: "from-orange-400 to-rose-500",
          label: "Explore Now",
        },
      ].map((offer) => (
        <section
          key={offer.title}
          className={`relative isolate overflow-hidden rounded-2xl bg-gradient-to-br ${offer.color} p-6 text-white sm:p-8`}
        >
          <div className="absolute -top-12 -right-10 -z-10 size-40 rounded-full bg-white/10" />
          <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium">
            {offer.tag}
          </span>
          <h2 className="mt-4 text-2xl font-bold">{offer.title}</h2>
          <p className="mt-2 text-xs text-white/90">{offer.description}</p>
          <p className="mt-4 flex flex-wrap items-center gap-3">
            <strong className="text-2xl">{offer.discount}</strong>
            <span className="text-xs">
              Use code: <b>{offer.code}</b>
            </span>
          </p>
          <Link
            href="/shop?deals=true"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-emerald-700"
          >
            {offer.label}
            <StoreIcon name="arrow" className="size-4" />
          </Link>
        </section>
      ))}
    </div>
  );
}
