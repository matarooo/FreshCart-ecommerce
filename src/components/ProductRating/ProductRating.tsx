import type { ProductRatingProps } from "./@type";
export function ProductRating({ rating, reviews }: ProductRatingProps) {
  const stars = Math.min(5, Math.max(0, Math.floor(rating)));
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span aria-hidden="true" className="text-xl leading-5 text-amber-400">
        {"★".repeat(stars)}
        {"☆".repeat(5 - stars)}
      </span>
      <span className="sr-only">
        {rating} out of 5 stars
        {reviews === undefined ? "" : `, ${reviews} reviews`}
      </span>
      <span aria-hidden="true" className="text-xs text-muted">
        {rating}
        {reviews === undefined ? "" : ` (${reviews})`}
      </span>
    </div>
  );
}
