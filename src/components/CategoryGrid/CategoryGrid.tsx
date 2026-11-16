import Image from "next/image";
import Link from "next/link";
import { shopHref } from "@/lib/catalog";
import { getCategories } from "@/lib/categories/category.api";
import { getProducts } from "@/lib/products/product.api";
import type { CategoryGridProps } from "./@type";
export async function CategoryGrid({ showCounts }: CategoryGridProps) {
  const [categories, products] = await Promise.all([
    getCategories(),
    showCounts ? getProducts() : [],
  ]);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={shopHref("category", category.name)}
          className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-5 transition-colors hover:border-green-300 hover:bg-green-50"
        >
          <Image
            src={category.image}
            alt=""
            width={84}
            height={84}
            className="mb-3 size-16 rounded-full object-cover transition-transform group-hover:scale-105"
          />
          <h3 className="text-center text-xs font-medium sm:text-sm">
            {category.name}
          </h3>
          {showCounts && (
            <p className="mt-2 text-xs text-muted">
              {
                products.filter(
                  (product) => product.category._id === category._id,
                ).length
              }{" "}
              products
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
