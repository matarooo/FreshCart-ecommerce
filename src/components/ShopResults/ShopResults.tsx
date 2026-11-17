import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getBrands } from "@/lib/brands/brand.api";
import { discountPercent, slugify } from "@/lib/catalog";
import { getCategories } from "@/lib/categories/category.api";
import { getProducts } from "@/lib/products/product.api";
import type { ShopResultsProps } from "./@type";
export async function ShopResults({ searchParams }: ShopResultsProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const brand = typeof params.brand === "string" ? params.brand : "";
  const category = typeof params.category === "string" ? params.category : "";
  const subcategory =
    typeof params.subcategory === "string" ? params.subcategory : "";
  const deals = params.deals === "true";
  const newest = params.sort === "newest";
  const [products, brands, categories] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategories(),
  ]);
  const brandMatch = brand
    ? brands.find((item) => slugify(item.name) === brand)
    : undefined;
  const categoryMatch = category
    ? categories.find((item) => slugify(item.name) === category)
    : undefined;
  const filtered = products.filter(
    (product) =>
      (!query ||
        `${product.title} ${product.brand.name} ${product.category.name}`
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (!brand || product.brand._id === brandMatch?._id) &&
      (!category || product.category._id === categoryMatch?._id) &&
      (!subcategory ||
        product.subcategory.some((item) => item._id === subcategory)) &&
      (!deals || discountPercent(product) > 0),
  );
  if (newest) {
    filtered.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }
  const activeFilters = [
    query && `Search: “${query}”`,
    brand && (brandMatch?.name ?? brand),
    category && (categoryMatch?.name ?? category),
    subcategory &&
      (filtered[0]?.subcategory.find((item) => item._id === subcategory)
        ?.name ??
        "Subcategory"),
    deals && "On sale",
  ].filter(Boolean);
  return (
    <div className="store-container py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Showing {filtered.length} products</p>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <span
                key={String(filter)}
                className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700"
              >
                {filter}
              </span>
            ))}
            <Link href="/shop" className="text-xs text-muted hover:text-brand">
              Clear filters
            </Link>
          </div>
        )}
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
