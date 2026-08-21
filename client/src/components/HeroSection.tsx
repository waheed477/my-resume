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
import { useTypewriter } from "@/hooks/use-typewriter";

/**
 * HeroSection
 * ────────────────────────────────────────────────────────────────
 * Two-column hero.
 *
 *   LEFT  (text-dominant) → status pill · greeting · name ·
 *                           role · typewriter designation ·
 *                           CTAs · socials
 *
 *   RIGHT (ProfileCard)   → tilted framed portrait card with
 *                           signature · name · role · education ·
 *                           email · credit-line footer.
 *
 * The bio intentionally lives in <AboutSection /> now — the
 * hero is for identity + impact, not exposition.
 */
export default function HeroSection() {
  const { personalInfo, socialLinks } = personalData;

  const heroBg = "/images/abstract_technology__e685e5a8.jpg";
  const profileImg = "/images/profile-photo.jpg";
  const signatureImg = "/images/signature.png";
  const resumePdf = "/Waheed-Aslam-Resume.pdf";

  // What the typewriter rotates through. Kept short so each
  // phase is legible from a glance. Order matters: hardest-hitting
  // specialism lands first.
  const designationRotations = [
    "Full-Stack MERN",
    "AI / LLM Integration",
    "Real-Time Systems",
    "SaaS Architect",
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

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
              LEFT COLUMN — identity + CTAs
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

            {/* Static designation line stays — it sets the chapter
                on first paint even before the typewriter starts. */}
            <p
              className="text-2xl md:text-3xl font-semibold text-primary mb-5"
              data-testid="text-hero-title-main"
            >
              {personalInfo.title}
            </p>

            {/* Typewriter designations */}
            <div className="h-9 md:h-10 mb-8 flex items-center justify-center lg:justify-start">
              <TypewriterDesignations
                rotations={designationRotations}
                data-testid="designation-tags"
              />
            </div>

            {/* CTAs (no long bio in the hero — it lives in About) */}
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
              signature={signatureImg}
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

/* ──────────────────────────────────────────────────────────────
   TypewriterDesignations
   ──────────────────────────────────────────────────────────────
   One line under the static role title that types the four
   designations in turn. Reduced-motion users see the first
   designation statically (handled inside useTypewriter).
   ────────────────────────────────────────────────────────────── */
interface TypewriterDesignationsProps {
  rotations: string[];
}

function TypewriterDesignations({ rotations }: TypewriterDesignationsProps) {
  const { text, index } = useTypewriter(rotations, {
    typeMs: 60,
    eraseMs: 30,
    holdMs: 1500,
    gapMs: 300,
  });

  return (
    <p
      className="text-base md:text-lg text-muted-foreground font-medium"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Reserve a fixed width so layout doesn't jump as text grows */}
      <span className="inline-block min-w-[16ch]">
        {text}
        {/* Blinking character cursor — pure CSS, no JS overhead */}
        <span
          className="ml-0.5 inline-block h-5 w-[2px] align-middle bg-primary motion-safe:animate-cursor-blink motion-reduce:opacity-0"
          aria-hidden="true"
          data-testid="typewriter-cursor"
        />
      </span>
      {/* sr-only fallback so screen readers still hear the current
          designation even when the visual is reduced/restored */}
      <span className="sr-only">
        Currently highlighting: {rotations[index]}
      </span>
    </p>
  );
}

/* ──────────────────────────────────────────────────────────────
   ProfileCard
   ──────────────────────────────────────────────────────────────
   Premium business-card-style framed portrait. Replaces the
   earlier student-ID framing entirely.
   ────────────────────────────────────────────────────────────── */
interface ProfileCardProps {
  photo: string;
  signature: string;
  name: string;
  role: string;
  email: string;
}

function ProfileCard({ photo, signature, name, role, email }: ProfileCardProps) {
  return (
    <div
      className="relative group select-none"
      data-testid="profile-card-wrapper"
    >
      {/* Depth shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-primary/20 blur-md"
      />

      {/* The card */}
      <div
        className="relative w-72 sm:w-80 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl transition-transform duration-500 ease-out group-hover:rotate-0 motion-reduce:transition-none"
        style={{ transform: "rotate(-3deg)" }}
        data-testid="profile-card"
      >
        {/* Header strip */}
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

        {/* Photo */}
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

        {/* Name + role */}
        <div
          className="px-6 pt-5 text-center"
          data-testid="profile-card-identity"
        >
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

        {/* Hand-signed signature divider */}
        <div
          className="px-6 pt-3"
          data-testid="profile-card-signature-block"
        >
          <img
            src={signature}
            alt={`Author's signature: ${name}`}
            className="block w-full max-h-12 object-contain"
            data-testid="profile-card-signature"
          />
          <div className="mt-1 border-t border-dashed border-border/80" />
        </div>

        {/* Info block */}
        <div className="px-6 pt-4 pb-4 space-y-3">
          <InfoRow
            label="Education"
            value="Computer Science · University of Agriculture, Faisalabad"
            data-testid="profile-card-row-education"
          />
          <InfoRow
            label="Email"
            value={email}
            mono
            data-testid="profile-card-row-email"
          />
        </div>

        {/* Footer strip */}
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

      {/* Tiny caption */}
      <p
        className="text-center text-xs text-muted-foreground mt-3 italic opacity-80"
        data-testid="profile-card-caption"
      >
        Hover to straighten
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ProfileCard.InfoRow
   ────────────────────────────────────────────────────────────── */
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
