import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Download,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import personalData from "@/data/personal.json";

/**
 * HeroSection
 * ────────────────────────────────────────────────────────────────
 * Two-column hero.
 *
 *   LEFT  (text-dominant) → greeting · name · designation · tags ·
 *                           short bio · CTAs · socials
 *
 *   RIGHT (ProfileCard)   → framed headshot with name · role ·
 *                           education · email straddled beneath.
 *                           Tilted slightly; hover straightens it.
 *
 * On mobile the columns stack vertically: text first (top), card
 * second (bottom) — conventional reading order.
 */
export default function HeroSection() {
  const { personalInfo, socialLinks } = personalData;

  const heroBg = "/images/abstract_technology__e685e5a8.jpg";
  const profileImg = "/images/profile-photo.jpg";
  const resumePdf = "/Waheed-Aslam-Resume.pdf";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Designation tagline pills — pulled directly from the resume so the
  // hero is resume-aligned, never editorialised.
  const designationTags = [
    "Full-Stack MERN",
    "AI / LLM Integration",
    "Real-Time Systems",
    "SaaS Architect",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
      {/* Subtle right-side gradient so the card sits on a slightly
          different tonal background than the text. */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* ───────────────────────────────────────────────────────
              LEFT COLUMN — text + CTAs
             ─────────────────────────────────────────────────────── */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Availability badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span
                className="text-foreground/90"
                data-testid="text-availability"
              >
                Open to opportunities · Available immediately
              </span>
            </div>

            {/* Greeting + Name */}
            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              data-testid="text-hero-title"
            >
              Hi, I'm{" "}
              <span className="text-primary">{personalInfo.name}</span>
            </h1>

            {/* Designation prominent */}
            <p
              className="text-2xl md:text-3xl font-semibold text-primary mb-5"
              data-testid="text-hero-title-main"
            >
              {personalInfo.title}
            </p>

            {/* Designation tags — short, scannable, resume-aligned */}
            <div
              className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start"
              data-testid="designation-tags"
            >
              {designationTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 border border-border/60 text-secondary-foreground font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short bio — condensed 2-sentence version of the resume */}
            <p
              className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              data-testid="text-hero-bio"
            >
              I design and ship full-stack, AI-powered SaaS platforms — from
              realtime market intelligence to SEO automation and healthcare.
              End-to-end ownership from database architecture to production
              deployment, with hands-on Groq AI, fine-tuned Llama 2, Stripe,
              and Socket.io integrations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md"
                onClick={() => scrollToSection("contact")}
                data-testid="button-contact-me"
              >
                Contact Me
              </Button>
              <a
                href={resumePdf}
                download
                aria-label="Download CV as PDF"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "backdrop-blur-md gap-2 no-underline",
                )}
                data-testid="button-download-cv"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => window.open(socialLinks.github, "_blank")}
                aria-label="Visit GitHub profile"
                data-testid="button-github"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => window.open(socialLinks.linkedin, "_blank")}
                aria-label="Visit LinkedIn profile"
                data-testid="button-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() =>
                  window.open(`mailto:${socialLinks.email}`, "_blank")
                }
                aria-label="Send an email"
                data-testid="button-email"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────
              RIGHT COLUMN — ProfileCard (tilted, premium)
             ─────────────────────────────────────────────────────── */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <ProfileCard
              photo={profileImg}
              name={personalInfo.name}
              role={personalInfo.title}
              email={personalInfo.email}
            />
          </div>
        </div>

        {/* Scroll-down arrow */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll to about section"
          data-testid="button-scroll-down"
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </button>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ProfileCard
   ────────────────────────────────────────────────────────────────
   A framed portrait card designed to read like a premium business
   card, not a student ID. Replaces the earlier "Student Developer
   Card · Class of 2026" framing (which read as high-school
   memorabilia and undermined the senior-tier polish).

   Visual language:
     • Header strip is a single, subtle "MERN + AI" tag — the
       differentiating hard-skills he ships with.
     • Photo sits in portrait crop with a gradient ring and a
       holographic corner accent.
     • Name is dominant; role sits underneath as a quieter
       secondary label so the card reads like a real calling-card.
     • Education + email sit as dotted-divider rows in the lower
       half, the same visual idiom as the original.
     • Footer strip swaps the "2022 — 2026 · VALID" plaque for
       a developer-flavored credit line: "#shipping-since-2023"
       on the left (career start) and a "v.2026.08" version tag
       on the right (currently-maintained signal). No status
       pulse — that already lives up in the hero pill, no need
       to double up.
     • Tilted -3deg by default, hover straightens it to 0.
     • Honors prefers-reduced-motion via motion-reduce utilities.
   ────────────────────────────────────────────────────────────────── */
interface ProfileCardProps {
  photo: string;
  name: string;
  role: string;
  email: string;
}

function ProfileCard({ photo, name, role, email }: ProfileCardProps) {
  return (
    <div
      className="relative group select-none"
      data-testid="profile-card-wrapper"
    >
      {/* Depth shadow — sits behind the card to give a "card on a
          surface" feel. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-primary/20 blur-md"
      />

      {/* The card itself */}
      <div
        className="relative w-72 sm:w-80 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl transition-transform duration-500 ease-out group-hover:rotate-0 motion-reduce:transition-none"
        style={{ transform: "rotate(-3deg)" }}
        data-testid="profile-card"
      >
        {/* Header strip — single, subtle tech tag (no "Class of …" framing) */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-5 py-3.5 text-primary-foreground flex items-center justify-between">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.22em] opacity-95"
            data-testid="profile-card-tag"
          >
            MERN + AI
          </span>
          <span
            className="text-[10px] font-mono opacity-70"
            data-testid="profile-card-tag-meta"
          >
            v.2026.08
          </span>
        </div>

        {/* Photo — vertical crop so the face sits in the upper third */}
        <div className="px-6 pt-6 flex justify-center">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-primary/50 via-primary/20 to-transparent"
            />
            <img
              src={photo}
              alt={`${name} professional headshot`}
              className="relative w-40 h-52 sm:w-44 sm:h-56 rounded-xl border-2 border-background object-cover shadow-md"
              style={{ objectPosition: "50% 25%" }}
              loading="eager"
              decoding="async"
              data-testid="profile-card-photo"
            />
            {/* Holographic corner accent */}
            <div
              aria-hidden="true"
              className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-tr from-white/40 via-white/10 to-transparent border border-white/30 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Name + role — dominant name, quieter role underneath */}
        <div className="px-6 pt-5 text-center" data-testid="profile-card-identity">
          <p
            className="text-lg font-bold leading-tight"
            data-testid="profile-card-name"
          >
            {name}
          </p>
          <p
            className="text-xs text-muted-foreground mt-0.5"
            data-testid="profile-card-role"
          >
            {role}
          </p>
        </div>

        {/* Info block — education + email as dotted-divider rows */}
        <div className="px-6 pt-4 pb-4 space-y-3">
          <InfoRow
            label="Education"
            value="BSc CS · University of Agriculture, Faisalabad"
            data-testid="profile-card-row-education"
          />
          <InfoRow
            label="Email"
            value={email}
            mono
            data-testid="profile-card-row-email"
          />
        </div>

        {/* Footer strip — developer-flavored credit line (no enrollment dates,
            no VALID pulse; those read as high-school memorabilia) */}
        <div className="bg-muted/80 px-5 py-2.5 flex items-center justify-between text-xs">
          <span
            className="font-mono tracking-wider text-muted-foreground"
            data-testid="profile-card-shipping"
          >
            #shipping-since-2023
          </span>
          <span
            className="font-mono tracking-wider text-primary/80"
            data-testid="profile-card-handle"
          >
            @waheed477
          </span>
        </div>
      </div>

      {/* Tiny caption under the card — just the hover nudge, no "Class of" */ }
      <p
        className="text-center text-xs text-muted-foreground mt-3 italic opacity-80"
        data-testid="profile-card-caption"
      >
        Hover to straighten
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ProfileCard.InfoRow
   ────────────────────────────────────────────────────────────────
   Single dotted-divider row inside the card. Mono font on the
   email so it reads like a printed line on a real ID card.
   ────────────────────────────────────────────────────────────────── */
interface InfoRowProps {
  label: string;
  value: string;
  mono?: boolean;
  "data-testid"?: string;
}

function InfoRow({ label, value, mono, ...rest }: InfoRowProps) {
  return (
    <div className="border-b border-dashed border-border/80 pb-1.5" {...rest}>
      <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className={cn(
          "text-sm font-medium mt-0.5 truncate",
          mono && "font-mono text-xs",
        )}
      >
        {value}
      </p>
    </div>
  );
}
