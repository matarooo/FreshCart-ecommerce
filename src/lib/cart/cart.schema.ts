import { z } from "zod";

const productId = z.string().regex(/^[0-9a-f]{24}$/i);
const quantity = z.int().positive();

export const cartChangeSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("add"), productId, quantity }),
  z.object({ type: z.literal("quantity"), productId, quantity }),
  z.object({ type: z.literal("remove"), productId }),
  z.object({
    type: z.literal("coupon"),
    couponName: z.string().trim().min(1).max(80),
  }),
  z.object({ type: z.literal("clear") }),
]);

const cartProduct = z.object({
  _id: productId,
  title: z.string().nullish(),
  imageCover: z.string().nullish(),
  quantity: z.int().nonnegative().nullish(),
  category: z.union([z.object({ name: z.string() }), z.string()]).nullish(),
});

export const cartResponseSchema = z.object({
  cartId: productId.nullish(),
  data: z.object({
    _id: productId.nullish(),
    products: z.array(
      z.object({
        product: z.union([cartProduct, productId]),
        count: quantity,
        price: z.number().nonnegative(),
      }),
    ),
    totalCartPrice: z.number().nonnegative(),
    totalPriceAfterDiscount: z.number().nonnegative().nullish(),
  }),
});
