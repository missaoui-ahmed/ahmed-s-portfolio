import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectArchitecture } from "@/components/project-architecture";
import { contact, projects } from "@/data/portfolio";

const [featured, ...otherProjects] = projects;

function ProjectActions({ slug }: { slug: string }) {
  return <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
    <Button variant="portfolioText" asChild><Link to="/projects/$slug" params={{ slug }}>Read case study <ArrowUpRight /></Link></Button>
    <Button variant="portfolioText" className="text-muted-foreground hover:text-primary" asChild><a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="Ahmed Missaoui on GitHub (profile, not a project repository)"><Github /> GitHub profile <ArrowUpRight /></a></Button>
  </div>;
}

export function ProjectsSection() {
  return <section id="projects" className="relative scroll-mt-16 overflow-hidden border-b border-line py-20 md:py-28">
    <div aria-hidden="true" className="ambient-grid pointer-events-none absolute inset-x-0 top-0 h-[700px] opacity-20" />
    <div className="page-shell relative">
      <header className="mb-12 flex flex-col justify-between gap-5 border-b border-line pb-9 md:mb-16 md:flex-row md:items-end">
        <div><p className="mono-label mb-5 text-primary">05 / SELECTED WORK</p><h2 className="max-w-3xl text-4xl font-semibold leading-[1.14] md:text-5xl">Projects, in practice<span className="text-primary">.</span></h2></div>
        <p className="max-w-sm text-sm leading-7 text-muted-foreground">Engineering work from internships and a final-year project. Visuals are conceptual illustrations, not product screenshots.</p>
      </header>

      <article className="border-b border-line pb-16 md:pb-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-primary"><span>01 / FEATURED CASE STUDY</span><span>{featured.category}</span></div>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] lg:gap-14">
          <Link to="/projects/$slug" params={{ slug: featured.slug }} className="project-visual group block overflow-hidden rounded-sm border border-border" aria-label={`View case study: ${featured.title}`}><img src={featured.image} alt={featured.alt} width={1200} height={800} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></Link>
          <div className="min-w-0">
            <p className="mono-label mb-5 text-muted-foreground">VERMEG · AI FULL-STACK DEVELOPER INTERN</p>
            <h3 className="max-w-xl text-balance text-3xl font-semibold leading-[1.15] md:text-4xl xl:text-5xl">{featured.title}</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">{featured.description}</p>
            <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><div><p className="mono-label mb-2 text-primary">Problem</p><p className="text-sm leading-6 text-muted-foreground">{featured.problem}</p></div><div><p className="mono-label mb-2 text-primary">Solution</p><p className="text-sm leading-6 text-muted-foreground">{featured.solution}</p></div></div>
            <div className="mt-7 border-t border-line pt-6"><p className="mono-label mb-2 text-primary">My contribution</p><p className="text-sm leading-7 text-muted-foreground">{featured.contribution}</p></div>
            <div className="mt-7 border-t border-line pt-6"><p className="mono-label mb-3 text-primary">Technology stack</p><p className="font-mono text-xs leading-7 text-muted-foreground">{featured.tags.join("  ·  ")}</p></div>
            <div className="mt-6"><ProjectActions slug={featured.slug} /></div>
          </div>
        </div>
        <div className="mt-12 border-t border-line pt-7 md:mt-16"><div className="mb-7 flex flex-wrap items-baseline justify-between gap-2"><h4 className="text-lg font-semibold">Architecture</h4><p className="mono-label text-muted-foreground">DOCUMENT → STRUCTURED OUTPUT</p></div><ProjectArchitecture steps={featured.architecture} /></div>
      </article>

      <div className="divide-y divide-line">
        {otherProjects.map((project, index) => <article key={project.slug} className="grid gap-7 py-12 first:pt-14 md:gap-10 md:py-16 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="min-w-0"><div className="mb-5 flex items-center justify-between gap-3 font-mono text-xs text-primary"><span>0{index + 2} / CASE STUDY</span><span className="text-right">{project.category}</span></div><Link to="/projects/$slug" params={{ slug: project.slug }} className="project-visual group block overflow-hidden rounded-sm border border-border" aria-label={`View case study: ${project.title}`}><img src={project.image} alt={project.alt} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></Link></div>
          <div className="flex min-w-0 flex-col justify-center"><h3 className="text-balance text-2xl font-semibold leading-tight md:text-3xl">{project.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{project.description}</p>
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