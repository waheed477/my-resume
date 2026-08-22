import SiteLayout from "@/components/SiteLayout";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ProjectsPage  ·  /projects
 * ────────────────────────────────────────────────────────────────
 * Phase-2 placeholder. Phase 3 will re-mount <ProjectsSection /> here
 * and add a tech-filter chip row + classification badges (OSS / Product).
 */
export default function ProjectsPage() {
  return (
    <SiteLayout>
      <div className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <p
            className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
            data-testid="projects-eyebrow"
          >
            Projects
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-testid="projects-page-title"
          >
            Three deployed SaaS products. Case studies attached.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            Hunting Goals · SEO Operator · MindMate. Each card opens a
            problem → approach → outcome case study.
          </p>

          <div
            className="rounded-lg border border-dashed border-border/60 bg-card/30 p-8 text-center"
            data-testid="projects-placeholder"
          >
            <Briefcase className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Project list lands in Phase 3</p>
            <p className="text-sm text-muted-foreground mb-6">
              Will render 3 project cards + filter chips + 'open case study'
              modals backed by case-studies.json.
            </p>
            <a
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2 no-underline",
              )}
              data-testid="projects-browse-home"
            >
              Browse the home page meanwhile
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
