import { createFileRoute } from "@tanstack/react-router";
import { sitemapXml } from "@/lib/seo";

// Generated from portfolio.ts on each request: home plus every project slug.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
