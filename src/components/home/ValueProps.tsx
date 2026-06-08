import { Leaf, Award, PackageCheck, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: Leaf,
    title: "Pure Ingredients",
    text: "Only pure ghee, premium nuts, and natural ingredients — never any artificial flavour.",
  },
  {
    icon: Award,
    title: "Authentic Recipes",
    text: "Time-honoured family recipes passed down through generations of sweet-makers.",
  },
  {
    icon: PackageCheck,
    title: "Hygienically Packed",
    text: "Made in small batches and sealed fresh so it reaches you exactly as intended.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Orders",
    text: "Add to cart and check out on WhatsApp in seconds — no app, no hassle.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-cream-100 py-14">
      <Container>
        <SectionHeading
          eyebrow="Why Bhaktanjaneya"
          title="Made with care, trusted by families"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-800 text-saffron-400">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-maroon-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
