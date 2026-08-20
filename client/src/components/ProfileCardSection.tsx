import { Mail, MapPin, Phone } from "lucide-react";
import personalData from "@/data/personal.json";

/**
 * ProfileCardSection
 * ────────────────────────────────────────────────────────────────
 * A signature "calling-card" strip placed between the Stats
 * section and the About narrative. Recruiters who scan a portfolio
 * for ~8 seconds will land here at peak attention, so this is
 * where the real human face, name, role, and direct contact live.
 *
 * Designed to feel like a visiting card handed over a table:
 *   • Professional photo with a decorative ring
 *   • Name + designation + direct email + location
 *   • Subtle gradient frame, generous breathing room
 */
export default function ProfileCardSection() {
  const { personalInfo } = personalData;
  const photo = "/my-resume/images/profile-photo.jpg";

  return (
    <section
      id="profile-card"
      className="py-12 md:py-16 bg-background"
      aria-label="Profile summary card"
      data-testid="section-profile-card"
    >
      <div className="max-w-5xl mx-auto px-6">
        <Card photo={photo} {...personalInfo} />
      </div>
    </section>
  );
}

interface CardProps {
  photo: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

function Card({ photo, name, title, email, phone, location }: CardProps) {
  return (
    <article
      className="relative mx-auto max-w-3xl"
      data-testid="profile-card-article"
    >
      {/* Decorative gradient halo behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent blur-2xl opacity-60"
      />

      {/* The card itself */}
      <div
        className="relative rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md shadow-xl overflow-hidden"
        data-testid="profile-card-frame"
      >
        {/* Top accent stripe */}
        <div
          aria-hidden="true"
          className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent"
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 p-6 md:p-8">
          {/* ── Photo column ── */}
          <div className="shrink-0 flex justify-center sm:justify-start">
            <div className="relative">
              {/* Decorative ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/60 via-primary/20 to-transparent blur-md opacity-80"
              />
              <img
                src={photo}
                alt={`Professional headshot of ${name}`}
                className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-background object-cover shadow-md"
                style={{ objectPosition: "50% 25%" }}
                loading="lazy"
                decoding="async"
                data-testid="profile-card-photo"
              />
            </div>
          </div>

          {/* ── Info column ── */}
          <div
            className="flex-1 text-center sm:text-left"
            data-testid="profile-card-info"
          >
            <h2
              className="font-serif text-2xl md:text-3xl font-bold leading-tight"
              data-testid="profile-card-name"
            >
              {name}
            </h2>
            <p
              className="text-base md:text-lg text-primary font-medium mt-1"
              data-testid="profile-card-title"
            >
              {title}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 justify-center sm:justify-start text-sm text-muted-foreground">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition"
                data-testid="profile-card-email"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{email}</span>
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 hover:text-primary transition"
                data-testid="profile-card-phone"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{phone}</span>
              </a>
              <span
                className="inline-flex items-center gap-1.5"
                data-testid="profile-card-location"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{location}</span>
              </span>
            </div>

            {/* Mini quick-fact strip */}
            <div
              className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start"
              data-testid="profile-card-facts"
            >
              <FactPill>2+ yrs production</FactPill>
              <FactPill>3 deployed SaaS</FactPill>
              <FactPill>Open to opportunities</FactPill>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FactPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full border border-border/70 bg-secondary/60 text-secondary-foreground"
      data-testid="profile-card-fact-pill"
    >
      {children}
    </span>
  );
}
