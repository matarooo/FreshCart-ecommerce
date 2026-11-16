import type { ProductSummary } from "@/lib/products/types/product.interface";

export interface WishlistCartButtonProps {
  product: Pick<ProductSummary, "id" | "title" | "quantity">;
  inCart: boolean;
}
