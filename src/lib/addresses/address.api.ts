import "server-only";

import { z } from "zod";
import { commerceRequest } from "@/lib/api/commerce-request";
import { savedAddressSchema } from "./address.schema";
import type { AddressInput, SavedAddress } from "./types/address.interface";

const addressesResponse = z.object({ data: z.array(savedAddressSchema) });

export async function getAddresses(token: string): Promise<SavedAddress[]> {
  const response = await commerceRequest("v1/addresses", token);
  return addressesResponse
    .parse(await response.json())
    .data.map(({ _id, ...address }) => ({
      ...address,
      id: _id,
    }));
}

export async function addAddress(token: string, address: AddressInput) {
  await commerceRequest("v1/addresses", token, "POST", address);
}

export async function removeAddress(token: string, id: string) {
  await commerceRequest(
    `v1/addresses/${encodeURIComponent(id)}`,
    token,
    "DELETE",
  );
}
