import type { Cart } from "./types/cart.interface";

export function cartReview(cart: Cart) {
  const items = cart.items
    .map(({ productId, quantity, unitPrice }) => [
      productId,
      quantity,
      unitPrice,
    ])
    .sort(([first], [second]) => String(first).localeCompare(String(second)));
  return JSON.stringify([cart.id, cart.discountedTotal ?? cart.total, items]);
}
