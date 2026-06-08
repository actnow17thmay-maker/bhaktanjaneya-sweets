"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, Eye, MessageCircle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { EmptyState, Modal, inputClass } from "@/components/admin/ui";
import { Badge } from "@/components/ui/Badge";
import { formatINR, formatDate } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import type { Order, OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const PAYMENT_TONE: Record<string, "leaf" | "saffron" | "maroon" | "muted"> = {
  paid: "leaf",
  pending: "saffron",
  failed: "maroon",
  cod: "muted",
};

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [viewing, setViewing] = useState<Order | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-maroon-900">
            Orders
          </h1>
          <p className="text-sm text-ink-500">
            {orders.length} order{orders.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as OrderStatus | "all")}
          className={`${inputClass} max-w-[180px]`}
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={26} />}
          title="No orders"
          text={
            orders.length === 0
              ? "Orders placed on the storefront will show up here."
              : "No orders match this filter."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-200 text-left text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Channel</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-mono text-xs text-ink-500">
                      #{o.id.replace(/^ord_/, "").toUpperCase().slice(0, 8)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-maroon-900">
                        {o.customerName || "—"}
                      </p>
                      <p className="text-xs text-ink-400">{o.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3 text-ink-500">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="px-4 py-3 capitalize text-ink-500">
                      {o.channel}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={PAYMENT_TONE[o.paymentStatus] ?? "muted"}>
                        {o.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-bold text-maroon-900">
                      {formatINR(o.total)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) =>
                          updateOrderStatus(o.id, e.target.value as OrderStatus)
                        }
                        className="h-9 rounded-lg border border-cream-300 bg-white px-2 text-xs font-medium capitalize text-ink-700 focus:border-saffron-400 focus:outline-none"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="capitalize">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setViewing(o)}
                        aria-label="View order"
                        className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-cream-100 hover:text-maroon-800"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewing && (
        <Modal
          title={`Order #${viewing.id
            .replace(/^ord_/, "")
            .toUpperCase()
            .slice(0, 8)}`}
          onClose={() => setViewing(null)}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between gap-3 text-sm">
              <div>
                <p className="font-medium text-maroon-900">
                  {viewing.customerName || "Customer"}
                </p>
                <p className="text-ink-500">{viewing.customerPhone}</p>
              </div>
              <div className="text-right text-ink-500">
                <p>{formatDate(viewing.createdAt)}</p>
                <p className="capitalize">{viewing.channel}</p>
              </div>
            </div>

            <ul className="divide-y divide-cream-200 rounded-xl border border-cream-200">
              {viewing.items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="text-ink-700">
                    {it.name}{" "}
                    <span className="text-ink-400">
                      ({it.variantLabel}) × {it.quantity}
                    </span>
                  </span>
                  <span className="font-medium text-maroon-900">
                    {formatINR(it.price * it.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>Subtotal</span>
                <span>{formatINR(viewing.subtotal)}</span>
              </div>
              {viewing.discount ? (
                <div className="flex justify-between text-leaf-600">
                  <span>Discount</span>
                  <span>−{formatINR(viewing.discount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-ink-500">
                <span>Shipping</span>
                <span>
                  {viewing.shipping ? formatINR(viewing.shipping) : "Free"}
                </span>
              </div>
              <div className="flex justify-between border-t border-cream-200 pt-2 text-base font-bold text-maroon-900">
                <span>Total</span>
                <span>{formatINR(viewing.total)}</span>
              </div>
            </div>

            <a
              href={waLink(
                `Hello ${viewing.customerName || ""}! Regarding your order #${viewing.id
                  .replace(/^ord_/, "")
                  .toUpperCase()
                  .slice(0, 8)}…`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white hover:bg-[#1fb457]"
            >
              <MessageCircle size={17} /> Message customer
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
