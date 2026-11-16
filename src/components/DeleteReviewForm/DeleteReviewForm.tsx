"use client";

import { useActionState } from "react";
import { removeProductReview } from "@/app/products/[id]/review-actions";
import type { DeleteReviewFormProps } from "./@type";

export function DeleteReviewForm({
  email,
  productId,
  reviewId,
}: DeleteReviewFormProps) {
  const [result, action, pending] = useActionState(
    removeProductReview.bind(null, email, productId, reviewId),
    null,
  );
  return (
    <form action={action} className="mt-4">
      {result && !result.ok && (
        <p role="alert" className="mb-2 text-sm text-red-700">
          {result.message}
        </p>
      )}
      <button
        type="submit"
        className="text-sm font-medium text-red-700 hover:underline disabled:text-slate-500"
        disabled={pending}
      >
        {pending ? "Deleting…" : "Delete Review"}
      </button>
    </form>
  );
}
