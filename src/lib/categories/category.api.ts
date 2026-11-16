import { cacheLife } from "next/cache";
import { fetchAll, fetchOne } from "../api";
import type { Subcategory } from "../subcategories/types/subcategory.interface";
import type { Category } from "./types/category.interface";

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return fetchAll<Category>("/categories");
}

export async function getCategory(id: string): Promise<Category | undefined> {
  "use cache";
  cacheLife("hours");
  return fetchOne<Category>(`/categories/${encodeURIComponent(id)}`);
}

export async function getCategorySubcategories(
  id: string,
): Promise<Subcategory[]> {
  "use cache";
  cacheLife("hours");
  // `/categories/:id/subcategories` ignores the id once paginated, so filter the list instead.
  return fetchAll<Subcategory>("/subcategories", { category: id });
}
