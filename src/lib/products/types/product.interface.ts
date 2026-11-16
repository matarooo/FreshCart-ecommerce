import type { ListResponse } from "../../api";
import type { Brand } from "../../brands/types/brand.interface";
import type { Category } from "../../categories/types/category.interface";
import type { Subcategory } from "../../subcategories/types/subcategory.interface";

export interface Product {
  sold: number;
  images: string[];
  subcategory: Pick<Subcategory, "_id" | "name" | "slug" | "category">[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Pick<Category, "_id" | "name" | "slug" | "image">;
  brand: Pick<Brand, "_id" | "name" | "slug" | "image">;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: unknown[];
}

export type ProductListResponse = ListResponse<Product>;

/** The fields product cards and the cart/wishlist need, small enough to send to the client and keep in localStorage. */
export type ProductSummary = Pick<
  Product,
  | "id"
  | "title"
  | "imageCover"
  | "price"
  | "priceAfterDiscount"
  | "quantity"
  | "ratingsAverage"
  | "ratingsQuantity"
> & { category: Pick<Category, "name"> };
