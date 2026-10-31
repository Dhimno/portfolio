import type { NextConfig } from "next";
import os from "node:os";

const localIps = Object.values(os.networkInterfaces())
  .flat()
  .filter((iface): iface is os.NetworkInterfaceInfo => !!iface && iface.family === "IPv4")
  .map((iface) => iface.address);

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  allowedDevOrigins: [
    ...localIps,
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
    "localhost",
    "127.0.0.1",
  ],
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
