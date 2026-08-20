import { Languages } from "lucide-react";
import skillsData from "@/data/skills.json";

/**
 * LanguagesSkillsSection
 * ────────────────────────────────────────────────────────────────
 * Compact "Languages I speak" strip built directly under About.
 * Helps international / remote recruiters understand communication
 * readiness without making it a full section.
 */
export default function LanguagesSkillsSection() {
  // Pulled from the skills JSON so we don't duplicate data.
  const languages = skillsData.languages;

  return (
    <section
      id="languages"
      className="py-10 md:py-12 bg-background border-y border-border/40"
      aria-label="Languages spoken"
      data-testid="section-languages"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Languages className="h-5 w-5" aria-hidden="true" />
            <span
              className="text-sm font-medium uppercase tracking-widest"
              data-testid="text-languages-heading"
            >
              Languages
            </span>
          </div>

          <div
            className="flex flex-wrap justify-center gap-4"
            data-testid="languages-grid"
          >
            {languages.map((lang, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-card/50"
                data-testid={`language-${lang.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="font-medium text-sm">{lang.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium"
                  data-testid={`language-level-${i}`}
                >
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
