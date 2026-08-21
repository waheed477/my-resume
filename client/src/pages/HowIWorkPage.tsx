import SiteLayout from "@/components/SiteLayout";
import { Compass, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HowIWorkPage() {
  return (
    <SiteLayout>
      <main className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <p
            className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
            data-testid="how-i-work-eyebrow"
          >
            How I Work
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-testid="how-i-work-page-title"
          >
            The principles that shape how I ship.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            End-to-end ownership · async-first · tests-as-features ·
            document-the-decision · ship-small-then-refactor · code-mornings.
          </p>

          <div
            className="rounded-lg border border-dashed border-border/60 bg-card/30 p-8 text-center"
            data-testid="how-i-work-placeholder"
          >
            <Compass className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Principles + stack rationale land in Phase 4</p>
            <p className="text-sm text-muted-foreground mb-6">
              Will render 6 working principles, 4 stack-rationale cards, an
              SLA card, and a 3-step code-review flow diagram.
            </p>
            <a
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2 no-underline",
              )}
              data-testid="how-i-work-browse-home"
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
