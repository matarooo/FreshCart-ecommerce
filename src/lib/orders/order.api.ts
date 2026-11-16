import "server-only";

import { z } from "zod";
import type { ShippingAddress } from "@/lib/addresses/types/address.interface";
import { commerceRequest } from "@/lib/api/commerce-request";
import type { OrderItem, OrderSummary } from "./types/order.interface";

const optionalText = z.string().trim().min(1).optional().catch(undefined);
const optionalAmount = z.number().nonnegative().optional().catch(undefined);
const orderImage = z
  .union([
    z.url({ hostname: /^ecommerce\.routemisr\.com$/, protocol: /^https$/ }),
    z.string().startsWith("/images/"),
  ])
  .optional()
  .catch(undefined);
const orderItemSchema = z.object({
  _id: optionalText,
  count: z.int().nonnegative(),
  price: optionalAmount,
  product: z
    .object({ title: optionalText, imageCover: orderImage })
    .optional()
    .catch(undefined),
});

const orderSchema = z.object({
  _id: z.string(),
  id: z.number().optional(),
  createdAt: z.iso.datetime({ offset: true }),
  totalOrderPrice: z.number().nonnegative(),
  shippingPrice: optionalAmount,
  taxPrice: optionalAmount,
  shippingAddress: z
    .object({ city: optionalText, details: optionalText, phone: optionalText })
    .optional()
    .catch(undefined),
  paymentMethodType: z.enum(["cash", "card"]),
  isPaid: z.boolean(),
  isDelivered: z.boolean(),
  cartItems: z.array(orderItemSchema),
});
const accountSchema = z.object({
  decoded: z.object({ id: z.string().regex(/^[a-f0-9]{24}$/i) }),
});
const checkoutResponse = z.object({
  session: z.object({ url: z.url() }),
});

export async function getOrders(token: string): Promise<OrderSummary[]> {
  const verified = await commerceRequest("v1/auth/verifyToken", token);
  const { decoded } = accountSchema.parse(await verified.json());
  const response = await commerceRequest(`v1/orders/user/${decoded.id}`, token);
  const orders = z.array(orderSchema).parse(await response.json());
  return orders
    .map(toOrderSummary)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

function toOrderSummary(order: z.infer<typeof orderSchema>): OrderSummary {
  const items: OrderItem[] = order.cartItems.map((item, index) => ({
    id: item._id ?? `${order._id}:${index}`,
    title: item.product?.title,
    imageCover: item.product?.imageCover,
    quantity: item.count,
    unitPrice: item.price,
  }));
  return {
    id: order._id,
    number: order.id,
    createdAt: order.createdAt,
    total: order.totalOrderPrice,
    subtotal: orderSubtotal(order, items),
    shipping: order.shippingPrice,
    tax: order.taxPrice,
    shippingAddress: order.shippingAddress,
    items,
    quantity: items.reduce((total, item) => total + item.quantity, 0),
    paymentMethod: order.paymentMethodType,
    paid: order.isPaid,
    delivered: order.isDelivered,
  };
}

function orderSubtotal(order: z.infer<typeof orderSchema>, items: OrderItem[]) {
  if (order.shippingPrice !== undefined && order.taxPrice !== undefined) {
    const subtotal =
      order.totalOrderPrice - order.shippingPrice - order.taxPrice;
    return subtotal >= 0 ? subtotal : undefined;
  }
  if (items.length && items.every((item) => item.unitPrice !== undefined)) {
    return items.reduce(
      (total, { unitPrice = 0, quantity }) => total + unitPrice * quantity,
      0,
    );
  }
}

export async function createCashOrder(
  token: string,
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  await commerceRequest(
    `v2/orders/${encodeURIComponent(cartId)}`,
    token,
    "POST",
    {
      shippingAddress,
    },
  );
}

export async function createCheckoutSession(
  token: string,
  cartId: string,
  shippingAddress: ShippingAddress,
  origin: string,
) {
  const query = new URLSearchParams({ url: origin });
  const response = await commerceRequest(
    `v1/orders/checkout-session/${encodeURIComponent(cartId)}?${query}`,
    token,
    "POST",
    { shippingAddress },
  );
  const { session } = checkoutResponse.parse(await response.json());
  const url = new URL(session.url);
  if (
    url.origin !== "https://checkout.stripe.com" ||
    url.username ||
    url.password
  )
    throw new Error("The checkout session returned an unexpected payment URL.");
  return url.href;
}
