import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { fetchAll } from "@/lib/api";
import { commerceRequest } from "@/lib/api/commerce-request";
import { commerceId } from "@/lib/auth/account.api";
import type { ProductReview, ReviewInput } from "./types/review.interface";

const productReview = z.object({
  _id: commerceId,
  review: z.string().optional().catch(undefined),
  rating: z.number().min(1).max(5),
  user: z
    .object({ _id: commerceId, name: z.string().optional() })
    .optional()
    .catch(undefined),
  createdAt: z.iso.datetime({ offset: true }).optional().catch(undefined),
});

export const reviewsTag = (productId: string) => `reviews:${productId}`;

export async function getProductReviews(
  productId: string,
): Promise<ProductReview[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(reviewsTag(productId));
  const data = await fetchAll<unknown>(
    `/products/${encodeURIComponent(productId)}/reviews`,
  );
  return data.flatMap((value) => {
    const result = productReview.safeParse(value);
    if (!result.success) return [];
    const { _id, review, rating, user, createdAt } = result.data;
    return [
      {
        id: _id,
        text: review ?? "",
        rating,
        author: user && { id: user._id, name: user.name },
        createdAt,
      },
    ];
  });
}

export async function createReview(
  token: string,
  productId: string,
  data: ReviewInput,
) {
  await commerceRequest(
    `v1/products/${productId}/reviews`,
    token,
    "POST",
    data,
  );
}

export async function updateReview(
  token: string,
  reviewId: string,
  data: ReviewInput,
) {
  await commerceRequest(`v1/reviews/${reviewId}`, token, "PUT", data);
}

export async function deleteReview(token: string, reviewId: string) {
  await commerceRequest(`v1/reviews/${reviewId}`, token, "DELETE");
}
