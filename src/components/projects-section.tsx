import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectArchitecture } from "@/components/project-architecture";
import { contact, projects } from "@/data/portfolio";

const featured = projects[0];
const otherProjects = projects.slice(1);

const cardAspect: Record<string, string> = {
  wide: "aspect-[16/9]",
  standard: "aspect-[16/10] sm:aspect-[3/2]",
};

function ProjectActions({ slug }: { slug: string }) {
  return <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
    <Button variant="portfolioText" asChild><Link to="/projects/$slug" params={{ slug }}>Read case study <ArrowUpRight /></Link></Button>
    <Button variant="portfolioText" className="text-muted-foreground hover:text-primary" asChild><a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="Ahmed Missaoui on GitHub (profile, not a project repository)"><Github /> GitHub profile <ArrowUpRight /></a></Button>
  </div>;
}

export function ProjectsSection() {
  if (!featured) return null;
  return <section id="projects" className="relative scroll-mt-16 overflow-hidden border-b border-line py-16 sm:py-20 md:py-28">
    <div className="page-shell relative">
      <header className="mb-10 flex flex-col justify-between gap-4 border-b border-line pb-7 sm:mb-12 sm:gap-5 sm:pb-9 md:mb-16 md:flex-row md:items-end">
        <div><p className="mono-label mb-4 text-primary sm:mb-5">05 / SELECTED WORK</p><h2 className="max-w-3xl text-3xl font-semibold leading-[1.14] sm:text-4xl md:text-5xl">Projects, in practice<span className="text-primary">.</span></h2></div>
        <p className="max-w-sm text-[13px] leading-6 text-muted-foreground sm:text-sm sm:leading-7">Engineering work from internships and a final-year project. The DocuAI and ATPU visuals are product screenshots; the others are conceptual illustrations.</p>
      </header>

      <article className="border-b border-line pb-12 sm:pb-16 md:pb-20">
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] gap-3 font-mono text-[10px] leading-5 text-primary sm:mb-6 sm:text-xs"><span>01 / FEATURED CASE STUDY</span><span className="text-right">{featured.category}</span></div>
        <div className="grid items-center gap-7 sm:gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] lg:gap-14">
          <Link to="/projects/$slug" params={{ slug: featured.slug }} className="project-visual group block overflow-hidden rounded-sm border border-border" aria-label={`View case study: ${featured.title}`}><img src={featured.image} alt={featured.alt} width={1200} height={800} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></Link>
          <div className="min-w-0">
            <p className="mono-label mb-4 text-muted-foreground sm:mb-5">VERMEG · AI FULL-STACK DEVELOPER INTERN</p>
            <h3 className="max-w-xl text-balance text-2xl font-semibold leading-[1.15] sm:text-3xl md:text-4xl xl:text-5xl">{featured.title}</h3>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">{featured.description}</p>
            <div className="mt-7 grid gap-5 border-t border-line pt-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 sm:pt-6 lg:grid-cols-1 xl:grid-cols-2"><div><p className="mono-label mb-2 text-primary">Problem</p><p className="text-sm leading-6 text-muted-foreground">{featured.problem}</p></div><div><p className="mono-label mb-2 text-primary">Solution</p><p className="text-sm leading-6 text-muted-foreground">{featured.solution}</p></div></div>
            <div className="mt-7 border-t border-line pt-6"><p className="mono-label mb-2 text-primary">My contribution</p><p className="text-sm leading-7 text-muted-foreground">{featured.contribution}</p></div>
            <div className="mt-7 border-t border-line pt-6"><p className="mono-label mb-3 text-primary">Technology stack</p><p className="font-mono text-xs leading-7 text-muted-foreground">{featured.tags.join("  ·  ")}</p></div>
            <div className="mt-6"><ProjectActions slug={featured.slug} /></div>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 sm:mt-12 sm:pt-7 md:mt-16"><div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 sm:mb-7"><h4 className="text-lg font-semibold">Architecture</h4><p className="mono-label text-right text-muted-foreground">DOCUMENT → OUTPUT</p></div><ProjectArchitecture steps={featured.architecture} /></div>
      </article>

      <div className="divide-y divide-line">
        {otherProjects.map((project, index) => <article key={project.slug} className="grid gap-6 py-10 first:pt-12 sm:gap-7 sm:py-12 sm:first:pt-14 md:gap-10 md:py-16 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="min-w-0"><div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 font-mono text-[10px] leading-5 text-primary sm:mb-5 sm:text-xs"><span>0{index + 2} / CASE STUDY</span><span className="text-right">{project.category}</span></div><Link to="/projects/$slug" params={{ slug: project.slug }} className="project-visual group block overflow-hidden rounded-sm border border-border" aria-label={`View case study: ${project.title}`}><img src={project.image} alt={project.alt} width={1200} height={800} loading="lazy" decoding="async" className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] ${cardAspect[project.cardAspect] ?? cardAspect['standard']}`} /></Link></div>
          <div className="flex min-w-0 flex-col justify-center"><h3 className="text-balance text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">{project.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{project.description}</p>
            <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-2"><div><p className="mono-label mb-2 text-primary">Problem</p><p className="text-sm leading-6 text-muted-foreground">{project.problem}</p></div><div><p className="mono-label mb-2 text-primary">Solution</p><p className="text-sm leading-6 text-muted-foreground">{project.solution}</p></div></div>
            <div className="mt-5 border-t border-line pt-5"><p className="mono-label mb-2 text-primary">My contribution</p><p className="text-sm leading-6 text-muted-foreground">{project.contribution}</p></div>
            <div className="mt-5 border-t border-line pt-5"><p className="mono-label mb-2 text-primary">Technology stack</p><p className="font-mono text-xs leading-6 text-muted-foreground">{project.tags.join("  ·  ")}</p></div>
            <div className="mt-5 border-t border-line pt-5"><p className="mono-label mb-3 text-primary">Architecture</p><p className="font-mono text-xs leading-6 text-muted-foreground">{project.architecture.join("  →  ")}</p></div>
            <div className="mt-5"><ProjectActions slug={project.slug} /></div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}