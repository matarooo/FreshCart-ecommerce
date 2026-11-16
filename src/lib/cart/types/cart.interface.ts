export interface CartItem {
  productId: string;
  title: string;
  imageCover?: string;
  category?: string;
  stock?: number;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export type CartChange =
  | { type: "add" | "quantity"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

export type CartState =
  | { status: "loading" | "sign-in" | "error" }
  | { status: "ready"; cart: Cart };
