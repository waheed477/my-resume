import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SiteLayout from "@/components/SiteLayout";
import experienceData from "@/data/experience.json";
import { Link } from "react-router-dom";

/**
 * ExperiencePage  ·  /experience
 * ────────────────────────────────────────────────────────────────
 * Phase-3 deliverable. A genuine timeline surfacing Netlink
 * Solutions as the active role (Feb 2023 → Apr 2025), each
 * achievement bullet as a numbered dashboard row, plus a
 * career-at-a-glance footer (years / projects / tests in CI).
 */
export default function ExperiencePage() {
  const { experience } = experienceData;

  return (
    <SiteLayout>
      <div className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          {/* Header */}
          <p
            className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
            data-testid="experience-eyebrow"
          >
            Experience
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            data-testid="experience-page-title"
          >
            Where I've shipped production code.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12">
            Two years at Netlink Solutions owning full-stack features across
            AI/LLM, payments, and real-time systems — plus a portfolio of
            independent SaaS products I build and operate on the side.
          </p>

          {/* One role (Netlink Solutions) — current */}
          <article
            className="mb-12"
            data-testid="experience-role"
          >
            <Card className="relative overflow-hidden">
              {/* Current role ribbon */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Recent</span>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-md bg-primary/10 shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2
                      className="text-2xl font-semibold"
                      data-testid="experience-role-title"
                    >
                      {experience.role}
                    </h2>
                    <p
                      className="text-lg text-primary font-medium"
                      data-testid="experience-role-company"
                    >
                      {experience.company}
                    </p>
                  </div>
                </div>

                {/* Meta: dates + location */}
                <div
                  className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-6"
                  data-testid="experience-role-meta"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {experience.startDate} – {experience.endDate} ·{" "}
                    {experience.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {experience.location}
                  </span>
                </div>

                {/* Achievement bullets */}
                <ol className="space-y-3" data-testid="experience-achievements">
                  {experience.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3"
                      data-testid={`experience-achievement-${i}`}
                    >
                      <span className="mt-1 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 pt-6 border-t border-border/60">
                  <Link
                    to="/projects"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "no-underline gap-2 text-muted-foreground hover:text-primary",
                    )}
                    data-testid="experience-jump-to-projects"
                  >
                    See how those skills show up in the projects →
                  </Link>
                </div>
              </div>
            </Card>
          </article>

          {/* Career at a glance */}
          <section
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            data-testid="experience-stats"
          >
            <StatCard value="2" label="Years at Netlink Solutions" />
            <StatCard value="3" label="Deployed SaaS apps" />
            <StatCard value="51" label="Tests in CI (Jest + Vitest)" />
            <StatCard value="5" label="AI agents in production" />
          </section>

          {/* Side projects blurb */}
          <Card
            className="mt-10 p-6 bg-card/30"
            data-testid="experience-side-projects"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Independent side builds
            </p>
            <p className="text-base text-foreground leading-relaxed">
              Outside Netlink Solutions, I built and run{" "}
              <Link
                to="/projects"
                className="text-primary font-medium hover:underline"
              >
                Hunting Goals
              </Link>
              ,{" "}
              <Link
                to="/projects"
                className="text-primary font-medium hover:underline"
              >
                SEO Operator
              </Link>
              , and{" "}
              <Link
                to="/projects"
                className="text-primary font-medium hover:underline"
              >
                MindMate
              </Link>{" "}
              — three deployed SaaS apps spanning real-time scraping, async
              pipelines, and fine-tuned Llama 2 inference.
            </p>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card
      className="p-4 text-center hover-elevate"
      data-testid={`experience-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary font-mono">
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1 leading-tight">
        {label}
      </div>
    </Card>
  );
}
