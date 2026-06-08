import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const base = config.siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep private / account-specific areas out of search results.
      disallow: ["/admin", "/account", "/cart", "/login"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
