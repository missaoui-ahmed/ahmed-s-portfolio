import { ArrowDown, ArrowRight } from "lucide-react";
import { reveal } from "@/components/motion/motion-props";

export function ProjectArchitecture({ steps }: { steps: string[] }) {
  return <ol aria-label="Project architecture" className="grid gap-x-3 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-8 lg:gap-x-3">
    {steps.map((step, index) => <li key={step} {...reveal(index)} className="relative flex min-h-16 min-w-0 items-start gap-3 border-l border-primary/50 py-3 pl-4 sm:min-h-20 lg:min-h-32 lg:flex-col lg:gap-3 lg:border-l-0 lg:border-t lg:py-4 lg:pl-0 lg:pr-3">
      <span className="shrink-0 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
      <p className="min-w-0 text-sm font-medium leading-6 text-foreground lg:break-words">{step}</p>
      {index < steps.length - 1 && <><ArrowDown aria-hidden="true" size={14} className="absolute bottom-0 left-4 text-primary sm:hidden" /><ArrowRight aria-hidden="true" size={16} className="absolute right-0 top-4 hidden text-primary lg:block" /></>}
    </li>)}
  </ol>;
}