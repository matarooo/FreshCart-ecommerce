import type { SavedAddress } from "@/lib/addresses/types/address.interface";

export interface AddressBookProps {
  addresses: SavedAddress[];
  email: string;
}
