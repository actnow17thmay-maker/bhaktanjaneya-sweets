import { config } from "@/lib/config";
import type { Category } from "@/lib/types";
import categoriesJson from "@/lib/mock/categories.json";
import { apiGet } from "./client";

const mock = categoriesJson as unknown as Category[];

export async function getCategories(): Promise<Category[]> {
  if (config.useMock) return [...mock].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  return apiGet<Category[]>("/categories");
}

export async function getCategory(slug: string): Promise<Category | null> {
  if (config.useMock) return mock.find((c) => c.slug === slug) ?? null;
  return apiGet<Category | null>(`/categories/${slug}`);
}
