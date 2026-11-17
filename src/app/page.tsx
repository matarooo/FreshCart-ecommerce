import { CategoryGrid } from "@/components/CategoryGrid/CategoryGrid";
import { HomeHero } from "@/components/HomeHero/HomeHero";
import { HomePromotions } from "@/components/HomePromotions/HomePromotions";
import { Newsletter } from "@/components/Newsletter/Newsletter";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { ServiceBenefits } from "@/components/ServiceBenefits/ServiceBenefits";
import { getProducts } from "@/lib/products/product.api";

export default async function Home() {
  const products = await getProducts();
  return (
    <main id="main-content" className="flex-1 overflow-x-clip">
      <HomeHero />
      <div className="bg-gray-100/70 py-8">
        <div className="store-container sm:px-8">
          <ServiceBenefits />
        </div>
      </div>
      <section className="store-container py-10">
        <div className="py-8">
          <SectionHeading
            first="Shop By"
            accent="Category"
            href="/categories"
            linkLabel="View All Categories"
          />
        </div>
        <CategoryGrid />
      </section>
      <div className="store-container pt-10 sm:px-8">
        <HomePromotions />
        <section className="mt-20 lg:mt-28">
          <SectionHeading first="Featured" accent="Products" />
          <ProductGrid products={products} />
        </section>
      </div>
      <div className="bg-linear-to-b from-white to-gray-100/70 pt-20 pb-16 lg:pt-40">
        <div className="store-container sm:px-8">
          <ScrollReveal direction="up">
            <Newsletter />
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
