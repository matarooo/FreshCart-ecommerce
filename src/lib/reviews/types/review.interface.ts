export interface ProductReview {
  id: string;
  text: string;
  rating: number;
  author?: { id: string; name?: string };
  createdAt?: string;
}

export interface ReviewInput {
  review: string;
  rating: number;
}

export interface ReviewActionResult {
  ok: boolean;
  message: string;
  draft?: ReviewInput;
}
