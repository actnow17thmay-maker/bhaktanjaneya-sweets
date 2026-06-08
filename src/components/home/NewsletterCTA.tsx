import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterCTA() {
  return (
    <section className="py-14">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-maroon-900 px-6 py-12 sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-saffron-400/10 blur-2xl" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-md">
              <h2 className="font-serif text-2xl font-bold text-cream-50 sm:text-3xl">
                Sweet deals in your inbox
              </h2>
              <p className="mt-2 text-sm text-cream-100/80">
                Subscribe for fresh-batch alerts, festive offers, and new
                launches.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
