import type { AccountResourceState } from "@/lib/auth/types/account-resource.interface";

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
  id?: string;
  items: CartItem[];
  total: number;
  discountedTotal?: number;
}

export type CartChange =
  | { type: "add" | "quantity"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "coupon"; couponName: string }
  | { type: "clear" };

export type CartState = AccountResourceState<Cart>;
