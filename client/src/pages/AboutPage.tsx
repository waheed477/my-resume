import { Mail, Download, Languages, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SiteLayout from "@/components/SiteLayout";
import personalData from "@/data/personal.json";
import coreStrengthsData from "@/data/coreStrengths.json";
import skillsData from "@/data/skills.json";
import personalityData from "@/data/personality.json";
import { iconMap } from "@/data/iconMapping";

export default function AboutPage() {
  const { personalInfo } = personalData;
  const { strengths } = coreStrengthsData;
  const { languages } = skillsData;
  const { profile } = personalityData;

  return (
    <SiteLayout>
      <div className="pt-4">
        {/* ── Page header ──────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <p
              className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
              data-testid="about-eyebrow"
            >
              About
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-bold mb-4"
              data-testid="about-page-title"
            >
              The 3-line story behind the work.
            </h1>
            <p
              className="text-muted-foreground text-lg max-w-2xl"
              data-testid="about-page-tagline"
            >
              I'm a MERN-stack developer building production SaaS with a
              hands-on bias for AI/LLM integration. Two years shipping at
              Netlink Solutions, three deployed products, and a clean
              documentation habit.
            </p>
          </div>
        </section>

        <Separator />

        {/* ── Bio ──────────────────────────────────────────────── */}
        <section id="about-bio" className="py-12 md:py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            {personalInfo.bio.map((paragraph, index) => (
              <div
                key={index}
                className="relative pl-5 border-l-2 border-primary/40"
                data-testid={`about-page-paragraph-${index}`}
              >
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {paragraph}
                </p>
              </div>
            ))}

            {/* ── Outside-code interests (humanise) ────────────── */}
            <div
              className="mt-8 p-5 rounded-lg border border-border/60 bg-card/30 flex items-start gap-3"
              data-testid="about-page-interests"
            >
              <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Outside code</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.interests[0]}.
                </p>
              </div>
            </div>

            {/* ── Resume download CTA ───────────────────────────── */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="/Waheed-Aslam-Resume.pdf"
                download
                aria-label="Download CV as PDF"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 no-underline",
                )}
                data-testid="about-page-download-cv"
              >
                <Download className="h-4 w-4" />
                Download CV (PDF)
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-primary transition underline-offset-2 hover:underline"
                >
                  {personalInfo.email}
                </a>
              </div>
              <p
                className="text-xs text-muted-foreground/70 ml-auto"
                data-testid="about-page-last-updated"
              >
                CV last updated · {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Languages I speak ──────────────────────────────── */}
        <section
          id="about-languages"
          className="py-12 md:py-16 bg-background"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Languages className="h-5 w-5 text-primary" />
              <h2
                className="text-2xl font-semibold"
                data-testid="about-page-languages-title"
              >
                Languages I speak
              </h2>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              data-testid="about-page-languages-grid"
            >
              {languages.map((lang, i) => (
                <Card
                  key={i}
                  className="p-4 hover-elevate transition-all duration-300"
                  data-testid={`about-page-language-${lang.name.toLowerCase()}`}
                >
                  <p className="font-semibold text-base">{lang.name}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {lang.level}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Core strengths ──────────────────────────────────── */}
        <section
          id="strengths"
          className="py-12 md:py-16 bg-muted/20"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="text-2xl font-semibold mb-2"
              data-testid="about-page-strengths-title"
            >
              Core strengths
            </h2>
            <p className="text-muted-foreground mb-8">
              What makes my work land faster and stay up longer.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-testid="about-page-strengths-grid"
            >
              {strengths.map((item, index) => {
                const IconComponent =
                  iconMap[item.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={index}
                    className="p-5 hover-elevate transition-all duration-300"
                    data-testid={`about-page-strength-${index}`}
                  >
                    <div className="flex items-start gap-3">
                      {IconComponent && (
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <IconComponent
                            className="h-5 w-5 text-primary"
                            aria-hidden
                          />
                        </div>
                      )}
                      <div>
                        <h3
                          className="font-semibold text-base mb-1"
                          data-testid={`about-page-strength-title-${index}`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground leading-relaxed"
                          data-testid={`about-page-strength-description-${index}`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={() => (window.location.href = "/projects")}
                data-testid="about-page-jump-to-projects"
              >
                See those strengths in the projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
