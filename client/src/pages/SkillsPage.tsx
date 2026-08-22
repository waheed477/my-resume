import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import skillsData from "@/data/skills.json";
import skillsProficiencyData from "@/data/skillsProficiency.json";
import personalityData from "@/data/personality.json";
import { iconMap } from "@/data/iconMapping";

/**
 * SkillsPage  ·  /skills
 * ────────────────────────────────────────────────────────────────
 * Phase-4 polish deliverable. Real capability matrix:
 *   1. MERN quartet + zero-padding stats
 *   2. Top-3 strongest callout
 *   3. Six categories (one-line summary each, with sub-skills)
 *   4. Proficiency bars (honest self-rated)
 *   5. Currently learning (differentiation + transparency)
 *   6. End navigation to /contact for hiring conversations
 */
export default function SkillsPage() {
  const { mernStack, categories } = skillsData;
  const skills = skillsProficiencyData.skills.slice().sort(
    (a, b) => b.score - a.score,
  );
  const top3 = skills.slice(0, 3);
  const { profile } = personalityData;

  return (
    <SiteLayout>
      <div className="pt-4">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
          {/* ── Header ────────────────────────────────────────── */}
          <header>
            <p
              className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
              data-testid="skills-eyebrow"
            >
              Skills
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-bold mb-4"
              data-testid="skills-page-title"
            >
              The stack I ship with.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Six categorised skill lists, twelve ranked entries, and what I'm
              sharpening next. Self-rated honestly — see a gap? I'll name it.
            </p>
          </header>

          {/* ── Top-3 strongest ───────────────────────────────── */}
          <section data-testid="skills-top-3">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                Where I'm strongest
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {top3.map((skill, i) => {
                const Icon =
                  iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={skill.name}
                    className="p-5 hover-elevate transition-all"
                    data-testid={`skill-top-${i}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {Icon && (
                        <div className="p-2 rounded-md bg-primary/10">
                          <Icon
                            className={`h-5 w-5 ${skill.color}`}
                            aria-hidden
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {skill.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {skill.level}
                        </p>
                      </div>
                      <span
                        className="text-2xl font-bold text-primary tabular-nums"
                        data-testid={`skill-top-score-${i}`}
                      >
                        {skill.score}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── MERN Stack core ──────────────────────────────── */}
          <section data-testid="skills-mern">
            <h2 className="text-xl font-semibold mb-5">MERN Stack core</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mernStack.map((skill, index) => {
                const Icon =
                  iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={index}
                    className="p-5 flex flex-col items-center gap-3 hover-elevate transition-all"
                    data-testid={`skills-mern-${index}`}
                  >
                    <Icon className={`h-10 w-10 ${skill.color}`} />
                    <p className="font-semibold text-center text-sm">
                      {skill.name}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── 22 categorized sub-skills — dense, scannable ── */}
          <section data-testid="skills-categories">
            <h2 className="text-xl font-semibold mb-5">
              Categories by production usage
            </h2>

            <div className="space-y-10">
              {categories.map((category, catIndex) => (
                <div key={catIndex} data-testid={`skills-category-${catIndex}`}>
                  <h3
                    className="text-base font-semibold mb-3 text-foreground"
                    data-testid={`skills-category-title-${catIndex}`}
                  >
                    {category.title}{" "}
                    <span className="text-xs text-muted-foreground font-normal ml-1">
                      · {category.skills.length} skills
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const Icon =
                        iconMap[skill.icon as keyof typeof iconMap];
                      return (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="px-3 py-1.5 gap-2 text-sm hover-elevate"
                          data-testid={`badge-skill-${catIndex}-${skillIndex}`}
                        >
                          {Icon && (
                            <Icon
                              className={`h-4 w-4 ${skill.color}`}
                              aria-hidden
                            />
                          )}
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Proficiency bars ──────────────────────────────── */}
          <section data-testid="skills-proficiency">
            <h2 className="text-xl font-semibold mb-5">
              Twelve ranked entries · 0–100
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Confidence reflects hands-on production usage, not certifications.
              Honest gaps are listed as a feature, not a bug.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, i) => {
                const Icon =
                  iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={skill.name}
                    className="p-4 hover-elevate"
                    data-testid={`skills-proficiency-${i}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {Icon && (
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <Icon
                            className={`h-4 w-4 ${skill.color}`}
                            aria-hidden
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {skill.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {skill.level}
                        </p>
                      </div>
                      <span className="text-base font-bold text-primary tabular-nums">
                        {skill.score}
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-label={`${skill.name} at ${skill.score}% confidence`}
                      aria-valuenow={skill.score}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
                    >
                      <div
                        className="h-full bg-primary transition-all duration-700 ease-out"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── Currently learning ───────────────────────────── */}
          <section data-testid="skills-learning">
            <div className="flex items-center gap-2 mb-5">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Currently learning</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Skills I'm actively deepening outside of work. I list them
              because the work I'd like next requires them.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.currentlyLearning.map((item, i) => (
                <Card
                  key={i}
                  className="p-4 hover-elevate flex items-start gap-3"
                  data-testid={`skills-learning-item-${i}`}
                >
                  <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm leading-snug">{item}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Soft skills corridor ──────────────────────────── */}
          <section data-testid="skills-soft">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">How I work day-to-day</h2>
            </div>
            <Card className="p-6 bg-card/30" data-testid="skills-soft-card">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">
                    Reaction within 24h
                  </strong>{" "}
                  on async messages, every business day.
                </li>
                <li>
                  <strong className="text-foreground">
                    Code mornings
                  </strong>{" "}
                  — deep work between 09:00 and 13:00 PKT with meetings
                  clustered in the afternoon.
                </li>
                <li>
                  <strong className="text-foreground">
                    PRs + review
                  </strong>{" "}
                  same business day when bandwidth allows, comments with
                  reasoned pushback not just stamp approvals.
                </li>
                <li>
                  <strong className="text-foreground">Async-first</strong> —
                  written by default; calls only for fast decisions.
                </li>
              </ul>
            </Card>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
