import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { ContentGuard } from "@/components/content-guard";
import { ScrollProgress } from "@/components/scroll-progress";

/**
 * Proxima Nova is the brand typeface (06 TYPOGRAPHY). It is a licensed face,
 * so Figtree — the closest free geometric-humanist match — carries the site
 * until licensed webfonts are dropped into /public/fonts. The cascade in
 * globals.css puts "Proxima Nova" first, so the swap is automatic.
 */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-figtree",
  display: "swap",
});

const SITE = "https://nextscn.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  // Tells Google which URL is canonical, so trailing slashes, query strings and
  // any staging copy do not compete with the real page.
  alternates: { canonical: "/" },
  title: {
    default: "NEXT SCN, Supply Chain Network & Community",
    template: "%s · NEXT SCN",
  },
  /**
   * This is the snippet Google shows under the title, so it has to read as a
   * sentence to a human AND contain the words people actually search. Roughly
   * 155 characters, because Google truncates beyond that.
   *
   * Note there is no `keywords` field: Google has ignored the keywords meta tag
   * since 2009, and it was previously carrying stale copy.
   */
  description:
    "NEXT SCN is a global supply chain network connecting operators, founders, investors, 3PLs, manufacturers and technology partners. Connect, learn, collaborate, grow.",
  applicationName: "NEXT SCN",
  authors: [{ name: "NEXT SCN" }],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "NEXT SCN",
    title: "NEXT SCN, Supply Chain Network & Community",
    description:
      "A global supply chain network bringing together the people, businesses, ideas and technology shaping what comes next.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT SCN, Supply Chain Network & Community",
    description:
      "A global supply chain network bringing together the people, businesses, ideas and technology shaping what comes next.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Organization schema.
 *
 * This is how a search engine learns that "NEXT SCN" is an entity rather than a
 * phrase — what it is called, where it operates, how to contact it. It is what
 * feeds knowledge panels and is the cheapest win available for brand queries.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NEXT SCN",
  alternateName: "NEXT Supply Chain Network",
  url: SITE,
  logo: `${SITE}/next-scn-logo.png`,
  image: `${SITE}/opengraph-image.png`,
  description:
    "A global supply chain network bringing together the people, businesses, ideas and technology shaping what comes next.",
  email: "info@nextscn.com",
  location: [
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vancouver",
        addressCountry: "CA",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Indiana",
        addressCountry: "US",
      },
    },
  ],
  knowsAbout: [
    "Supply chain",
    "Logistics",
    "Freight",
    "Procurement",
    "Warehousing",
    "Distribution",
    "Third-party logistics",
  ],
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="bg-ink text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollProgress />
        {children}
        <ContentGuard />
        <CookieConsent />
      </body>
    </html>
  );
}
