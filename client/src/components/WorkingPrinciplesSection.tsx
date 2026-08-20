import { Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import principlesData from "@/data/principles.json";
import { iconMap } from "@/data/iconMapping";

/**
 * WorkingPrinciplesSection
 * ────────────────────────────────────────────────────────────────
 * "How I work" manifesto strip. Renders 6 compact, scannable
 * cards. Senior devs are interviewed against principles like
 * these — putting them up top of a portfolio is a fast filter
 * for engineering managers.
 */
export default function WorkingPrinciplesSection() {
  const { intro, tagline, principles } = principlesData;

  return (
    <section
      id="how-i-work"
      className="py-16 md:py-24 bg-background"
      aria-labelledby="how-i-work-heading"
      data-testid="section-how-i-work"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2
            id="how-i-work-heading"
            className="font-serif text-3xl md:text-4xl font-semibold text-center"
            data-testid="text-how-i-work-title"
          >
            {intro}
          </h2>
        </div>
        <p
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
          data-testid="text-how-i-work-tagline"
        >
          {tagline}
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="grid-principles"
        >
          {principles.map((p, i) => {
            const IconComponent =
              iconMap[p.icon as keyof typeof iconMap];
            return (
              <Card
                key={i}
                className="p-6 hover-elevate transition-all duration-300 flex flex-col"
                data-testid={`principle-${i}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {IconComponent && (
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <IconComponent
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <h3
                    className="font-semibold text-base leading-snug pt-1"
                    data-testid={`principle-title-${i}`}
                  >
                    {p.title}
                  </h3>
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-testid={`principle-description-${i}`}
                >
                  {p.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
