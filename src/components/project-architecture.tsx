import { ArrowDown } from "lucide-react";

export function ProjectArchitecture({ steps }: { steps: string[] }) {
  return <ol aria-label="Project architecture" className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, index) => <li key={step} className="relative flex min-h-24 min-w-0 items-start gap-4 border-l border-primary/50 py-4 pl-4">
      <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
      <p className="max-w-48 text-sm font-medium leading-6 text-foreground md:text-base">{step}</p>
      {index < steps.length - 1 && <ArrowDown aria-hidden="true" size={16} className="absolute bottom-1 left-4 text-primary" />}
    </li>)}
  </ol>;
}