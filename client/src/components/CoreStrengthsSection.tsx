import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import strengthsData from "@/data/coreStrengths.json";

export default function CoreStrengthsSection() {
  const { strengths } = strengthsData;

  return (
    <section id="strengths" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-strengths-title"
        >
          Core Strengths
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid sm:grid-cols-2 gap-6">
          {strengths.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover-elevate transition-all duration-300"
              data-testid={`card-strength-${index}`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3
                    className="font-semibold text-lg mb-1"
                    data-testid={`text-strength-title-${index}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-muted-foreground"
                    data-testid={`text-strength-description-${index}`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
