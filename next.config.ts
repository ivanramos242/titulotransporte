import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/test-online/",
        destination: "/test-competencia-profesional-mercancias/",
        permanent: true,
      },
      {
        source: "/test-online",
        destination: "/test-competencia-profesional-mercancias/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
