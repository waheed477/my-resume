import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Sparkles,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SiteLayout from "@/components/SiteLayout";
import educationData from "@/data/education.json";
import personalityData from "@/data/personality.json";

/**
 * EducationPage  ·  /education
 * ────────────────────────────────────────────────────────────────
 * Phase-4 polish. The degree is one part of the page; the
 * larger story is what I keep learning *alongside* it. The
 *   page is honest in three ways senior reviewers notice:
 *     1. Reports the official university title
 *     2. Lists coursework covered
 *     3. Lists what I'm learning in parallel so the degree
 *        isn't taken to mean it's the last thing I ever
 *        looked at.
 */
export default function EducationPage() {
  const { education } = educationData;
  const { profile } = personalityData;

  return (
    <SiteLayout>
      <div className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12">
          {/* ── Header ──────────────────────────────────────── */}
          <header>
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
              The formal piece · and the learning alongside it.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              The degree is the spine, not the whole story. What I'm
              doing alongside it is where most of the momentum has come
              from.
            </p>
          </header>

          {/* ── Degree card ──────────────────────────────────── */}
          <article data-testid="education-degree">
            <Card className="p-6 md:p-8 hover-elevate transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-primary/10 shrink-0">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-2xl font-semibold mb-1"
                    data-testid="education-degree-title"
                  >
                    {education.degree}
                  </h2>
                  <p
                    className="text-lg text-primary font-medium mb-3"
                    data-testid="education-degree-institution"
                  >
                    {education.institution}
                  </p>
                  <div
                    className="flex flex-wrap gap-3 text-sm text-muted-foreground"
                    data-testid="education-degree-meta"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {education.startYear} – {education.endYear}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      Faisalabad, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </article>

          {/* ── Coursework chips ─────────────────────────────── */}
          <section data-testid="education-coursework">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Coursework covered</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Topics I covered during the degree, in some depth.
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.coursework.map((c, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm"
                  data-testid={`education-coursework-${i}`}
                >
                  {c}
                </Badge>
              ))}
            </div>
          </section>

          {/* ── Continuous learning — what I'm doing besides ─ */}
          <section data-testid="education-continuous">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                Continuous learning — alongside the degree
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              What I'm reading / practising / building in parallel —
              intentionally not part of any formal coursework.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {profile.currentlyLearning.map((item, i) => (
                <Card
                  key={i}
                  className="p-4 hover-elevate"
                  data-testid={`education-learning-${i}`}
                >
                  <p className="text-sm leading-snug">{item}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Outside-the-classroom ─────────────────────────── */}
          <section data-testid="education-extracurricular">
            <div className="flex items-center gap-2 mb-5">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Outside the classroom</h2>
            </div>
            <Card className="p-6 bg-card/30" data-testid="education-extracurricular-card">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Active contributor on{" "}
                    <a
                      href="https://github.com/waheed477"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium underline-offset-2 hover:underline"
                    >
                      GitHub
                    </a>
                    , pushing consistent commits across 3 production
                    deployments.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Published engineering notes on real-shipped
                    production work — see{" "}
                    <a
                      href="/writing"
                      className="text-primary font-medium underline-offset-2 hover:underline"
                    >
                      /writing
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Production ownership at Netlink Solutions for two
                    years — see{" "}
                    <a
                      href="/experience"
                      className="text-primary font-medium underline-offset-2 hover:underline"
                    >
                      /experience
                    </a>
                    .
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          {/* ── Footer note ────────────────────────────────── */}
          <div
            className="text-center text-sm text-muted-foreground"
            data-testid="education-footer"
          >
            Looking for the formal transcript or interim marks?{" "}
            <a
              href="/contact"
              className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                "p-0 text-primary",
              )}
            >
              Reach out →
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
