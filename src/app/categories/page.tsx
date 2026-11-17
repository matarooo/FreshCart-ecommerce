import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid/CategoryGrid";
import { PageBanner } from "@/components/PageBanner/PageBanner";
export const metadata: Metadata = { title: "Shop by Category | FreshCart" };
export default function CategoriesPage() {
  return (
    <main id="main-content" className="flex-1 bg-gray-50">
      <PageBanner
        title="All Categories"
        breadcrumb="Categories"
        subtitle="Browse our wide range of product categories"
        icon="grid"
        spacious
      />
      <div className="store-container py-10">
        <CategoryGrid catalog />
      </div>
    </main>
  );
}
