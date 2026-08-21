import personalData from "@/data/personal.json";

/**
 * AboutSection
 * ────────────────────────────────────────────────────────────────
 * Pulled the resume bio into its proper home. The hero is now
 * lighter — only identity, role, CTAs — and the long-form
 * narrative lives here where it can breathe.
 * ──────────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const { personalInfo } = personalData;

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-about-title"
        >
          About Me
        </h2>
        <p
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
          data-testid="text-about-tagline"
        >
          The 3-line story behind the work.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto space-y-6">
          {personalInfo.bio.map((paragraph, index) => (
            <div
              key={index}
              className="relative pl-5 border-l-2 border-primary/40"
              data-testid={`text-about-paragraph-${index}`}
            >
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
