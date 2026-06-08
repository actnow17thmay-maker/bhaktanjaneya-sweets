import { config } from "@/lib/config";
import type { Session } from "@/lib/types";
import { apiPost } from "./client";

/** Demo OTP accepted while in mock mode. The real provider replaces this. */
export const DEMO_OTP = "123456";

export async function requestOtp(
  phone: string,
): Promise<{ ok: boolean; devCode?: string }> {
  if (config.useMock) return { ok: true, devCode: DEMO_OTP };
  await apiPost("/auth/request-otp", { phone });
  return { ok: true };
}

export async function verifyOtp(phone: string, code: string): Promise<Session> {
  if (config.useMock) {
    if (code !== DEMO_OTP) {
      throw new Error(`Invalid code. Use ${DEMO_OTP} in demo mode.`);
    }
    return {
      token: `mock-token-${phone}`,
      customer: {
        id: `cus_${phone}`,
        phone,
        createdAt: new Date().toISOString(),
      },
    };
  }
  return apiPost<Session>("/auth/verify-otp", { phone, code });
}
