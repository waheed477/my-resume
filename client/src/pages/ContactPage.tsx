import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Github,
  Linkedin,
  CalendarPlus,
  MessageSquare,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import SiteLayout from "@/components/SiteLayout";
import { FORMSPREE_ENDPOINT, FALLBACK_EMAIL } from "@/config/contact";
import personalData from "@/data/personal.json";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * ContactPage  ·  /contact
 * ────────────────────────────────────────────────────────────────
 * Phase-4 polish. The full Formspree-ready form lives here so
 * recruiters can scroll /click to it from any other page via
 * the navbar. Time-of-day-aware greeting sits at the top so
 * the page reads as a person, not a static form binder.
 *
 * The form is wired to FORMSPREE_ENDPOINT if configured; if
 * not (it isn't yet on this machine), it falls back to opening
 * the user's mail client pre-filled, same behaviour as the
 * home /page ContactSection.
 */
export default function ContactPage() {
  const { personalInfo, socialLinks } = personalData;
  const { toast } = useToast();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const greeting = getGreeting(now);
  const tz = "PKT (UTC+5)";

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const openFallbackMail = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
    const body = encodeURIComponent(
      `From: ${data.name} <${data.email}>\n\n${data.message}`,
    );
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");

    if (FORMSPREE_ENDPOINT) {
      try {
        const r = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `Portfolio contact from ${form.name}`,
          }),
        });
        if (r.ok) {
          setSubmitState("success");
          toast({
            title: "Message sent!",
            description: "I'll reply within 24 hours.",
          });
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setSubmitState("idle"), 4000);
          return;
        }
        throw new Error(`Formspree non-OK: ${r.status}`);
      } catch {
        setSubmitState("error");
        toast({
          variant: "destructive",
          title: "Couldn't reach the server",
          description:
            "I'll open your mail client so the message still gets through.",
        });
        openFallbackMail(form);
        setTimeout(() => setSubmitState("idle"), 4000);
        return;
      }
    }

    setSubmitState("success");
    toast({
      title: "Opening your mail client…",
      description:
        "Form backend isn't configured yet — your mail app will send the message.",
    });
    openFallbackMail(form);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitState("idle"), 4000);
  };

  const contactChannels = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      best: "Recruiters · hiring managers",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
      best: "Time-sensitive calls",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: null,
      best: `Open to ${tz} async work`,
    },
  ];

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      url: socialLinks.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: socialLinks.linkedin,
    },
  ];

  return (
    <SiteLayout>
      <div className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12">
          {/* ── Header ──────────────────────────────────────── */}
          <header>
            <p
              className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
              data-testid="contact-eyebrow"
            >
              Contact
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-bold mb-4"
              data-testid="contact-page-title"
            >
              {greeting}. Let's work together.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Hiring managers, recruiters, fellow builders — pick whichever
              channel suits the conversation. I personally reply, not a
              shared inbox.
            </p>
          </header>

          {/* ── Direct contact channels ─────────────────────── */}
          <section data-testid="contact-direct">
            <h2 className="text-xl font-semibold mb-5">Direct contact</h2>

            <div className="grid sm:grid-cols-3 gap-3">
              {contactChannels.map((c, i) => {
                const inner = (
                  <Card
                    key={i}
                    className={cn(
                      "p-5 hover-elevate transition-all h-full",
                      c.href && "cursor-pointer",
                    )}
                    data-testid={`contact-direct-${c.label.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-md bg-primary/10 shrink-0">
                        <c.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        {c.label}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-1">{c.value}</p>
                    <p className="text-xs text-muted-foreground">{c.best}</p>
                  </Card>
                );
                return c.href ? (
                  <a
                    key={i}
                    href={c.href}
                    className="no-underline"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                );
              })}
            </div>
          </section>

          {/* ── Self-rendered form + workspace meta ─────────── */}
          <section data-testid="contact-form">
            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Send a message</h2>
                </div>

                <form onSubmit={submit} className="space-y-4" noValidate>
                  <Field label="Your name" htmlFor="name">
                    <Input
                      id="name"
                      autoComplete="name"
                      value={form.name}
                      placeholder="Your full name"
                      disabled={submitState === "submitting"}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                      minLength={2}
                      data-testid="contact-form-name"
                    />
                  </Field>

                  <Field label="Email" htmlFor="email">
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      placeholder="you@example.com"
                      disabled={submitState === "submitting"}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                      pattern="[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}"
                      data-testid="contact-form-email"
                    />
                  </Field>

                  <Field label="Message" htmlFor="message">
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="What would you like to talk about? (10+ chars)"
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      disabled={submitState === "submitting"}
                      required
                      minLength={10}
                      data-testid="contact-form-message"
                    />
                  </Field>

                  {/* Honeypot for spam bots */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={submitState === "submitting"}
                    data-testid="contact-form-submit"
                  >
                    {submitState === "submitting" && (
                      <>Sending…</>
                    )}
                    {submitState === "success" && (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Sent — I'll reply soon
                      </>
                    )}
                    {submitState === "error" && (
                      <>Try again</>
                    )}
                    {submitState === "idle" && (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </Button>

                  {!FORMSPREE_ENDPOINT && (
                    <p
                      className="text-xs text-muted-foreground text-center pt-1"
                      data-testid="contact-fallback-note"
                    >
                      ⚠ Form backend not configured — submit opens your mail
                      client.{" "}
                      <a
                        href={`https://github.com/waheed477/my-resume/blob/main/client/src/config/contact.ts`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary"
                      >
                        See setup
                      </a>
                      .
                    </p>
                  )}
                </form>
              </Card>

              {/* ── Workspace meta card ────────────────────── */}
              <div className="space-y-3">
                <Card
                  className="p-5 bg-card/40 border-primary/20"
                  data-testid="contact-meta"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">
                        Right now, in {tz}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {now.toLocaleString("en-US", {
                          weekday: "long",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          timeZone: "Asia/Karachi",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    I reply within 24 business hours. For tight deadlines,
                    put "URGENT" in the subject — your message will land
                    first thing.
                  </p>
                </Card>

                <Card
                  className="p-5 bg-card/40"
                  data-testid="contact-calendar-card"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarPlus className="h-4 w-4 text-primary" />
                    <p className="font-semibold text-sm">
                      Prefer a scheduled call?
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mb-3">
                    I'll wire up a Calendly-style scheduler here once I
                    commit to managed meetings. For now — send a message
                    proposing 2-3 slots.
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase tracking-wider"
                  >
                    Coming soon
                  </Badge>
                </Card>

                <Card
                  className="p-5 bg-card/40"
                  data-testid="contact-socials"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <p className="font-semibold text-sm">Find me elsewhere</p>
                  </div>
                  <div className="flex gap-2">
                    {socials.map((s) => (
                      <Button
                        key={s.label}
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(s.url, "_blank")}
                        className="gap-2 flex-1"
                        data-testid={`contact-social-${s.label.toLowerCase()}`}
                      >
                        <s.icon className="h-4 w-4" /> {s.label}
                      </Button>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* ── Better-channel guide ───────────────────────── */}
          <Card
            className="p-6 bg-card/30 border-border"
            data-testid="contact-channel-guide"
          >
            <h2 className="text-base font-semibold mb-3">
              Which channel fits your message?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Hiring pipeline</strong>{" "}
                → Email · quickest decision.
              </div>
              <div>
                <strong className="text-foreground">Recruiter outreach</strong>{" "}
                → LinkedIn DM · I check more often than email.
              </div>
              <div>
                <strong className="text-foreground">Quick technical chat</strong>{" "}
                → GitHub issue · dedicated & async.
              </div>
              <div>
                <strong className="text-foreground">Collaboration</strong> →
                Schedule a call via email first.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}

function getGreeting(now: Date): string {
  // Hard-coded to PKT (UTC+5). Server vs client boundary is irrelevant
  // because we display whatever the user's UTC clock reads after
  // rendering the date in the user's local timezone.
  const hourPkT = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Karachi",
    }).format(now),
  );
  if (hourPkT < 5) return "Burning midnight";
  if (hourPkT < 12) return "Good morning";
  if (hourPkT < 17) return "Good afternoon";
  return "Good evening";
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
