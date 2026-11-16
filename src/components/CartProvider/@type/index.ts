import type { CartChange, CartState } from "@/lib/cart/types/cart.interface";

export interface CartContextValue {
  state: CartState;
  cartCount: number;
  updating: boolean;
  isProductUpdating: (productId: string) => boolean;
  bindAccount: (email: string | null) => void;
  refresh: () => Promise<void>;
  update: (change: CartChange) => Promise<boolean>;
  addToCart: (productId: string, quantity?: number) => Promise<boolean>;
}
