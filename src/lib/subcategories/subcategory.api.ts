import { cacheLife } from "next/cache";
import { fetchAll, fetchOne } from "../api";
import type { Subcategory } from "./types/subcategory.interface";

export async function getSubcategories(): Promise<Subcategory[]> {
  "use cache";
  cacheLife("hours");
  return fetchAll<Subcategory>("/subcategories");
}

export async function getSubcategory(
  id: string,
): Promise<Subcategory | undefined> {
  "use cache";
  cacheLife("hours");
  return fetchOne<Subcategory>(`/subcategories/${encodeURIComponent(id)}`);
}
