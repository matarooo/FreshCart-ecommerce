export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface AddressInput extends ShippingAddress {
  name: string;
}

export interface SavedAddress extends AddressInput {
  id: string;
}
