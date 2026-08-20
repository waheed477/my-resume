import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import experienceData from "@/data/experience.json";

export default function ExperienceSection() {
  const { experience } = experienceData;

  return (
    <section id="experience" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-experience-title"
        >
          Experience
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <Card className="p-6 md:p-8" data-testid="card-experience">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h3
                className="text-xl md:text-2xl font-semibold"
                data-testid="text-experience-role"
              >
                {experience.role}
              </h3>
              <p
                className="text-lg text-primary font-medium"
                data-testid="text-experience-company"
              >
                {experience.company}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {experience.startDate} – {experience.endDate}
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {experience.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {experience.location}
              </span>
            </div>
          </div>

          <ul className="space-y-3 mt-4" data-testid="list-experience-achievements">
            {experience.achievements.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-muted-foreground"
                data-testid={`text-experience-achievement-${index}`}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
