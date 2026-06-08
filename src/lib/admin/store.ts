// Browser-side mock store for the admin panel and customer capture.
//
// In MOCK mode (NEXT_PUBLIC_USE_MOCK=true) admin edits, captured customer phone
// numbers, and placed orders are persisted to localStorage so the panel is
// fully usable for a demo. When the backend is connected, these reads/writes
// are replaced by API calls (see API_CONTRACT.md). Storefront pages are
// server-rendered from the seed JSON, so mock admin edits won't change the
// public site until the real API is wired up.

import productsSeed from "@/lib/mock/products.json";
import categoriesSeed from "@/lib/mock/categories.json";
import offersSeed from "@/lib/mock/offers.json";
import type { Category, Customer, Offer, Order, Product } from "@/lib/types";

const KEYS = {
  products: "bas_products",
  categories: "bas_categories",
  offers: "bas_offers",
  orders: "bas_orders",
  customers: "bas_customers",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const adminStore = {
  getProducts: () => read<Product[]>(KEYS.products, productsSeed as unknown as Product[]),
  setProducts: (v: Product[]) => write(KEYS.products, v),
  getCategories: () => read<Category[]>(KEYS.categories, categoriesSeed as unknown as Category[]),
  setCategories: (v: Category[]) => write(KEYS.categories, v),
  getOffers: () => read<Offer[]>(KEYS.offers, offersSeed as unknown as Offer[]),
  setOffers: (v: Offer[]) => write(KEYS.offers, v),
  getOrders: () => read<Order[]>(KEYS.orders, []),
  setOrders: (v: Order[]) => write(KEYS.orders, v),
  getCustomers: () => read<Customer[]>(KEYS.customers, []),
  setCustomers: (v: Customer[]) => write(KEYS.customers, v),
  /** Wipe local demo data and fall back to the seed JSON. */
  reset: () => {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  },
};

/** Save (or update) a customer's phone number — used by OTP login + checkout. */
export function recordCustomer(phone: string, name?: string): Customer {
  const list = adminStore.getCustomers();
  const existing = list.find((c) => c.phone === phone);
  if (existing) {
    if (name && !existing.name) existing.name = name;
    adminStore.setCustomers(list);
    return existing;
  }
  const customer: Customer = {
    id: `cus_${phone}`,
    phone,
    name,
    createdAt: new Date().toISOString(),
    ordersCount: 0,
  };
  list.unshift(customer);
  adminStore.setCustomers(list);
  return customer;
}

/** Record a placed order (WhatsApp now, online later) for the admin panel. */
export function recordOrder(order: Order): void {
  const orders = adminStore.getOrders();
  orders.unshift(order);
  adminStore.setOrders(orders);

  const customers = adminStore.getCustomers();
  const c = customers.find((x) => x.phone === order.customerPhone);
  if (c) {
    c.ordersCount = (c.ordersCount ?? 0) + 1;
    adminStore.setCustomers(customers);
  } else if (order.customerPhone) {
    recordCustomer(order.customerPhone, order.customerName);
    const updated = adminStore.getCustomers();
    const nc = updated.find((x) => x.phone === order.customerPhone);
    if (nc) {
      nc.ordersCount = 1;
      adminStore.setCustomers(updated);
    }
  }
}
