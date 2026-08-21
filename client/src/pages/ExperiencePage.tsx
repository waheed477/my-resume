import SiteLayout from "@/components/SiteLayout";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ExperiencePage  ·  /experience
 * ────────────────────────────────────────────────────────────────
 * Phase-2 placeholder. Drop-in replacement in Phase 3 with a
 * timeline list driven by `experience.json` (Netlink Solutions,
 * Feb 2023 – Apr 2025) plus a "Stats at a glance" footer.
 */
export default function ExperiencePage() {
  return (
    <SiteLayout>
      <main className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <p
            className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
            data-testid="experience-eyebrow"
          >
            Experience
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-testid="experience-page-title"
          >
            Where I've shipped production code.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            Two years at Netlink Solutions owning full-stack features across
            AI/LLM, payments, and real-time systems — plus a portfolio of
            SaaS products I built and operate independently.
          </p>

          <div
            className="rounded-lg border border-dashed border-border/60 bg-card/30 p-8 text-center"
            data-testid="experience-placeholder"
          >
            <Briefcase className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Timeline lands in Phase 3</p>
            <p className="text-sm text-muted-foreground mb-6">
              Will render Netlink Solutions role + 6 achievement bullets +
              tech-stack chips + post-Netlink journey.
            </p>
            <a
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2 no-underline",
              )}
              data-testid="experience-browse-home"
            >
              Browse the home page meanwhile
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
