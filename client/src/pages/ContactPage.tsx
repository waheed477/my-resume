import SiteLayout from "@/components/SiteLayout";
import { Mail, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ContactPage  ·  /contact
 * ────────────────────────────────────────────────────────────────
 * Phase-2 placeholder. Phase 3 will mount the actual form here
 * (ContactSection), add a timezone-aware greeting, a 'best
 * channel' card, a Calendly placeholder, and the subscribe / RSS
 * footer.
 */
export default function ContactPage() {
  return (
    <SiteLayout>
      <main className="pt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
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
            Let's work together.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            Have a project, an interview pipeline, or just want to chat
            about an AI/LLM approach? Send a message — I reply personally
            within 24 hours.
          </p>

          <div
            className="rounded-lg border border-dashed border-border/60 bg-card/30 p-8 text-center"
            data-testid="contact-placeholder"
          >
            <Mail className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Form lands in Phase 3</p>
            <p className="text-sm text-muted-foreground mb-6">
              Will render the same real (Formspree-ready) form that's
              currently in the home Contact section, plus timezone-aware
              greeting, best-channel guidance, and a Calendly placeholder.
            </p>
            <a
              href="mailto:waheeddd62@gmail.com"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2 no-underline",
              )}
              data-testid="contact-mailto"
            >
              Email waheeddd62@gmail.com instead
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
