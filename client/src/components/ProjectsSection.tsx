import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, BookOpen, ArrowUpRight } from "lucide-react";
import caseStudiesData from "@/data/caseStudies.json";
import ProjectCaseStudyModal, {
  type ProjectCaseStudy,
} from "./ProjectCaseStudyModal";

export default function ProjectsSection() {
  const { caseStudies } = caseStudiesData;
  const [openProject, setOpenProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-projects-title"
        >
          Projects
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          A selection of projects that showcase my skills and experience in
          building modern web applications. Click <em>Case Study</em> for the
          problem / approach / outcome breakdown.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col"
              data-testid={`card-project-${index}`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={`/my-resume/images/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                  data-testid={`img-project-${index}`}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="font-semibold text-xl"
                    data-testid={`text-project-title-${index}`}
                  >
                    {project.title}
                  </h3>
                  {project.status && (
                    <Badge
                      variant="default"
                      className="shrink-0"
                      data-testid={`badge-status-${index}`}
                    >
                      {project.status}
                    </Badge>
                  )}
                </div>

                {project.type && (
                  <p
                    className="text-sm text-primary font-medium mb-3"
                    data-testid={`text-project-type-${index}`}
                  >
                    {project.type}
                  </p>
                )}

                {/* Snippet from the approach — kept short for the card,
                    full version in the case-study modal */}
                <p
                  className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed"
                  data-testid={`text-project-snippet-${index}`}
                >
                  {project.approach}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 8).map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      data-testid={`badge-tech-${index}-${techIndex}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 8 && (
                    <Badge variant="outline" data-testid={`badge-tech-overflow-${index}`}>
                      +{project.technologies.length - 8}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  <Button
                    size="sm"
                    onClick={() =>
                      setOpenProject(project as ProjectCaseStudy)
                    }
                    data-testid={`button-case-study-${index}`}
                    aria-haspopup="dialog"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Case Study
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.github, "_blank")}
                    data-testid={`button-github-${index}`}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  {project.live && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        project.live && window.open(project.live, "_blank")
                      }
                      data-testid={`button-live-${index}`}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-70" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <ProjectCaseStudyModal
          project={openProject}
          open={openProject !== null}
          onOpenChange={(open) => !open && setOpenProject(null)}
        />
      </div>
    </section>
  );
}
