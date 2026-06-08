import { config } from "@/lib/config";
import type { Product } from "@/lib/types";
import productsJson from "@/lib/mock/products.json";
import { apiGet } from "./client";

const mock = productsJson as unknown as Product[];

export async function getProducts(): Promise<Product[]> {
  if (config.useMock) return mock.filter((p) => p.active);
  return apiGet<Product[]>("/products");
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (config.useMock) return mock.find((p) => p.slug === slug) ?? null;
  return apiGet<Product | null>(`/products/${slug}`);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (config.useMock)
    return mock.filter((p) => p.active && p.category === category);
  return apiGet<Product[]>(`/products?category=${encodeURIComponent(category)}`);
}

export async function getProductsByTag(tag: string): Promise<Product[]> {
  if (config.useMock)
    return mock.filter((p) => p.active && p.tags.includes(tag));
  return apiGet<Product[]>(`/products?tag=${encodeURIComponent(tag)}`);
}
