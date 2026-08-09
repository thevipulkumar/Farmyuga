import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — the whole site compiles to plain HTML/CSS/JS in `out/`,
   * which is what Hostinger's shared hosting (Apache/LiteSpeed + PHP) serves.
   * There is no Node process in production, so there are no route handlers;
   * the inquiry form posts to public/api/inquiry.php instead.
   */
  output: "export",

  /**
   * Produces out/about/index.html rather than out/about.html, so Apache
   * serves /about/ correctly with no rewrite rules.
   */
  trailingSlash: true,

  images: {
    /**
     * The Next.js image optimizer needs a server. Turning it off means
     * <Image> emits a plain <img>. Little is lost here: every photo in
     * lib/images.ts already requests an exact width, height and quality
     * from the Unsplash CDN, so the bytes on the wire are already right-sized.
     */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
