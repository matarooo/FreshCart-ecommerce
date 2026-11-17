import type { SavedAddress } from "@/lib/addresses/types/address.interface";

export interface CheckoutCartProps {
  email: string;
  addresses: SavedAddress[];
}
