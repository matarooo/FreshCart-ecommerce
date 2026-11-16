import { z } from "zod";

const productId = z.string().regex(/^[0-9a-f]{24}$/i);

export const wishlistChangeSchema = z.object({
  productId,
  saved: z.boolean(),
});

export const wishlistResponseSchema = z.object({
  data: z.array(
    z.object({
      _id: productId,
      title: z.string(),
      imageCover: z.string(),
      price: z.number().nonnegative(),
      priceAfterDiscount: z.number().nonnegative().nullish(),
      quantity: z.int().nonnegative(),
      ratingsAverage: z.number(),
      ratingsQuantity: z.int().nonnegative(),
      category: z.object({ name: z.string() }),
    }),
  ),
});
