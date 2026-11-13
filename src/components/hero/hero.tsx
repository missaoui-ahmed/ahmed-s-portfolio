import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import cvAsset from "@/assets/Ahmed-Missaoui-CV.pdf.asset.json";
import { hero, signatureProject as signature } from "@/data/portfolio";
import { Pipeline } from "./pipeline";

export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-16 border-b border-line pt-16 sm:scroll-mt-20 sm:pt-[74px]"
    >
      <div className="page-shell pb-12 pt-9 sm:pb-16 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <h1 className="hero-headline">{hero.headline}</h1>
          <div>
            <p className="max-w-[46ch] text-[15px] leading-[1.65] text-muted-foreground sm:text-base lg:text-[17px]">
              {hero.intro}
            </p>
            <div className="mt-6 grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
              <Button variant="portfolio" size="lg" className="hero-action px-5" asChild>
                <a
                  href={cvAsset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Ahmed-Missaoui-CV.pdf"
                >
                  {hero.cvLabel} <Download aria-hidden="true" />
                </a>
              </Button>
              <Button variant="portfolioOutline" size="lg" className="hero-action px-5" asChild>
                <Link to="/projects/$slug" params={{ slug: signature.slug }}>
                  {hero.caseStudyLabel}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Pipeline
          steps={signature.architecture}
          label={hero.pipelineLabel}
          caption={hero.caption}
        />
      </div>
    </section>
  );
}
