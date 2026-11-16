import type { SavedAddress } from "@/lib/addresses/types/address.interface";
import type { Cart } from "@/lib/cart/types/cart.interface";

export interface CheckoutFormProps {
  email: string;
  review: string;
  addresses: SavedAddress[];
  cart: Cart;
}
