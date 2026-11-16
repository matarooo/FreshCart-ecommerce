import Link from "next/link";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { toSummary } from "@/lib/catalog";
import type { ProductGridProps } from "./@type";
export function ProductGrid({ products }: ProductGridProps) {
  return products.length ? (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={toSummary(product)} />
      ))}
    </div>
  ) : (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-20 text-center">
      <h2 className="text-xl font-semibold">No products found</h2>
      <p className="mt-2 text-muted">
        Try another search or browse our full collection.
      </p>
      <Link
        href="/shop"
        className="mt-5 inline-block text-brand hover:underline"
      >
        View all products →
      </Link>
    </div>
  );
}
