import {
  ExternalLink,
  Github,
  Layers,
  Wrench,
  Target,
  ListChecks,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface ProjectCaseStudy {
  title: string;
  type?: string;
  status?: string;
  image: string;
  problem: string;
  approach: string;
  outcomes: string[];
  architecture: string;
  technologies: string[];
  github: string;
  live?: string;
}

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectCaseStudyModal({
  project,
  open,
  onOpenChange,
}: ProjectCaseStudyModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        data-testid={`dialog-case-study-${project.title}`}
      >
        <DialogHeader>
          <div className="flex items-center gap-2 flex-wrap">
            {project.status && (
              <Badge data-testid="dialog-status">{project.status}</Badge>
            )}
            {project.type && (
              <Badge variant="outline" data-testid="dialog-type">
                {project.type}
              </Badge>
            )}
          </div>
          <DialogTitle
            className="font-serif text-2xl md:text-3xl pt-2"
            data-testid="dialog-title"
          >
            {project.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Case study for {project.title}
          </DialogDescription>
        </DialogHeader>

        <figure className="-mx-2">
          <img
            src={`/images/${project.image}`}
            alt={`${project.title} preview`}
            className="w-full h-auto rounded-md border border-border object-cover"
            data-testid="dialog-image"
          />
        </figure>

        <section
          className="space-y-1"
          aria-labelledby="heading-problem"
          data-testid="dialog-problem"
        >
          <h3
            id="heading-problem"
            className="font-semibold text-lg flex items-center gap-2"
          >
            <Target className="h-4 w-4 text-primary" /> Problem
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </section>

        <Separator />

        <section
          className="space-y-1"
          aria-labelledby="heading-approach"
          data-testid="dialog-approach"
        >
          <h3
            id="heading-approach"
            className="font-semibold text-lg flex items-center gap-2"
          >
            <Wrench className="h-4 w-4 text-primary" /> Approach
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.approach}
          </p>
        </section>

        <Separator />

        <section
          className="space-y-2"
          aria-labelledby="heading-outcomes"
          data-testid="dialog-outcomes"
        >
          <h3
            id="heading-outcomes"
            className="font-semibold text-lg flex items-center gap-2"
          >
            <ListChecks className="h-4 w-4 text-primary" /> Outcomes
          </h3>
          <ul className="space-y-2">
            {project.outcomes.map((outcome, i) => (
              <li
                key={i}
                className="flex gap-2 text-muted-foreground"
                data-testid={`dialog-outcome-${i}`}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section
          className="space-y-2"
          aria-labelledby="heading-architecture"
          data-testid="dialog-architecture"
        >
          <h3
            id="heading-architecture"
            className="font-semibold text-lg flex items-center gap-2"
          >
            <Layers className="h-4 w-4 text-primary" /> Architecture
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.architecture}
          </p>
        </section>

        <Separator />

        <section
          className="space-y-2"
          aria-labelledby="heading-stack"
          data-testid="dialog-technologies"
        >
          <h3
            id="heading-stack"
            className="font-semibold text-lg"
          >
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <Badge key={i} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => window.open(project.github, "_blank")}
            data-testid="dialog-code"
          >
            <Github className="h-4 w-4 mr-2" /> Code
          </Button>
          {project.live && (
            <Button
              onClick={() => window.open(project.live, "_blank")}
              data-testid="dialog-live"
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
