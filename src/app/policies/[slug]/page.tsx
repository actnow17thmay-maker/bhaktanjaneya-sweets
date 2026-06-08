import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { policies, policySlugs } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return policySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/policies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = policies[slug];
  if (!policy) return { title: "Policy not found" };
  return {
    title: policy.title,
    description: policy.intro,
  };
}

const NAV: { slug: string; label: string }[] = [
  { slug: "shipping", label: "Shipping" },
  { slug: "returns", label: "Returns & Refunds" },
  { slug: "privacy", label: "Privacy" },
  { slug: "terms", label: "Terms of Service" },
];

export default async function PolicyPage(props: PageProps<"/policies/[slug]">) {
  const { slug } = await props.params;
  const policy = policies[slug];
  if (!policy) notFound();

  return (
    <div className="py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Side nav */}
          <aside className="h-fit lg:sticky lg:top-24">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
              Policies
            </p>
            <nav className="mt-2 space-y-1">
              {NAV.map((item) => {
                const active = item.slug === slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/policies/${item.slug}`}
                    className={
                      active
                        ? "block rounded-lg bg-maroon-800 px-3 py-2 text-sm font-medium text-cream-50"
                        : "block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-cream-100"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <article className="max-w-3xl">
            <h1 className="font-serif text-3xl font-bold text-maroon-900">
              {policy.title}
            </h1>
            <p className="mt-2 text-sm text-ink-400">
              Last updated {formatDate(policy.updated)}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              {policy.intro}
            </p>

            <div className="mt-8 space-y-8">
              {policy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-xl font-semibold text-maroon-900">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                    {section.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}
