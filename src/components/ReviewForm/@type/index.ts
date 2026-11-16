import type { ProductReview } from "@/lib/reviews/types/review.interface";

export interface ReviewFormProps {
  email: string;
  productId: string;
  review?: Pick<ProductReview, "id" | "text" | "rating">;
}
