import type { z } from "zod";
import type { guestShoppingSchema } from "../guest-shopping.schema";

export type GuestShopping = z.infer<typeof guestShoppingSchema>;
export type GuestTransfer = GuestShopping["transfers"][number];

export interface GuestTransferStatus {
  syncing: boolean;
  error?: string;
}
