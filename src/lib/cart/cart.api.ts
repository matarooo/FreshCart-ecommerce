import "server-only";

import { getProduct } from "@/lib/products/product.api";
import { cartResponseSchema } from "./cart.schema";
import type { Cart, CartChange } from "./types/cart.interface";

export class CartApiError extends Error {
  constructor(public readonly status: number) {
    super(`Cart API returned ${status}.`);
  }
}

export class CartStockError extends Error {
  constructor(available: number) {
    super(
      available > 0
        ? `Only ${available} available. Your account cart and guest cart exceed the current stock.`
        : "This product is no longer available.",
    );
  }
}

async function requestCart(
  token: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  productId?: string,
  data?: { productId: string } | { count: number } | { couponName: string },
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("Missing cart API base URL.");

  const path = productId ? `/cart/${encodeURIComponent(productId)}` : "/cart";
  const response = await fetch(`${baseUrl}/api/v2${path}`, {
    method,
    cache: "no-store",
    headers: data ? { token, "Content-Type": "application/json" } : { token },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) throw new CartApiError(response.status);
  return response;
}

async function readCart(response: Response): Promise<Cart> {
  const { cartId, data } = cartResponseSchema.parse(await response.json());
  const items = await Promise.all(
    data.products.map(async ({ product, count, price }) => {
      const productId = typeof product === "string" ? product : product._id;
      const details = typeof product === "string" ? undefined : product;
      const category =
        typeof details?.category === "object"
          ? details.category?.name
          : undefined;
      // Populated cart products may omit fields used by the storefront.
      const catalogProduct =
        details?.title &&
        details.imageCover &&
        details.quantity != null &&
        category
          ? undefined
          : await getProduct(productId).catch(() => undefined);

      return {
        productId,
        title: details?.title || catalogProduct?.title || "Unavailable product",
        imageCover: details?.imageCover || catalogProduct?.imageCover,
        category: category ?? catalogProduct?.category.name,
        stock: details?.quantity ?? catalogProduct?.quantity,
        quantity: count,
        unitPrice: price,
      };
    }),
  );
  return {
    id: cartId ?? data._id ?? undefined,
    items,
    total: data.totalCartPrice,
    discountedTotal: data.totalPriceAfterDiscount ?? undefined,
  };
}

export async function getCart(token: string): Promise<Cart> {
  try {
    return await readCart(await requestCart(token, "GET"));
  } catch (error) {
    if (error instanceof CartApiError && error.status === 404)
      return { items: [], total: 0 };
    throw error;
  }
}

async function addProduct(token: string, productId: string, quantity: number) {
  const cart = await readCart(
    await requestCart(token, "POST", undefined, { productId }),
  );
  if (quantity === 1) return cart;

  const item = cart.items.find((entry) => entry.productId === productId);
  if (!item)
    throw new Error("Added product is missing from the cart response.");
  // The API adds one unit per POST, then accepts an absolute count via PUT.
  const count = item.quantity + quantity - 1;
  return readCart(await requestCart(token, "PUT", productId, { count }));
}

export async function mergeCartItem(
  token: string,
  productId: string,
  targetQuantity: number,
): Promise<Cart> {
  const cart = await getCart(token);
  const current = cart.items.find((item) => item.productId === productId);
  if (current && current.quantity >= targetQuantity) return cart;

  const product = await getProduct(productId);
  if (!product || targetQuantity > product.quantity)
    throw new CartStockError(product?.quantity ?? 0);

  if (!current) {
    const added = await addProduct(token, productId, 1);
    if (
      (added.items.find((item) => item.productId === productId)?.quantity ??
        0) >= targetQuantity
    )
      return added;
  }
  return updateCart(token, {
    type: "quantity",
    productId,
    quantity: targetQuantity,
  });
}

export async function updateCart(
  token: string,
  change: CartChange,
): Promise<Cart> {
  switch (change.type) {
    case "add":
      return addProduct(token, change.productId, change.quantity);
    case "quantity":
      return readCart(
        await requestCart(token, "PUT", change.productId, {
          count: change.quantity,
        }),
      );
    case "remove":
      return readCart(await requestCart(token, "DELETE", change.productId));
    case "coupon":
      await requestCart(token, "PUT", "applyCoupon", {
        couponName: change.couponName,
      });
      return getCart(token);
    case "clear":
      await requestCart(token, "DELETE");
      return { items: [], total: 0 };
  }
}
