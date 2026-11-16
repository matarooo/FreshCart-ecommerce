import type { SavedAddress } from "@/lib/addresses/types/address.interface";

export interface CheckoutAddressFieldsProps {
  addresses: SavedAddress[];
  disabled: boolean;
}
