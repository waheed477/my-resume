import { Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/data/iconMapping";
import stackData from "@/data/stackRationale.json";

/**
 * StackRationaleSection
 * ────────────────────────────────────────────────────────────────
 * "Why this stack" – an engineer–to-engineer rationale for the
 * choices behind this very portfolio. Recruiters hiring engineers
 * care as much about how someone chooses a stack as what they
 * chose.
 *
 * Rendered as alternating left/right rows on desktop to keep the
 * content scannable.
 */
export default function StackRationaleSection() {
  const { intro, tagline, points } = stackData;

  return (
    <section
      id="stack-rationale"
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="stack-rationale-heading"
      data-testid="section-stack-rationale"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2
            id="stack-rationale-heading"
            className="font-serif text-3xl md:text-4xl font-semibold text-center"
            data-testid="text-stack-rationale-title"
          >
            {intro}
          </h2>
        </div>
        <p
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
          data-testid="text-stack-rationale-tagline"
        >
          {tagline}
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="space-y-4 max-w-3xl mx-auto" data-testid="grid-stack">
          {points.map((p, i) => {
            const IconComponent =
              iconMap[p.icon as keyof typeof iconMap];
            return (
              <Card
                key={i}
                className="p-5 hover-elevate transition-all duration-300"
                data-testid={`stack-card-${i}`}
              >
                <div className="flex items-start gap-4">
                  {IconComponent && (
                    <div className="p-2 rounded-md bg-primary/10 shrink-0 mt-0.5">
                      <IconComponent
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3
                        className="font-semibold text-base"
                        data-testid={`stack-title-${i}`}
                      >
                        {p.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase tracking-wider"
                      >
                        decision
                      </Badge>
                    </div>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed"
                      data-testid={`stack-description-${i}`}
                    >
                      {p.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <p
          className="text-center text-xs text-muted-foreground italic mt-10 leading-relaxed"
          data-testid="text-stack-source"
        >
          This site ships from <code>main</code> through a static-build
          GitHub Action — every byte is in version control, every push is
          a deploy.
        </p>
      </div>
    </section>
  );
}
