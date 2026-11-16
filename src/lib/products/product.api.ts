import { cacheLife } from "next/cache";
import { fetchAll } from "../api";
import type { Product } from "./types/product.interface";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  return fetchAll<Product>("/products");
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return (await getProducts()).find((product) => product.id === id);
}
