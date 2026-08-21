import { Compass, Timer, MessageSquare, GitBranch, CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import principlesData from "@/data/principles.json";
import stackData from "@/data/stackRationale.json";
import { iconMap } from "@/data/iconMapping";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * HowIWorkPage  ·  /how-i-work
 * ────────────────────────────────────────────────────────────────
 * Phase-4 polish deliverable.
 *   1. Page header
 *   2. Six working principles (from principles.json)
 *   3. Communication SLA card — response time, code-window,
 *      PR-review cadence
 *   4. Code-review flow diagram (3-step visual: Open PR →
 *      Reviewer pass → Merge)
 *   5. Stack rationale (from stackRationale.json) — four
 *      read-once cards explaining why each major piece
 *   6. End-of-page prompt to /contact
 */
export default function HowIWorkPage() {
  const { principles } = principlesData;
  const { stack } = stackData;

  return (
    <SiteLayout>
      <main className="pt-4">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
          {/* ── Header ──────────────────────────────────────── */}
          <header>
            <p
              className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
              data-testid="how-i-work-eyebrow"
            >
              How I work
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-bold mb-4"
              data-testid="how-i-work-page-title"
            >
              The principles that shape how I ship.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Six rules of thumb, an SLA card you can hold me to, and the
              stack rationales behind the systems that set us up for
              shipping instead of firefighting.
            </p>
          </header>

          {/* ── SLA card ────────────────────────────────────── */}
          <Card
            className="p-6 bg-card/40 border-primary/20"
            data-testid="how-i-work-sla"
          >
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2 rounded-md bg-primary/10">
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  You-can-hold-me-to card
                </h2>
                <p className="text-sm text-muted-foreground">
                  What I commit to when I'm on a team.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <SlaStat
                value="24h"
                label="Average async response time"
                helper="I lean 12h but never slip a day."
                icon={
                  <MessageSquare
                    className="h-4 w-4"
                    aria-hidden
                  />
                }
              />
              <SlaStat
                value="<24h"
                label="PR review turnaround"
                helper="Same business day on most days."
                icon={
                  <GitBranch
                    className="h-4 w-4"
                    aria-hidden
                  />
                }
              />
              <SlaStat
                value="09–13h"
                label="Deep-coding window"
                helper="PKT timezone. No meetings here."
                icon={
                  <Timer
                    className="h-4 w-4"
                    aria-hidden
                  />
                }
              />
            </div>
          </Card>

          {/* ── Code-review flow diagram ────────────────────── */}
          <section data-testid="how-i-work-flow">
            <h2 className="text-xl font-semibold mb-2">
              How a PR travels
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Three-step loop, every change-set, no shortcuts.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <FlowStep
                step="1"
                title="Open PR"
                description="Tiny PRs with descriptive titles, a short summary, and a 'why this matters' line at the top."
                pill="≤ 200 lines"
              />
              <FlowStep
                step="2"
                title="Reviewer pass"
                description="Within 24h. Line-by-line before approve, comments ask why-not-X not just lints."
                pill="Comments + suggestions"
              />
              <FlowStep
                step="3"
                title="Merge + ship"
                description="Squash-merge with the issue ID; CI is the gate, not the reviewer-says-ok ritual."
                pill="CI green = ship"
              />
            </div>
          </section>

          {/* ── 6 principles ─────────────────────────────────── */}
          <section data-testid="how-i-work-principles">
            <div className="flex items-center gap-2 mb-5">
              <Compass className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Working principles</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {principles.map((p, i) => {
                const Icon =
                  iconMap[p.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={i}
                    className="p-5 hover-elevate transition-all flex flex-col"
                    data-testid={`how-i-work-principle-${i}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {Icon && (
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <Icon
                            className="h-4 w-4 text-primary"
                            aria-hidden
                          />
                        </div>
                      )}
                      <h3
                        className="font-semibold text-base leading-snug pt-1"
                        data-testid={`how-i-work-principle-title-${i}`}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed flex-1"
                      data-testid={`how-i-work-principle-description-${i}`}
                    >
                      {p.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── Stack rationale ──────────────────────────────── */}
          <section data-testid="how-i-work-stack">
            <h2 className="text-xl font-semibold mb-2">
              Stack rationale — what I chose and why
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Engineer-to-engineer reasoning behind the major choices for
              this very site.
            </p>

            <div className="space-y-3">
              {stack.map((p, i) => {
                const Icon =
                  iconMap[p.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={i}
                    className="p-5 hover-elevate transition-all"
                    data-testid={`how-i-work-stack-${i}`}
                  >
                    <div className="flex items-start gap-4">
                      {Icon && (
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <Icon
                            className="h-5 w-5 text-primary"
                            aria-hidden
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3
                            className="font-semibold text-base"
                            data-testid={`how-i-work-stack-title-${i}`}
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
                          data-testid={`how-i-work-stack-description-${i}`}
                        >
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── Footer proof ──────────────────────────────── */}
          <Card
            className="p-6 bg-card/30 flex items-start gap-3"
            data-testid="how-i-work-shipped-via"
          >
            <CheckCircle2
              className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5"
              aria-hidden
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Three SaaS apps live with this same workflow — see them on{" "}
              <a
                href="/projects"
                className="text-primary font-medium underline-offset-2 hover:underline"
              >
                /projects
              </a>
              . End-to-end ownership, async-first, code mornings. Same rules.
            </p>
          </Card>
        </div>
      </main>
    </SiteLayout>
  );
}

function SlaStat({
  value,
  label,
  helper,
  icon,
}: {
  value: string;
  label: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="text-center p-4 rounded-md bg-background/50 border border-border/60"
      data-testid={`how-i-work-sla-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="inline-flex items-center gap-1.5 text-primary mb-2">
        {icon}
        <span className="text-2xl font-bold font-mono tabular-nums">
          {value}
        </span>
      </div>
      <div className="text-xs font-semibold mb-1">{label}</div>
      <div className="text-[10px] text-muted-foreground leading-tight">
        {helper}
      </div>
    </div>
  );
}

function FlowStep({
  step,
  title,
  description,
  pill,
}: {
  step: string;
  title: string;
  description: string;
  pill: string;
}) {
  return (
    <Card
      className="p-5 hover-elevate transition-all relative"
      data-testid={`how-i-work-flow-step-${step}`}
    >
      <div className="absolute top-3 right-3">
        <Badge
          variant="outline"
          className="text-[10px] uppercase tracking-wider"
        >
          {pill}
        </Badge>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
          {step}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
