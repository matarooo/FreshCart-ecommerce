import type { ProductSummary } from "./products/types/product.interface";

type Priced = Pick<ProductSummary, "price" | "priceAfterDiscount">;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Shop filter link, e.g. `/shop?category=men-s-fashion`; ShopResults matches it with `slugify(name)`. */
export const shopHref = (filter: "category" | "brand", name: string) =>
  `/shop?${filter}=${slugify(name)}`;

const priceFormat = new Intl.NumberFormat("en-EG", {
  maximumFractionDigits: 2,
});
export const formatPrice = (value: number) =>
  `${priceFormat.format(value)} EGP`;

export const finalPrice = (product: Priced) =>
  product.priceAfterDiscount ?? product.price;

export const discountPercent = (product: Priced) =>
  Math.max(0, Math.round((1 - finalPrice(product) / product.price) * 100));

export const isInStock = (product: Pick<ProductSummary, "quantity">) =>
  product.quantity > 0;

export const toSummary = (product: ProductSummary): ProductSummary => ({
  id: product.id,
  title: product.title,
  imageCover: product.imageCover,
  price: product.price,
  priceAfterDiscount: product.priceAfterDiscount,
  quantity: product.quantity,
  ratingsAverage: product.ratingsAverage,
  ratingsQuantity: product.ratingsQuantity,
  category: { name: product.category.name },
});
