import { createFileRoute } from "@tanstack/react-router";
import { llmsTxt } from "@/lib/seo";

// Plain-Markdown summary for LLM crawlers (llmstxt.org), generated from portfolio.ts.
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(llmsTxt(), {
          headers: {
            "content-type": "text/markdown; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
