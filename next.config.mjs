/**
 * Plain JavaScript on purpose — do NOT rename this back to next.config.ts.
 *
 * Hostinger's build container ships a glibc older than 2.29, so Next.js cannot
 * load its native SWC binary and falls back to the WebAssembly compiler. That
 * fallback cannot compile a TypeScript config, which fails the build with
 * "Cannot find module ....next.config". A .mjs config is read directly by Node
 * and sidesteps the whole problem. The JSDoc type below keeps editor
 * autocomplete and type checking without needing a compile step.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * Static export — the whole site compiles to plain HTML/CSS/JS in `out/`,
   * which is the directory Hostinger serves. Set "Output directory" to `out`
   * in the Hostinger build settings, not `.next`.
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
