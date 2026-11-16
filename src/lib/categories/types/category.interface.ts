import type { ListResponse } from "../../api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type CategoryListResponse = ListResponse<Category>;
