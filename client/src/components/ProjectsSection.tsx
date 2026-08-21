import ProjectGrid from "@/components/ProjectGrid";
import caseStudiesData from "@/data/caseStudies.json";

/**
 * Home-page projects section (mounted on /).
 * Phase-3: now delegates to the shared <ProjectGrid /> so the
 * home and /projects surfaces render the same cards. The home
 * surface skips the tech-filter chip row (since the home
 * experience is "skim the latest work"); full filtering lives
 * on /projects.
 */
export default function ProjectsSection() {
  const { caseStudies } = caseStudiesData;

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

        <ProjectGrid caseStudies={caseStudies} showFilter={false} />
      </div>
    </section>
  );
}
