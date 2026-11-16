import type { ShippingAddress } from "@/lib/addresses/types/address.interface";

export interface OrderItem {
  id: string;
  title?: string;
  imageCover?: string;
  quantity: number;
  unitPrice?: number;
}

export interface OrderSummary {
  id: string;
  number?: number;
  createdAt: string;
  total: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  shippingAddress?: Partial<ShippingAddress>;
  items: OrderItem[];
  quantity: number;
  paymentMethod: "cash" | "card";
  paid: boolean;
  delivered: boolean;
}
