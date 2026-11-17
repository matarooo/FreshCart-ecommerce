import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import { shopHref } from "@/lib/catalog";
import {
  getCategories,
  getCategorySubcategories,
} from "@/lib/categories/category.api";

type CategoryPageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return (await getCategories()).map(({ _id }) => ({ id: _id }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = (await getCategories()).find((item) => item._id === id);
  return { title: `${category?.name ?? "Category not found"} | FreshCart` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = (await getCategories()).find((item) => item._id === id);
  if (!category) notFound();
  const subcategories = await getCategorySubcategories(id)
    .then((items) => items.filter((item) => item.category === id))
    .catch(() => null);
  const productsHref = shopHref("category", category.name);

  return (
    <main id="main-content" className="min-h-screen flex-1 bg-gray-50">
      <PageBanner
        title={category.name}
        parent={{ label: "Categories", href: "/categories" }}
        subtitle="Choose a subcategory to browse products"
        icon="grid"
        image={category.image}
        spacious
      />
      <div className="store-container py-10">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-brand"
        >
          <StoreIcon name="arrow" className="size-5 rotate-180" />
          Back to Categories
        </Link>
        {subcategories?.length ? (
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((subcategory) => (
              <li key={subcategory._id}>
                <Link
                  href={`${productsHref}&subcategory=${encodeURIComponent(subcategory._id)}`}
                  className="flex h-full flex-col items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-green-50 text-brand">
                    <StoreIcon name="grid" />
                  </span>
                  <span className="font-semibold text-gray-900">
                    {subcategory.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="pt-24 text-center">
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-gray-100 text-gray-400">
              <StoreIcon name="folder" className="size-8" />
            </span>
            <h2 className="mt-5 text-lg font-bold text-gray-900">
              {subcategories
                ? "No Subcategories Found"
                : "Subcategories are temporarily unavailable"}
            </h2>
            {subcategories && (
              <p className="mt-2 text-muted">
                This category doesn’t have any subcategories yet.
              </p>
            )}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link
            href={productsHref}
            className="store-button min-h-12 rounded-xl px-6 text-base"
          >
            View All Products in {category.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
