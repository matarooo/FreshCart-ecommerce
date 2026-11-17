import type { ProductSummary } from "@/lib/products/types/product.interface";

export interface WishlistCartButtonProps {
  product: ProductSummary;
  inCart: boolean;
}
