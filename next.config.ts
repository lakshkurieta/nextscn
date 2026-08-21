import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `next dev` only accepts cross-origin requests from hosts listed here, so
   * without this a tunnelled URL loads the HTML but its dev assets and HMR
   * socket are refused — the page arrives unstyled and never hydrates.
   * Covers ngrok and Cloudflare quick tunnels. Dev-only; `next start` ignores it.
   */
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.dev",
    "*.ngrok.app",
    "*.ngrok.io",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
