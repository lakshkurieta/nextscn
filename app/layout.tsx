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

export const metadata: Metadata = {
  metadataBase: new URL("https://nextscn.com"),
  title: {
    default: "NEXT Supply Chain Network",
    template: "%s · NEXT",
  },
  description:
    "One industry. No walls. One introduction away. NEXT connects the people, ideas, businesses and opportunities shaping the next generation of supply chain.",
  keywords: [
    "supply chain network",
    "logistics community",
    "supply chain founders",
    "supply chain investors",
    "warm introductions",
  ],
  openGraph: {
    title: "NEXT Supply Chain Network",
    description: "One industry. No walls. One introduction away.",
    type: "website",
    siteName: "NEXT",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT Supply Chain Network",
    description: "One industry. No walls. One introduction away.",
  },
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
        <ScrollProgress />
        {children}
        <ContentGuard />
        <CookieConsent />
      </body>
    </html>
  );
}
