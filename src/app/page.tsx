import { CategoryGrid } from "@/components/CategoryGrid/CategoryGrid";
import { HomeHero } from "@/components/HomeHero/HomeHero";
import { HomePromotions } from "@/components/HomePromotions/HomePromotions";
import { Newsletter } from "@/components/Newsletter/Newsletter";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { ServiceBenefits } from "@/components/ServiceBenefits/ServiceBenefits";
import { getProducts } from "@/lib/products/product.api";

export default async function Home() {
  const products = await getProducts();
  return (
    <main id="main-content" className="flex-1">
      <HomeHero />
      <div className="bg-gray-50 py-5">
        <div className="store-container">
          <ServiceBenefits />
        </div>
      </div>
      <div className="store-container space-y-12 py-10 sm:space-y-16 sm:py-14">
        <section>
          <SectionHeading
            first="Shop By"
            accent="Category"
            href="/categories"
            linkLabel="View All Categories"
          />
          <CategoryGrid />
        </section>
        <HomePromotions />
        <section>
          <SectionHeading first="Featured" accent="Products" />
          <ProductGrid products={products} />
        </section>
        <Newsletter />
      </div>
    </main>
  );
}
