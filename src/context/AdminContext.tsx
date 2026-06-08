"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Category,
  Customer,
  Offer,
  Order,
  OrderStatus,
  Product,
} from "@/lib/types";
import { adminStore } from "@/lib/admin/store";
import { adminLogin, type AdminSession } from "@/lib/api/adminAuth";

const SESSION_KEY = "bas_admin_session";

interface AdminContextValue {
  hydrated: boolean;
  session: AdminSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  products: Product[];
  categories: Category[];
  offers: Offer[];
  orders: Order[];
  customers: Customer[];

  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  saveOffer: (offer: Offer) => void;
  deleteOffer: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  resetDemoData: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadAll = useCallback(() => {
    setProducts(adminStore.getProducts());
    setCategories(adminStore.getCategories());
    setOffers(adminStore.getOffers());
    setOrders(adminStore.getOrders());
    setCustomers(adminStore.getCustomers());
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw) as AdminSession);
    } catch {
      /* ignore */
    }
    loadAll();
    setHydrated(true);
  }, [loadAll]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const next = await adminLogin(email, password);
      setSession(next);
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    window.localStorage.removeItem(SESSION_KEY);
  }, []);

  // ---- Products ----
  const saveProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      const next =
        idx === -1
          ? [product, ...prev]
          : prev.map((p) => (p.id === product.id ? product : p));
      adminStore.setProducts(next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      adminStore.setProducts(next);
      return next;
    });
  }, []);

  // ---- Categories ----
  const saveCategory = useCallback((category: Category) => {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === category.id);
      const next =
        idx === -1
          ? [...prev, category]
          : prev.map((c) => (c.id === category.id ? category : c));
      adminStore.setCategories(next);
      return next;
    });
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => {
      const next = prev.filter((c) => c.id !== id);
      adminStore.setCategories(next);
      return next;
    });
  }, []);

  // ---- Offers ----
  const saveOffer = useCallback((offer: Offer) => {
    setOffers((prev) => {
      const idx = prev.findIndex((o) => o.id === offer.id);
      const next =
        idx === -1
          ? [...prev, offer]
          : prev.map((o) => (o.id === offer.id ? offer : o));
      adminStore.setOffers(next);
      return next;
    });
  }, []);

  const deleteOffer = useCallback((id: string) => {
    setOffers((prev) => {
      const next = prev.filter((o) => o.id !== id);
      adminStore.setOffers(next);
      return next;
    });
  }, []);

  // ---- Orders ----
  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, status } : o));
      adminStore.setOrders(next);
      return next;
    });
  }, []);

  const resetDemoData = useCallback(() => {
    adminStore.reset();
    loadAll();
  }, [loadAll]);

  const value = useMemo<AdminContextValue>(
    () => ({
      hydrated,
      session,
      loading,
      login,
      logout,
      products,
      categories,
      offers,
      orders,
      customers,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      saveOffer,
      deleteOffer,
      updateOrderStatus,
      resetDemoData,
    }),
    [
      hydrated,
      session,
      loading,
      login,
      logout,
      products,
      categories,
      offers,
      orders,
      customers,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      saveOffer,
      deleteOffer,
      updateOrderStatus,
      resetDemoData,
    ],
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
