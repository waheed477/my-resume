import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  BookOpen,
  ArrowUpRight,
  Filter,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectCaseStudyModal, {
  type ProjectCaseStudy,
} from "./ProjectCaseStudyModal";

export interface CaseStudy {
  title: string;
  type?: string;
  status?: string;
  image: string;
  technologies: string[];
  github: string;
  live?: string;
  bullets?: string[];
  problem?: string;
  approach?: string;
  outcomes?: string[];
  architecture?: string;
  classification?: "product" | "open-source";
}

interface ProjectGridProps {
  caseStudies: CaseStudy[];
  showFilter?: boolean;
}

/**
 * ProjectGrid
 * ────────────────────────────────────────────────────────────────
 * Shared card-grid + case-study modal used by both:
 *   • Home (ProjectsSection) — shows all projects
 *   • /projects (ProjectsPage) — shows all + tech filter chips
 *
 * Reuses the same CaseStudyModal so a recruiter can read the
 * problem / approach / outcome narrative in either surface.
 */
export default function ProjectGrid({
  caseStudies,
  showFilter = false,
}: ProjectGridProps) {
  const [openProject, setOpenProject] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Build the unique tech tag list across all projects
  const allTech = useMemo(() => {
    const seen = new Set<string>();
    caseStudies.forEach((p) =>
      p.technologies.forEach((t) => seen.add(t)),
    );
    return Array.from(seen).sort();
  }, [caseStudies]);

  const visibleProjects = useMemo(() => {
    if (!activeFilter) return caseStudies;
    return caseStudies.filter((p) => p.technologies.includes(activeFilter));
  }, [caseStudies, activeFilter]);

  return (
    <>
      {/* Tech-filter chip row (only on /projects) */}
      {showFilter && (
        <div
          className="mb-10"
          data-testid="projects-filter-row"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
              <Filter className="h-4 w-4" />
              <span>Filter tech:</span>
            </div>
            <Button
              size="sm"
              variant={activeFilter === null ? "default" : "ghost"}
              onClick={() => setActiveFilter(null)}
              data-testid="projects-filter-clear"
            >
              All ({caseStudies.length})
            </Button>
            {allTech.map((tech) => {
              const count = caseStudies.filter((p) =>
                p.technologies.includes(tech),
              ).length;
              return (
                <Button
                  key={tech}
                  size="sm"
                  variant={activeFilter === tech ? "default" : "ghost"}
                  onClick={() => setActiveFilter(tech)}
                  className="h-7"
                  data-testid={`projects-filter-${tech.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  #{tech}{" "}
                  <span className="opacity-60 ml-1">{count}</span>
                </Button>
              );
            })}
            {activeFilter && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveFilter(null)}
                className="gap-1 ml-1"
                data-testid="projects-filter-x"
              >
                <X className="h-3 w-3" /> Clear
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div
        className="grid md:grid-cols-2 gap-8"
        data-testid="projects-grid"
      >
        {visibleProjects.map((project, index) => (
          <Card
            key={project.title}
            className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col"
            data-testid={`projects-card-${index}`}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={`/images/${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-xl"
                    data-testid={`projects-card-title-${index}`}
                  >
                    {project.title}
                  </h3>
                  {project.type && (
                    <p className="text-sm text-primary font-medium mt-0.5">
                      {project.type}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {project.status && (
                    <Badge
                      variant="default"
                      className="text-[10px]"
                      data-testid={`projects-card-status-${index}`}
                    >
                      {project.status}
                    </Badge>
                  )}
                  {project.classification && (
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase tracking-wider"
                      data-testid={`projects-card-classification-${index}`}
                    >
                      {project.classification === "product" ? "Product" : "Open Source"}
                    </Badge>
                  )}
                </div>
              </div>

              {project.bullets && project.bullets[0] && (
                <p
                  className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2"
                  data-testid={`projects-card-snippet-${index}`}
                >
                  {project.bullets[0]}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 8).map((tech, i) => (
                  <Badge
                    key={i}
                    variant={activeFilter === tech ? "default" : "secondary"}
                    className="text-[10px] cursor-pointer"
                    onClick={() =>
                      showFilter && setActiveFilter(tech)
                    }
                    data-testid={`projects-card-tech-${index}-${i}`}
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 8 && (
                  <Badge
                    variant="outline"
                    className="text-[10px]"
                    data-testid={`projects-card-tech-overflow-${index}`}
                  >
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
                  data-testid={`projects-case-study-${index}`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Case Study
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(project.github, "_blank")}
                  data-testid={`projects-github-${index}`}
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
                    data-testid={`projects-live-${index}`}
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
        project={openProject as ProjectCaseStudy | null}
        open={openProject !== null}
        onOpenChange={(open) => !open && setOpenProject(null)}
      />

      {/* Empty state if filter excludes everything */}
      {visibleProjects.length === 0 && (
        <p
          className="text-center text-muted-foreground mt-8"
          data-testid="projects-empty-state"
        >
          No projects match <code>#{activeFilter}</code>.{" "}
          <button
            className="underline hover:text-primary"
            onClick={() => setActiveFilter(null)}
          >
            Clear filter
          </button>
        </p>
      )}
    </>
  );
}
