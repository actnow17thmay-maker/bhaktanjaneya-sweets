import type { Metadata } from "next";
import { Gift, Building2, IndianRupee, ChefHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { bulkContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bulk & Corporate Orders",
  description:
    "Bulk sweets and namkeen for weddings, festivals, and corporate gifting. Custom packaging and the best per-kg pricing from Bhaktanjaneya Sweets.",
};

const ICONS = [Gift, Building2, IndianRupee, ChefHat];

export default function BulkOrdersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-maroon-900 py-16 text-cream-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-saffron-400/15 px-4 py-1.5 text-sm font-medium text-saffron-300">
              <Gift size={15} /> Bulk & Gifting
            </p>
            <h1 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">
              Big celebrations deserve fresh sweets
            </h1>
            <p className="mt-4 text-base leading-relaxed text-cream-100/85">
              {bulkContent.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-14">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bulkContent.benefits.map((b, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-800 text-saffron-400">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-maroon-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {b.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Enquiry */}
      <section className="bg-cream-100 py-14">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-maroon-900 sm:text-3xl">
                Request a bulk quote
              </h2>
              <p className="mt-3 text-ink-600">
                Tell us what you need — the occasion, items, quantity, and your
                delivery date. We&apos;ll reply on WhatsApp with custom pricing
                and packaging options.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-600">
                <li>• Minimum bulk quantity: 5 kg per item</li>
                <li>• Custom and branded packaging available</li>
                <li>• Pan-India delivery, dispatched fresh</li>
              </ul>
            </div>
            <EnquiryForm
              prefix="I'd like a bulk order quote:"
              ctaLabel="Request quote on WhatsApp"
              messageLabel="Order details"
              messagePlaceholder="Occasion, items, quantity (kg), and delivery date…"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
