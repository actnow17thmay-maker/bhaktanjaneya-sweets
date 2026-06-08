import { Leaf, Flame, Sparkles, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: Leaf, title: "100% Pure Veg", text: "No additives, ever" },
  { icon: Flame, title: "Pure Desi Ghee", text: "Rich & authentic" },
  { icon: Sparkles, title: "Freshly Made", text: "Small-batch daily" },
  { icon: Truck, title: "Fast Delivery", text: "Across India" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-cream-200 bg-white">
      <Container>
        <div className="grid grid-cols-2 gap-6 py-7 md:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-saffron-300/30 text-saffron-600">
                <Icon size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-maroon-900">{title}</p>
                <p className="text-xs text-ink-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
