import type { Metadata } from "next";
import { Suspense } from "react";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { ShopResults } from "@/components/ShopResults/ShopResults";
export const metadata: Metadata = { title: "Shop All Products | FreshCart" };
export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <main id="main-content" className="flex-1 bg-gray-50 pb-10">
      <PageBanner
        title="All Products"
        subtitle="Explore our complete product collection"
        icon="box"
      />
      <Suspense
        fallback={
          <output className="store-container block py-12">
            Loading products…
          </output>
        }
      >
        <ShopResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
