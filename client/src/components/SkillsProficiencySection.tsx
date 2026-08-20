import { Card } from "@/components/ui/card";
import { iconMap } from "@/data/iconMapping";
import proficiencyData from "@/data/skillsProficiency.json";

/**
 * SkillsProficiencySection
 * ────────────────────────────────────────────────────────────────
 * A close-to-MERN-style proficiency strip that adds visual signal
 * to "I have shipped X". Honest ratings (0–100) for the core
 * stack. Senior devs are expected to have gaps; showing them
 * honestly reads as trustworthy.
 *
 * Progress bars use `role="progressbar"` + ARIA values so they're
 * announced correctly to screen readers, and they're `aria-hidden`
 * for the friendly flavor text below the bars.
 */

const TintByLevel = {
  expert: "bg-primary",
  proficient: "bg-primary/80",
  familiar: "bg-primary/60",
};

export default function SkillsProficiencySection() {
  const { skills } = proficiencyData;

  return (
    <section
      id="proficiency"
      className="py-16 md:py-24 bg-background"
      aria-label="Skill proficiency"
      data-testid="section-proficiency"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-proficiency-title"
        >
          Working Proficiency
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Honest self-rated levels for the stack I use to ship production
          features — from company-wide standards to skills I'm still
          deepening in.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const IconComponent =
              iconMap[skill.icon as keyof typeof iconMap];
            return (
              <Card
                key={skill.name}
                className="p-5 hover-elevate transition-all duration-300"
                data-testid={`proficiency-card-${index}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {IconComponent && (
                    <div className="p-2 rounded-md bg-primary/10">
                      <IconComponent
                        className={`h-5 w-5 ${skill.color}`}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{skill.name}</p>
                    <p
                      className="text-xs text-muted-foreground capitalize"
                      data-testid={`proficiency-level-${index}`}
                    >
                      {skill.level}
                    </p>
                  </div>
                  <span
                    className="text-lg font-bold text-primary tabular-nums"
                    aria-hidden="true"
                  >
                    {skill.score}
                  </span>
                </div>

                <div
                  role="progressbar"
                  aria-label={`${skill.name} proficiency`}
                  aria-valuenow={skill.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-2 w-full rounded-full bg-muted overflow-hidden"
                  data-testid={`proficiency-bar-${index}`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      TintByLevel[
                        skill.level as keyof typeof TintByLevel
                      ] || "bg-primary"
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </Card>
            );
          })}
        </div>

        <p
          className="text-center text-xs text-muted-foreground italic mt-8"
          data-testid="text-proficiency-note"
        >
          Confidence (0–100) reflects hands-on production use, not
          certifications.
        </p>
      </div>
    </section>
  );
}
