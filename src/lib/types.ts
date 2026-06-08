// Shared domain types — these double as the API contract between the
// frontend and the backend your friend will build. Keep them in sync with
// API_CONTRACT.md.

export interface Variant {
  /** Unique within a product, used as the cart/order line key. */
  id: string;
  /** Human label, e.g. "250 g", "1 kg", "12 pieces". */
  label: string;
  /** Current selling price in INR (rupees, integer). */
  price: number;
  /** Optional original price for strike-through / discount display. */
  mrp?: number;
  /** Units in stock. */
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Category slug, e.g. "sweets" | "namkeen". */
  category: string;
  categoryLabel?: string;
  /** Image URLs. Placeholders today; real photos uploaded via admin later. */
  images: string[];
  variants: Variant[];
  /** Merchandising flags: "best-seller" | "top-pick" | "combo" | "new". */
  tags: string[];
  rating: number;
  reviewCount: number;
  active: boolean;
  /** Short trust badges, e.g. "100% Pure Veg", "Pure Ghee". */
  badges?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  order?: number;
}

export type OfferType = "percent" | "flat" | "free_shipping";

export interface Offer {
  id: string;
  code: string;
  title: string;
  description?: string;
  type: OfferType;
  /** Percent (0-100) or flat amount in INR; ignored for free_shipping. */
  value: number;
  /** Minimum cart subtotal for the offer to apply. */
  minSubtotal?: number;
  active: boolean;
  startsAt?: string;
  endsAt?: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image?: string;
  variantId: string;
  variantLabel: string;
  price: number;
  quantity: number;
}

export interface Customer {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  createdAt: string;
  ordersCount?: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  variantLabel: string;
  price: number;
  quantity: number;
}

export type OrderChannel = "whatsapp" | "online";
export type PaymentStatus = "pending" | "paid" | "failed" | "cod";
export type OrderStatus =
  | "new"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customerPhone: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  shipping?: number;
  total: number;
  channel: OrderChannel;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: "admin";
}

export interface Session {
  token: string;
  customer?: Customer;
}
