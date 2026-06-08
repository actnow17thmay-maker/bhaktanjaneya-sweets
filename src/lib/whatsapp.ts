import { config } from "./config";
import type { CartItem } from "./types";
import { formatINR } from "./utils";

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(message: string): string {
  const num = config.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

/** Message for ordering a single product/variant from a product page. */
export function productEnquiryMessage(
  name: string,
  variantLabel: string,
  price: number,
): string {
  return [
    `Hello ${config.businessName}!`,
    "",
    `I'd like to order:`,
    `• ${name} (${variantLabel}) — ${formatINR(price)}`,
    "",
    "Please confirm availability and delivery.",
  ].join("\n");
}

/** Message that compiles the whole cart into a WhatsApp order. */
export function cartOrderMessage(
  items: CartItem[],
  opts?: { name?: string; phone?: string; subtotal?: number },
): string {
  const lines = items.map(
    (it, i) =>
      `${i + 1}. ${it.name} (${it.variantLabel}) x${it.quantity} — ${formatINR(
        it.price * it.quantity,
      )}`,
  );
  const subtotal =
    opts?.subtotal ?? items.reduce((s, it) => s + it.price * it.quantity, 0);

  const who = [
    opts?.name ? `Name: ${opts.name}` : null,
    opts?.phone ? `Phone: ${opts.phone}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    `Hello ${config.businessName}!`,
    "",
    "I'd like to place this order:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    who,
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}
