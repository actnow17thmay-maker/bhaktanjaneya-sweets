"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Customer } from "@/lib/types";
import { requestOtp, verifyOtp } from "@/lib/api/auth";
import { recordCustomer } from "@/lib/admin/store";

const STORAGE_KEY = "bas_session";

interface AuthContextValue {
  customer: Customer | null;
  loading: boolean;
  sendOtp: (phone: string) => Promise<{ devCode?: string }>;
  confirmOtp: (phone: string, code: string) => Promise<void>;
  updateName: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCustomer((JSON.parse(raw).customer as Customer) ?? null);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((c: Customer | null) => {
    setCustomer(c);
    if (c)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ customer: c }));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const sendOtp = useCallback(async (phone: string) => {
    setLoading(true);
    try {
      return await requestOtp(phone);
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmOtp = useCallback(
    async (phone: string, code: string) => {
      setLoading(true);
      try {
        const session = await verifyOtp(phone, code);
        const c =
          session.customer ?? {
            id: `cus_${phone}`,
            phone,
            createdAt: new Date().toISOString(),
          };
        recordCustomer(c.phone, c.name); // capture phone number for the admin panel
        persist(c);
      } finally {
        setLoading(false);
      }
    },
    [persist],
  );

  const updateName = useCallback((name: string) => {
    setCustomer((prev) => {
      if (!prev) return prev;
      const next = { ...prev, name };
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ customer: next }),
      );
      recordCustomer(next.phone, name);
      return next;
    });
  }, []);

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ customer, loading, sendOtp, confirmOtp, updateName, logout }),
    [customer, loading, sendOtp, confirmOtp, updateName, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
