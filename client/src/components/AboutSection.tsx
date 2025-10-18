import { GraduationCap, Code2, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import personalData from "@/data/personal.json";
import { iconMap } from "@/data/iconMapping";

export default function AboutSection() {
  const { personalInfo, highlights } = personalData;
  const highlightIcons = [GraduationCap, Code2, Award];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4" data-testid="text-about-title">
          About Me
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            {personalInfo.bio.map((paragraph, index) => (
              <p 
                key={index}
                className={`text-base md:text-lg ${index === 0 ? 'text-foreground mb-4' : 'text-muted-foreground'}`}
                data-testid={`text-about-${index === 0 ? 'description' : 'passion'}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-4">
            {highlights.map((item, index) => {
              const IconComponent = highlightIcons[index];
              return (
                <Card
                  key={index}
                  className="p-6 hover-elevate transition-all duration-300"
                  data-testid={`card-highlight-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1" data-testid={`text-highlight-title-${index}`}>
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-highlight-description-${index}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}