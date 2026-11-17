import type { CartChange, CartState } from "@/lib/cart/types/cart.interface";
import type { ProductSummary } from "@/lib/products/types/product.interface";

export interface CartContextValue {
  state: CartState;
  accountEmail?: string | null;
  cartCount: number;
  updating: boolean;
  isProductUpdating: (productId: string) => boolean;
  bindAccount: (email: string | null) => void;
  refresh: () => Promise<void>;
  update: (change: CartChange) => Promise<boolean>;
  addToCart: (product: ProductSummary, quantity?: number) => Promise<boolean>;
}
