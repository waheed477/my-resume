import { useState } from "react";
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
 *   LEFT  (text-dominant) → status pill · greeting · name · role
 *                           · resume-aligned subtitle · typewriter
 *                           designation · CTAs · socials
 *
 *   RIGHT (ProfileCard)   → tilted framed portrait card with photo
 *                           · name + role + tagline · education ·
 *                           email · hand-signed signature at the
 *                           bottom · credit-line footer.
 *
 * Title "MERN Stack Developer" stays EXACTLY as the resume reads.
 * The personalised tagline ("Full-stack MERN · AI/LLM specialty ·
 * shipping in production since 2023") lives in
 * personalInfo.description and is shown as a subtitle on both the
 * hero left column and the ProfileCard.
 *
 * Tilt fix: The earlier `style={{ transform: 'rotate(-3deg)' }}`
 * inline rule beat Tailwind's `group-hover:rotate-0` by CSS
 * specificity, so the hover never straightened the card.
 * We now drive the rotation with React state so the inline-style
 * override is gone, and the hover tilt effect actually works.
 *
 * Signature layout: signature is at the BOTTOM of the card, just
 * above the credit-line footer, where it reads as an authentic
 * pen-on-paper sign-off after every other field (i.e. a person
 * who just claimed everything also signed the claim).
 *
 * Education wrap: the InfoRow used Tailwind `truncate` which clips
 * "Computer Science · University of Agriculture, Faisalabad" to a
 * single ellipsis line. That field is already known to the reader
 * (and is in the headline cards of /education and /experience);
 * we let it wrap onto 2 lines instead of clipping.
 *
 * Hero name prominence: "Hi, I'm" stays on one line and the
 * name "Waheed Aslam" wraps to its own block so salutation and
 * subject both breathe at their own scale.
 */
export default function HeroSection() {
  const { personalInfo, socialLinks } = personalData;

  const heroBg = "/images/abstract_technology__e685e5a8.jpg";
  const profileImg = "/images/profile-photo.jpg";
  const signatureImg = "/images/signature.png";
  const resumePdf = "/Waheed-Aslam-Resume.pdf";

  // Order matters: hardest-hitting specialism lands first.
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

            {/* Greeting — "Hi, I'm" stays small on its own line,
                name "Waheed Aslam" gets the full primary rotation
                on its own line below. */}
            <h1
              className="font-serif font-bold leading-tight mb-0"
              data-testid="text-hero-title"
            >
              <span className="block text-2xl md:text-3xl text-muted-foreground font-medium mb-2">
                Hi, I'm
              </span>
              <span
                className="block text-4xl md:text-5xl lg:text-6xl text-primary"
                data-testid="text-hero-name"
              >
                {personalInfo.name}
              </span>
            </h1>

            {/* Static title line stays exactly as resume reads it */}
            <p
              className="text-xl md:text-2xl font-semibold text-primary mt-4 mb-2"
              data-testid="text-hero-title-main"
            >
              {personalInfo.title}
            </p>

            {/* Resume-aligned subtitle fortifies title. Drives
                keyword match for the AI/LLM search recruiters
                actually run. */}
            {personalInfo.description && (
              <p
                className="text-sm md:text-base text-muted-foreground font-medium mb-6 max-w-xl mx-auto lg:mx-0"
                data-testid="text-hero-tagline"
              >
                {personalInfo.description}
              </p>
            )}

            {/* Typewriter designations */}
            <div className="h-9 md:h-10 mb-8 flex items-center justify-center lg:justify-start">
              <TypewriterDesignations
                rotations={designationRotations}
                data-testid="designation-tags"
              />
            </div>

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
              signature={signatureImg}
              name={personalInfo.name}
              role={personalInfo.title}
              description={personalInfo.description}
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
      <span className="inline-block min-w-[16ch]">
        {text}
        <span
          className="ml-0.5 inline-block h-5 w-[2px] align-middle bg-primary motion-safe:animate-cursor-blink motion-reduce:opacity-0"
          aria-hidden="true"
          data-testid="typewriter-cursor"
        />
      </span>
      <span className="sr-only">
        Currently highlighting: {rotations[index]}
      </span>
    </p>
  );
}

/* ──────────────────────────────────────────────────────────────
   ProfileCard
   ──────────────────────────────────────────────────────────────
   Premium business-card-style framed portrait. The whole card
   reacts to mouseenter / mouseleave — this was previously
   driven by Tailwind's `group-hover:rotate-0` against an inline
   `transform: rotate(-3deg)` style. The inline style had higher
   specificity and won every time, so hover did nothing. We now
   drive rotation with React state out of a small useState.
   ────────────────────────────────────────────────────────────── */
interface ProfileCardProps {
  photo: string;
  signature: string;
  name: string;
  role: string;
  description?: string;
  email: string;
}

function ProfileCard({
  photo,
  signature,
  name,
  role,
  description,
  email,
}: ProfileCardProps) {
  const [isTilted, setIsTilted] = useState(true);

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

      <div
        onMouseEnter={() => setIsTilted(false)}
        onMouseLeave={() => setIsTilted(true)}
        className={cn(
          "relative w-72 sm:w-80 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl motion-reduce:transition-none",
          "transition-transform duration-500 ease-out",
          isTilted ? "-rotate-3" : "rotate-0",
        )}
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

        {/* Name + role + tagline */}
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
          {description && (
            <p
              className="text-[10.5px] mt-2 italic text-muted-foreground/70 leading-snug"
              data-testid="profile-card-tagline"
            >
              {description}
            </p>
          )}
        </div>

        {/* Education + Email — wraps (no truncate) */}
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

        {/* Hand-signed signature at the bottom of the card */}
        <div
          className="px-6 pb-4"
          data-testid="profile-card-signature-block"
        >
          <div
            aria-hidden="true"
            className="mb-2 border-t border-dashed border-border/80"
          />
          <img
            src={signature}
            alt={`Author's signature: ${name}`}
            className="block w-full max-h-14 object-contain"
            data-testid="profile-card-signature"
          />
          <div className="mt-1 text-center">
            <span
              className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/70 font-semibold"
              data-testid="profile-card-sig-label"
            >
              signed
            </span>
          </div>
        </div>

        {/* Footer strip — credit-line */}
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
          "text-sm font-medium mt-0.5 leading-snug",
          mono && "font-mono text-xs",
        )}
      >
        {value}
      </p>
    </div>
  );
}
