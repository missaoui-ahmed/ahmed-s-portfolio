// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GITHUB_PAGES=true (set only by .github/workflows/deploy.yml) builds a fully static site:
// every route is prerendered to <route>/index.html in dist/client and the Cloudflare SSR server
// (nitro) is skipped, because GitHub Pages can only serve files. Lovable builds never set it,
// so they keep the default SSR build unchanged.
const githubPages = process.env["GITHUB_PAGES"] === "true";

// Server routes in src/routes that return text files. Listed in `pages` so the static build
// writes them even though no page links to them.
const generatedFiles = ["/robots.txt", "/sitemap.xml", "/llms.txt"];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(githubPages && {
      pages: [{ path: "/" }, ...generatedFiles.map(path => ({ path }))],
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        // The link crawler also follows file links (e.g. the CV PDF); rendering those would
        // overwrite the real file in dist/client/assets, so only prerender extensionless routes,
        // plus the generated text routes (written to dist/client as robots.txt, sitemap.xml, llms.txt).
        filter: ({ path }: { path: string }) => {
          const clean = path.split(/[?#]/)[0] ?? path;
          return generatedFiles.includes(clean) || !/\.[a-z0-9]+$/i.test(clean);
        },
      },
    }),
  },
  ...(githubPages && { nitro: false as const }),
});
