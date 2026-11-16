import type { ProductSummary } from "@/lib/products/types/product.interface";
import type { WishlistState } from "@/lib/wishlist/types/wishlist.interface";

export interface WishlistContextValue {
  state: WishlistState;
  products: ProductSummary[];
  isSaved: (productId: string) => boolean;
  isProductUpdating: (productId: string) => boolean;
  bindAccount: (email: string | null) => void;
  refresh: () => Promise<void>;
  toggle: (productId: string) => Promise<boolean>;
}
