import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { getBrands } from "@/lib/brands/brand.api";
import { shopHref } from "@/lib/catalog";
export const metadata: Metadata = { title: "Top Brands | FreshCart" };
export default async function BrandsPage() {
  const brands = await getBrands();
  return (
    <main id="main-content" className="flex-1 bg-gray-50/60">
      <PageBanner
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        icon="tag"
        purple
      />
      <div className="store-container grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <Link
            href={shopHref("brand", brand.name)}
            key={brand._id}
            className="group rounded-2xl border border-gray-200 bg-white p-4 pb-7 text-center shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3">
              <Image
                src={brand.image}
                alt={`${brand.name} logo`}
                width={160}
                height={113}
                className="w-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
              />
            </div>
            <h2 className="mt-4 text-xs font-medium">{brand.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
