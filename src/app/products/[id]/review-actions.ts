"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { CommerceApiError } from "@/lib/api/commerce-request";
import { commerceId } from "@/lib/auth/account.api";
import { getCommerceToken } from "@/lib/auth/commerce-session";
import {
  createReview,
  deleteReview,
  reviewsTag,
  updateReview,
} from "@/lib/reviews/review.api";
import type { ReviewActionResult } from "@/lib/reviews/types/review.interface";

const reviewInput = z.object({
  review: z
    .string()
    .trim()
    .min(1, "Enter your review.")
    .max(1000, "Use up to 1,000 characters."),
  rating: z.coerce.number().int().min(1).max(5),
});

function reviewError(error: unknown): string {
  if (error instanceof CommerceApiError) {
    if (error.status === 401) return "Sign in again to manage your review.";
    if (error.status === 403)
      return "Your account cannot make this review change.";
    if (error.status === 409) return "You already reviewed this product.";
  }
  return "Your review could not be saved. Try again.";
}

export async function saveProductReview(
  email: string,
  product: string,
  review: string | null,
  _previous: ReviewActionResult | null,
  form: FormData,
): Promise<ReviewActionResult> {
  const fields = Object.fromEntries(form);
  const draft = {
    review:
      typeof fields.review === "string" ? fields.review.slice(0, 1000) : "",
    rating: Number(fields.rating) || 0,
  };
  const data = reviewInput.safeParse(fields);
  if (!data.success)
    return {
      ok: false,
      message: "Choose a rating and enter a review of up to 1,000 characters.",
      draft,
    };
  const productId = commerceId.safeParse(product);
  const reviewId = commerceId.nullable().safeParse(review);
  if (!productId.success || !reviewId.success)
    return { ok: false, message: "This review is unavailable.", draft };
  const token = await getCommerceToken(email);
  if (!token)
    return { ok: false, message: "Sign in again to save your review.", draft };
  try {
    if (reviewId.data) await updateReview(token, reviewId.data, data.data);
    else await createReview(token, productId.data, data.data);
  } catch (error) {
    return { ok: false, message: reviewError(error), draft };
  }
  updateTag(reviewsTag(productId.data));
  return { ok: true, message: "Review saved." };
}

export async function removeProductReview(
  email: string,
  product: string,
  review: string,
  _previous: ReviewActionResult | null,
  _form: FormData,
): Promise<ReviewActionResult> {
  const productId = commerceId.safeParse(product);
  const reviewId = commerceId.safeParse(review);
  if (!productId.success || !reviewId.success)
    return { ok: false, message: "This review is unavailable." };
  const token = await getCommerceToken(email);
  if (!token)
    return { ok: false, message: "Sign in again to remove your review." };
  try {
    await deleteReview(token, reviewId.data);
  } catch {
    return {
      ok: false,
      message: "Your review could not be removed. Try again.",
    };
  }
  updateTag(reviewsTag(productId.data));
  return { ok: true, message: "Review removed." };
}
