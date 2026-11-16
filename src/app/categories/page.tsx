import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid/CategoryGrid";
import { PageBanner } from "@/components/PageBanner/PageBanner";
export const metadata: Metadata = { title: "Shop by Category | FreshCart" };
export default function CategoriesPage() {
  return (
    <main id="main-content" className="flex-1 bg-gray-50/60">
      <PageBanner
        title="Shop By Category"
        subtitle="Find something for every part of your day"
        icon="grid"
      />
      <div className="store-container py-10">
        <CategoryGrid showCounts />
      </div>
    </main>
  );
}
