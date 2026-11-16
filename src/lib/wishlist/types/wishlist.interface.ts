import type { AccountResourceState } from "@/lib/auth/types/account-resource.interface";
import type { ProductSummary } from "@/lib/products/types/product.interface";

export interface Wishlist {
  products: ProductSummary[];
}

export interface WishlistChange {
  productId: string;
  saved: boolean;
}

export type WishlistState = AccountResourceState<Wishlist>;
