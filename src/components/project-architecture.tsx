import { ArrowDown, ArrowRight } from "lucide-react";

export function ProjectArchitecture({ steps }: { steps: string[] }) {
  return <ol aria-label="Project architecture" className="grid gap-x-3 lg:grid-cols-8">
    {steps.map((step, index) => <li key={step} className="relative flex min-h-20 min-w-0 items-start gap-4 border-l border-primary/50 py-4 pl-4 lg:min-h-32 lg:flex-col lg:gap-3 lg:border-l-0 lg:border-t lg:pl-0 lg:pr-3">
      <span className="shrink-0 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
      <p className="min-w-0 text-sm font-medium leading-6 text-foreground lg:break-words">{step}</p>
      {index < steps.length - 1 && <><ArrowDown aria-hidden="true" size={16} className="absolute bottom-1 left-4 text-primary lg:hidden" /><ArrowRight aria-hidden="true" size={16} className="absolute right-0 top-4 hidden text-primary lg:block" /></>}
    </li>)}
  </ol>;
}