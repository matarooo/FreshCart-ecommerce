import { cacheLife } from "next/cache";
import { fetchAll, fetchOne } from "../api";
import type { Brand } from "./types/brand.interface";

export async function getBrands(): Promise<Brand[]> {
  "use cache";
  cacheLife("hours");
  return fetchAll<Brand>("/brands");
}

export async function getBrand(id: string): Promise<Brand | undefined> {
  "use cache";
  cacheLife("hours");
  return fetchOne<Brand>(`/brands/${encodeURIComponent(id)}`);
}
