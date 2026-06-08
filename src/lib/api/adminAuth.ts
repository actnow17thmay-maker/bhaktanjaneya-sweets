import { config } from "@/lib/config";
import type { AdminUser } from "@/lib/types";
import { apiPost } from "./client";

// Admin authentication seam. In mock/demo mode a single hard-coded admin login
// is accepted so the panel is usable offline. When the backend is connected,
// the real /admin/login endpoint replaces this (see API_CONTRACT.md). The
// session token returned here is what the backend will issue as a JWT.

/** Demo admin credentials accepted while in mock mode. */
export const DEMO_ADMIN = {
  email: "admin@bhaktanjaneyasweets.com",
  password: "admin123",
};

export interface AdminSession {
  token: string;
  user: AdminUser;
}

export async function adminLogin(
  email: string,
  password: string,
): Promise<AdminSession> {
  if (config.useMock) {
    const ok =
      email.trim().toLowerCase() === DEMO_ADMIN.email &&
      password === DEMO_ADMIN.password;
    if (!ok) throw new Error("Invalid email or password.");
    return {
      token: `mock-admin-${Date.now()}`,
      user: {
        id: "adm_1",
        email: DEMO_ADMIN.email,
        name: "Store Admin",
        role: "admin",
      },
    };
  }
  return apiPost<AdminSession>("/admin/login", { email, password });
}
