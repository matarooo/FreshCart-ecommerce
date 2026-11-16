import type { ProductRatingProps } from "./@type";
export function ProductRating({ rating, reviews }: ProductRatingProps) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-1">
      <span
        aria-hidden="true"
        className="text-sm tracking-tight text-amber-400"
      >
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(5 - Math.round(rating))}
      </span>
      <span className="sr-only">
        {rating} out of 5 stars, {reviews} reviews
      </span>
      <span aria-hidden="true" className="text-[10px] text-muted">
        {rating} ({reviews})
      </span>
    </div>
  );
}
