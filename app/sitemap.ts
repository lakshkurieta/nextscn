import type { MetadataRoute } from "next";

/**
 * Served at /sitemap.xml.
 *
 * One entry, because the site is one page. Search engines rank PAGES, so the
 * way to compete for more than one cluster of queries is more URLs — event
 * pages, member stories, resources — each of which belongs in this list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nextscn.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://nextscn.com/become-a-member",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
