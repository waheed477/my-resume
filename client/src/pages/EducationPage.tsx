import SiteLayout from "@/components/SiteLayout";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EducationPage() {
  return (
    <SiteLayout>
      <main className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <p
            className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
            data-testid="education-eyebrow"
          >
            Education
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-testid="education-page-title"
          >
            The formal side · and what I keep learning on the side.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            BSc Computer Science at the University of Agriculture,
            Faisalabad (2022–2026), plus courses I'm doing in parallel so
            the degree isn't the last thing I ever learn.
          </p>

          <div
            className="rounded-lg border border-dashed border-border/60 bg-card/30 p-8 text-center"
            data-testid="education-placeholder"
          >
            <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Education timeline lands in Phase 4</p>
            <p className="text-sm text-muted-foreground mb-6">
              Will render degree card, continuous-learning chips, coursework
              highlights, and a row of extracurriculars / achievements.
            </p>
            <a
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2 no-underline",
              )}
              data-testid="education-browse-home"
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
