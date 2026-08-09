import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/** Emitted as a static file at build time (required by output: "export"). */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
