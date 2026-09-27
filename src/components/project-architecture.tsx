import { ArrowDown, ArrowRight } from "lucide-react";

export function ProjectArchitecture({ steps, featured = false }: { steps: string[]; featured?: boolean }) {
  return <ol aria-label="Project architecture" className={`grid gap-x-3 gap-y-5 ${featured ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
    {steps.map((step, index) => <li key={step} className="relative min-w-0 border-t border-primary/50 pt-3 pr-5 pb-4">
      <span className="font-mono text-[11px] text-primary">{String(index + 1).padStart(2, "0")}</span>
      <p className="mt-3 max-w-48 text-sm font-medium leading-6 text-foreground md:text-base">{step}</p>
      {index < steps.length - 1 && <>
        <ArrowDown aria-hidden="true" size={16} className="absolute bottom-0 right-1 text-primary sm:hidden" />
        <ArrowRight aria-hidden="true" size={16} className="absolute right-0 top-4 hidden text-primary sm:block" />
      </>}
    </li>)}
  </ol>;
}