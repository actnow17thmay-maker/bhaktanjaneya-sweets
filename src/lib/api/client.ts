import { config } from "@/lib/config";

// Thin fetch wrapper used when NEXT_PUBLIC_USE_MOCK=false. Every real network
// call to your friend's backend goes through here, so headers/auth/error
// handling live in one place.

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    throw new Error(`${init?.method ?? "GET"} ${path} → ${res.status}`);
  }
  return (res.status === 204 ? (undefined as T) : ((await res.json()) as T));
}

export const apiGet = <T>(path: string) => req<T>(path);
export const apiPost = <T>(path: string, body?: unknown) =>
  req<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) });
export const apiPut = <T>(path: string, body?: unknown) =>
  req<T>(path, { method: "PUT", body: JSON.stringify(body ?? {}) });
export const apiDelete = <T>(path: string) =>
  req<T>(path, { method: "DELETE" });
