import { createFileRoute } from "@tanstack/react-router";
import { robotsTxt } from "@/lib/seo";

// Crawler rules plus a Sitemap line built from siteUrl, so the domain lives in one place.
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(robotsTxt(), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
