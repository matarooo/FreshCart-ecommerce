import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGallery } from "@/components/ProductGallery/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { ProductPurchase } from "@/components/ProductPurchase/ProductPurchase";
import { ProductReviews } from "@/components/ProductReviews/ProductReviews";
import { ProductTabs } from "@/components/ProductTabs/ProductTabs";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { shopHref } from "@/lib/catalog";
import { getProduct, getProducts } from "@/lib/products/product.api";

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ id: product.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const product = await getProduct((await params).id);
  return {
    title: product
      ? `${product.title} | FreshCart`
      : "Product not found | FreshCart",
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProduct((await params).id);
  if (!product) notFound();
  const related = (await getProducts())
    .filter(
      (item) =>
        item.category._id === product.category._id && item.id !== product.id,
    )
    .slice(0, 5);
  return (
    <main id="main-content" className="store-container flex-1 pb-14">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap gap-2 py-6 text-xs text-muted"
      >
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>&gt;</span>
        <Link
          href={shopHref("category", product.category.name)}
          className="hover:text-brand"
        >
          {product.category.name}
        </Link>
        <span>›</span>
        <span className="max-w-72 truncate text-slate-700" aria-current="page">
          {product.title}
        </span>
      </nav>
      <div className="grid items-start gap-6 md:grid-cols-[0.85fr_2fr]">
        <ProductGallery
          name={product.title}
          images={product.images.length ? product.images : [product.imageCover]}
        />
        <ProductPurchase product={product} />
      </div>
      <div className="mt-10">
        <ProductTabs
          product={product}
          reviews={
            <Suspense
              fallback={
                <output className="text-sm text-muted">Loading reviews…</output>
              }
            >
              <ProductReviews productId={product.id} />
            </Suspense>
          }
        />
      </div>
      <section className="mt-14">
        <SectionHeading
          first="You May Also"
          accent="Like"
          href="/shop"
          linkLabel="View All Products"
        />
        <ProductGrid products={related} />
      </section>
    </main>
  );
}
