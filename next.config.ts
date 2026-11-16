import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML/CSS/JS to the `out` folder,
  // ready for Render's Static Site hosting.
  output: "export",
  images: { unoptimized: true }, // next/image's optimizer needs a server
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents / partialPrefetching are off: they can't be used with `output: "export"`.
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
