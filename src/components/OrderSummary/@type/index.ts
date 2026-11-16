import type { ReactNode } from "react";
import type { Cart } from "@/lib/cart/types/cart.interface";

export interface OrderSummaryProps {
  cart: Cart;
  checkout?: boolean;
  children: ReactNode;
}
