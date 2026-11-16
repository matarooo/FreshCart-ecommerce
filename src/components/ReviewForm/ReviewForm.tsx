"use client";

import { useActionState, useId } from "react";
import { saveProductReview } from "@/app/products/[id]/review-actions";
import type { ReviewFormProps } from "./@type";

export function ReviewForm({ email, productId, review }: ReviewFormProps) {
  const textId = useId();
  const [result, action, pending] = useActionState(
    saveProductReview.bind(null, email, productId, review?.id ?? null),
    null,
  );
  return (
    <form action={action} aria-busy={pending}>
      <fieldset className="space-y-4" disabled={pending}>
        <legend className="mb-3 font-semibold text-slate-900">
          {review ? "Edit your review" : "Write a review"}
        </legend>
        <label className="block text-sm">
          Rating
          <select
            name="rating"
            required
            defaultValue={result?.draft?.rating || review?.rating || ""}
            className="mt-1 block h-11 rounded-lg border border-gray-200 bg-white px-3"
          >
            <option value="" disabled>
              Select a rating
            </option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} {rating === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </label>
        <div>
          <label htmlFor={textId} className="block text-sm">
            Your review
          </label>
          <textarea
            id={textId}
            name="review"
            defaultValue={result?.draft?.review ?? review?.text}
            rows={3}
            maxLength={1000}
            required
            className="mt-1 block w-full rounded-lg border border-gray-200 bg-white p-3"
          />
        </div>
        {result && (
          <p
            role={result.ok ? "status" : "alert"}
            className={`text-sm ${result.ok ? "text-green-800" : "text-red-700"}`}
          >
            {result.message}
          </p>
        )}
        <button type="submit" className="store-button">
          {pending ? "Saving…" : review ? "Save Review" : "Post Review"}
        </button>
      </fieldset>
    </form>
  );
}
