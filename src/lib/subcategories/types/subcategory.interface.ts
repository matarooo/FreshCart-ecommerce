import type { ListResponse } from "../../api";

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  /** Parent category id */
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type SubcategoryListResponse = ListResponse<Subcategory>;
