import { config } from "@/lib/config";
import type { Offer } from "@/lib/types";
import offersJson from "@/lib/mock/offers.json";
import { apiGet } from "./client";

const mock = offersJson as unknown as Offer[];

export async function getActiveOffers(): Promise<Offer[]> {
  if (config.useMock) return mock.filter((o) => o.active);
  return apiGet<Offer[]>("/offers?active=true");
}
