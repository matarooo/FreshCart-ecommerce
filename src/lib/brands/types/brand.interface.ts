import type { ListResponse } from "../../api";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type BrandListResponse = ListResponse<Brand>;
