import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/test-online/",
        destination: "/test-competencia-profesional-mercancias/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
