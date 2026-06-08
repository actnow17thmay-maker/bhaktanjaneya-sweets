import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoryCards({
  categories,
  counts,
}: {
  categories: Category[];
  counts: Record<string, number>;
}) {
  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          eyebrow="Shop by category"
          title="Find your favourite"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-cream-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-cream-100">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={72}
                    height={72}
                    className="h-16 w-16 object-contain"
                  />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xl font-semibold text-maroon-900">
                  {c.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-500">
                  {c.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-600">
                  Shop {counts[c.slug] ?? 0} items
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
