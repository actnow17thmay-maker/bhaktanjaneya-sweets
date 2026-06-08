import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopControls } from "@/components/shop/ShopControls";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { sortProducts } from "@/lib/product";

export const metadata: Metadata = {
  title: "Shop All Sweets & Namkeen",
  description:
    "Browse the full range of Bhaktanjaneya Sweets — pure ghee sweets and crunchy namkeen, made fresh and delivered across India.",
};

const TAG_TITLES: Record<string, string> = {
  "best-seller": "Best Sellers",
  "top-pick": "Top Picks",
  new: "New Arrivals",
  combo: "Combos & Gifting",
};

function str(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const sp = await props.searchParams;
  const q = str(sp.q);
  const tag = str(sp.tag);
  const category = str(sp.category);
  const sort = str(sp.sort) || "featured";

  const [all, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  let items = all;
  if (category) items = items.filter((p) => p.category === category);
  if (tag) items = items.filter((p) => p.tags.includes(tag));
  if (q) {
    const s = q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        (p.categoryLabel ?? "").toLowerCase().includes(s),
    );
  }
  items = sortProducts(items, sort);

  const heading = tag && TAG_TITLES[tag] ? TAG_TITLES[tag] : "Shop All";
  const categoryName = categories.find((c) => c.slug === category)?.name;

  return (
    <div className="py-10">
      <Container>
        <header className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-saffron-600">
            {categoryName ?? "Our Collection"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-maroon-900 sm:text-4xl">
            {categoryName ? categoryName : heading}
          </h1>
          {q && (
            <p className="mt-2 text-ink-500">
              Showing results for &ldquo;{q}&rdquo;
            </p>
          )}
        </header>

        <ShopControls categories={categories} />

        {items.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-ink-500">
              {items.length} {items.length === 1 ? "product" : "products"}
            </p>
            <ProductGrid products={items} />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-cream-300 bg-white py-20 text-center">
            <p className="font-serif text-xl font-semibold text-maroon-900">
              No products found
            </p>
            <p className="mt-2 text-sm text-ink-500">
              Try a different search or clear your filters.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
