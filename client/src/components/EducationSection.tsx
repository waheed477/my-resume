import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import educationData from "@/data/education.json";

export default function EducationSection() {
  const { education } = educationData;

  return (
    <section id="education" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-education-title"
        >
          Education
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <Card className="p-6 md:p-8 max-w-3xl mx-auto" data-testid="card-education">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl font-semibold mb-1"
                data-testid="text-education-degree"
              >
                {education.degree}
              </h3>
              <p
                className="text-lg text-primary font-medium mb-2"
                data-testid="text-education-institution"
              >
                {education.institution}
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {education.startYear} – {education.endYear}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Faisalabad, Pakistan
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
