"use client";
import { useEffect, useId, useState } from "react";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { ProductTabsProps } from "./@type";

const tabs = ["Product Details", "Reviews", "Shipping & Returns"];
const features = [
  "Premium quality product",
  "100% authentic guarantee",
  "Fast & secure packaging",
  "Quality tested",
];
export function ProductTabs({ product, reviews }: ProductTabsProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  useEffect(() => {
    function showLinkedReviews() {
      if (window.location.hash === "#reviews") setActive(1);
    }
    showLinkedReviews();
    window.addEventListener("hashchange", showLinkedReviews);
    return () => window.removeEventListener("hashchange", showLinkedReviews);
  }, []);
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div
        role="tablist"
        aria-label="Product information"
        className="flex overflow-x-auto border-b border-gray-200"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            id={`${id}-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = active;
              if (event.key === "ArrowRight") next = (active + 1) % tabs.length;
              else if (event.key === "ArrowLeft")
                next = (active + tabs.length - 1) % tabs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = tabs.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
            className={`shrink-0 border-b-2 px-5 py-4 text-sm font-medium ${active === index ? "border-brand bg-green-50/60 text-brand" : "border-transparent text-muted hover:text-brand"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="p-5 sm:p-6"
      >
        {active === 0 ? (
          <>
            <h2 className="font-semibold text-slate-900">About this Product</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">
              {product.description}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-sm font-semibold">
                  Product Information
                </h3>
                <dl className="space-y-3 text-xs">
                  {[
                    ["Category", product.category.name],
                    ["Brand", product.brand.name],
                    ["Availability", `${product.quantity} in stock`],
                    ["Product ID", product.id],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted">{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 text-sm font-semibold">Key Features</h3>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <StoreIcon name="check" className="size-4 text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : active === 1 ? (
          reviews
        ) : (
          <>
            <h2 className="font-semibold">Shipping & Returns</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Free shipping on orders over 550 EGP. Delivery costs and estimated
              arrival dates will be confirmed at checkout. Return eligible
              unused items in their original packaging within 30 days. Contact
              support@freshcart.com for assistance.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
