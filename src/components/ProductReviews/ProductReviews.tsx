import Link from "next/link";
import { DeleteReviewForm } from "@/components/DeleteReviewForm/DeleteReviewForm";
import { ProductRating } from "@/components/ProductRating/ProductRating";
import { ReviewForm } from "@/components/ReviewForm/ReviewForm";
import { verifyCommerceAccount } from "@/lib/auth/account.api";
import { loginHref } from "@/lib/auth/account-resource.client";
import { getCommerceSession } from "@/lib/auth/commerce-session";
import { getProductReviews } from "@/lib/reviews/review.api";
import type { ProductReviewsProps } from "./@type";

const reviewDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "Africa/Cairo",
});

async function getReviewAccount() {
  const session = await getCommerceSession();
  if (!session) return null;
  const { id } = await verifyCommerceAccount(session.token);
  return { id, email: session.email };
}

export async function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, account] = await Promise.all([
    getProductReviews(productId).catch(() => null),
    getReviewAccount().catch(() => null),
  ]);

  if (!reviews) {
    return (
      <>
        <h2 className="font-semibold text-slate-900">Customer Reviews</h2>
        <p role="alert" className="mt-3 text-sm text-muted">
          Reviews are temporarily unavailable. Refresh to try again.
        </p>
      </>
    );
  }
  const ownsReview =
    account && reviews.some((review) => review.author?.id === account.id);
  const average = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0;

  return (
    <section id="reviews" className="scroll-mt-28">
      <h2 className="font-semibold text-slate-900">Customer Reviews</h2>
      {reviews.length > 0 ? (
        <>
          <ProductRating
            rating={Number(average.toFixed(1))}
            reviews={reviews.length}
          />
          <ul className="mt-5 space-y-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {review.author?.name || "Customer"}
                  </p>
                  {review.createdAt && (
                    <time
                      dateTime={review.createdAt}
                      className="text-xs text-muted"
                    >
                      {reviewDate.format(new Date(review.createdAt))}
                    </time>
                  )}
                </div>
                <ProductRating rating={review.rating} />
                {review.text && (
                  <p className="mt-2 text-sm leading-6 whitespace-pre-wrap wrap-break-word">
                    {review.text}
                  </p>
                )}
                {account && review.author?.id === account.id && (
                  <details className="mt-3 border-t border-gray-100 pt-3">
                    <summary className="cursor-pointer text-sm font-medium text-brand hover:underline">
                      Manage Review
                    </summary>
                    <div className="mt-4">
                      <ReviewForm
                        email={account.email}
                        productId={productId}
                        review={{
                          id: review.id,
                          text: review.text,
                          rating: review.rating,
                        }}
                      />
                      <DeleteReviewForm
                        email={account.email}
                        productId={productId}
                        reviewId={review.id}
                      />
                    </div>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted">No reviews yet.</p>
      )}
      {account && !ownsReview && (
        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <ReviewForm email={account.email} productId={productId} />
        </div>
      )}
      {!account && (
        <Link
          href={loginHref(`/products/${productId}#reviews`)}
          className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
        >
          Sign in to write a review
        </Link>
      )}
    </section>
  );
}
