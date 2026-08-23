import type { MetadataRoute } from "next";

/**
 * Served at /robots.txt. Points crawlers at the sitemap so they do not have to
 * discover URLs by following links alone.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nextscn.com/sitemap.xml",
  };
}
