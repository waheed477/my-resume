import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import testimonialsData from "@/data/testimonials.json";

export default function TestimonialsSection() {
  const { testimonials } = testimonialsData;

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-muted/30"
      aria-label="Testimonials"
      data-testid="section-testimonials"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-testimonials-title"
        >
          What People Say
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Feedback from team leads and product owners I've worked with.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <Card
              key={t.id}
              className="p-6 hover-elevate transition-all duration-300 flex flex-col"
              data-testid={`testimonial-${index}`}
            >
              <Quote className="h-8 w-8 text-primary/40 mb-3" aria-hidden="true" />
              <p
                className="text-muted-foreground mb-6 leading-relaxed flex-1"
                data-testid={`testimonial-quote-${index}`}
              >
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p
                  className="font-semibold"
                  data-testid={`testimonial-name-${index}`}
                >
                  {t.name}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  data-testid={`testimonial-role-${index}`}
                >
                  {t.role}
                  {t.company && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-primary font-medium">
                        {t.company}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <p
          className="text-center text-xs text-muted-foreground mt-8 italic"
          data-testid="text-testimonials-note"
        >
          Quotes will be replaced with verified recommendations from LinkedIn
          once captured.
        </p>
      </div>
    </section>
  );
}
