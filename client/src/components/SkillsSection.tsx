import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import skillsData from "@/data/skills.json";
import { iconMap } from "@/data/iconMapping";

export default function SkillsSection() {
  const { mernStack, additionalSkills } = skillsData;

  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4" data-testid="text-skills-title">
          Skills
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          A comprehensive overview of my technical expertise across various domains of modern web development.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8" data-testid="text-mern-title">
            MERN Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mernStack.map((skill, index) => {
              const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
              return (
                <Card
                  key={index}
                  className="p-6 flex flex-col items-center gap-4 hover-elevate transition-all duration-300"
                  data-testid={`card-mern-${index}`}
                >
                  <IconComponent className={`h-12 w-12 ${skill.color}`} />
                  <p className="font-semibold text-center" data-testid={`text-mern-name-${index}`}>
                    {skill.name}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center mb-8" data-testid="text-additional-title">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-base gap-2 hover-elevate"
                  data-testid={`badge-skill-${index}`}
                >
                  <IconComponent className={`h-5 w-5 ${skill.color}`} />
                  {skill.name}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}