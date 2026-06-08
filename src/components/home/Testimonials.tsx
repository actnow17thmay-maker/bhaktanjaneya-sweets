import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/mock/testimonials";

export function Testimonials() {
  return (
    <section className="py-14">
      <Container>
        <SectionHeading
          eyebrow="Loved by customers"
          title="What our customers say"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-6 shadow-soft"
            >
              <div className="flex gap-0.5 text-saffron-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-saffron-500" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-800 text-sm font-bold text-cream-50">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-maroon-900">
                    {t.name}
                  </p>
                  {t.role && <p className="text-xs text-ink-400">{t.role}</p>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
