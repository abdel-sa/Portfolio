import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  // Alte Links auf /cv.pdf funktionieren weiter: je nach gespeicherter Sprache DE oder EN
  async redirects() {
    return [
      {
        source: "/cv.pdf",
        has: [{ type: "cookie", key: "portfolio-language", value: "en" }],
        destination: "/cv-en.pdf",
        permanent: false,
      },
      {
        source: "/cv.pdf",
        destination: "/cv-de.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
