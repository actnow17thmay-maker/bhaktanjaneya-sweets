import { cn } from "@/lib/utils";

type Tone = "saffron" | "maroon" | "leaf" | "muted";

const tones: Record<Tone, string> = {
  saffron: "bg-saffron-300/40 text-maroon-800",
  maroon: "bg-maroon-800 text-cream-50",
  leaf: "bg-leaf-600/12 text-leaf-600",
  muted: "bg-cream-200 text-ink-700",
};

export function Badge({
  children,
  tone = "saffron",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
