import { z } from "zod";

export const shoppingProductId = z.string().regex(/^[a-f0-9]{24}$/i);
export const shoppingQuantity = z.int().positive();
const amount = z.number().nonnegative();
const image = z
  .string()
  .regex(/^(?:\/images\/|https:\/\/ecommerce\.routemisr\.com\/)/i);
const cartItem = z.object({
  productId: shoppingProductId,
  title: z.string(),
  imageCover: image.optional().catch(undefined),
  category: z.string().optional(),
  stock: z.int().nonnegative().optional(),
  quantity: shoppingQuantity,
  unitPrice: amount,
});

const wishlistProduct = z.object({
  id: shoppingProductId,
  title: z.string(),
  imageCover: image,
  price: amount,
  priceAfterDiscount: amount.optional().catch(undefined),
  quantity: z.int().nonnegative(),
  ratingsAverage: z.number().min(0).max(5),
  ratingsQuantity: z.int().nonnegative(),
  category: z.object({ name: z.string() }),
});

export const guestShoppingSchema = z.object({
  cart: z.array(cartItem),
  wishlist: z.array(wishlistProduct),
  transfers: z.array(
    z.object({
      email: z.email(),
      cart: z.array(
        z.object({
          item: cartItem,
          targetQuantity: shoppingQuantity.optional(),
          issue: z.string().optional(),
        }),
      ),
      wishlist: z.array(wishlistProduct),
    }),
  ),
});

export const cartMergeSchema = z.object({
  type: z.literal("merge"),
  productId: shoppingProductId,
  targetQuantity: shoppingQuantity,
});
