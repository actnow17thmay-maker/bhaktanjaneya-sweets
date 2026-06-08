import Link from "next/link";
import { BadgePercent, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function OfferBanner() {
  return (
    <section className="py-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-800 to-maroon-900 px-6 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-saffron-400/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-saffron-400/10 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-saffron-300">
              <BadgePercent size={15} /> Welcome offer
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-cream-50 sm:text-4xl">
              10% off your first order
            </h2>
            <p className="mt-3 text-cream-100/85">
              Use code <span className="font-bold text-saffron-300">BAS10</span>{" "}
              on orders above ₹500. Plus free shipping over ₹700.
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-saffron-500 px-8 text-sm font-semibold text-maroon-900 transition-colors hover:bg-saffron-400"
            >
              Shop now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
