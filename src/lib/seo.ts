// Search, share and LLM metadata, built only from src/data/portfolio.ts.
import {
  contact,
  education,
  experience,
  profile,
  projects,
  shareImage,
  siteUrl,
  skills,
} from "@/data/portfolio";

type Project = (typeof projects)[number];

/** Absolute URL on the published origin for a site path ("/", "/projects/x", "/__l5e/..."). */
export const absoluteUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const projectPath = (slug: string) => `/projects/${slug}`;
export const shareImageUrl = absoluteUrl(shareImage.path);
const personId = `${absoluteUrl("/")}#person`;
const websiteId = `${absoluteUrl("/")}#website`;

/** og:image + twitter:image tags; the root route adds them so every page has a share card. */
export const shareImageMeta = [
  { property: "og:image", content: shareImageUrl },
  { property: "og:image:width", content: String(shareImage.width) },
  { property: "og:image:height", content: String(shareImage.height) },
  { property: "og:image:alt", content: shareImage.alt },
  { name: "twitter:image", content: shareImageUrl },
  { name: "twitter:image:alt", content: shareImage.alt },
];

/** JSON for a <script type="application/ld+json">; "<" is escaped so no value can close the tag. */
const jsonLd = (data: object) => ({
  type: "application/ld+json",
  children: JSON.stringify(data).replace(/</g, "\\u003c"),
});

const unique = (items: string[]) => [...new Set(items)];

export function homeJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.jobTitle,
        description: profile.description,
        url: absoluteUrl("/"),
        image: shareImageUrl,
        email: `mailto:${contact.email}`,
        address: { "@type": "PostalAddress", addressCountry: profile.location },
        alumniOf: unique(education.map((e) => e.school)).map((name) => ({
          "@type": "EducationalOrganization",
          name,
        })),
        knowsAbout: unique(skills.flatMap((s) => s.items)),
        sameAs: [contact.github, contact.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: profile.name,
        description: profile.description,
        url: absoluteUrl("/"),
        inLanguage: "en",
        author: { "@id": personId },
        about: { "@id": personId },
      },
    ],
  });
}

export function projectJsonLd(project: Project) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(projectPath(project.slug)),
    ...(project.image ? { image: absoluteUrl(project.image) } : {}),
    keywords: project.tags.join(", "),
    author: { "@type": "Person", "@id": personId, name: profile.name, url: absoluteUrl("/") },
    isPartOf: { "@id": websiteId },
  });
}

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Home plus one entry per project, so a new project in portfolio.ts is listed automatically. */
export function sitemapXml() {
  const urls = ["/", ...projects.map((p) => projectPath(p.slug))].map(
    (path) => `  <url><loc>${xmlEscape(absoluteUrl(path))}</loc></url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

/** llms.txt (https://llmstxt.org): plain Markdown restating portfolio.ts, no new claims. */
export function llmsTxt() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.description}`,
    "",
    `${profile.headline}. Based in ${profile.location}. Portfolio: ${absoluteUrl("/")}`,
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) => `- **${e.role}**, ${e.organization} (${e.location}, ${e.period}): ${e.description}`,
    ),
    "",
    "## Skills",
    "",
    ...skills.map((s) => `- **${s.title}:** ${s.items.join(", ")}`),
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.title}](${absoluteUrl(projectPath(p.slug))}): ${p.description}`),
    "",
    "## Education",
    "",
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    "",
    "## Contact",
    "",
    `- GitHub: ${contact.github}`,
    `- LinkedIn: ${contact.linkedin}`,
    "",
  ];
  return lines.join("\n");
}
