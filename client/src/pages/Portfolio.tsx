import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SkillsProficiencySection from "@/components/SkillsProficiencySection";
import StackRationaleSection from "@/components/StackRationaleSection";
import WorkingPrinciplesSection from "@/components/WorkingPrinciplesSection";
import EducationSection from "@/components/EducationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import GitHubStatsWidget from "@/components/GitHubStatsWidget";
import ContactSection from "@/components/ContactSection";

/**
 * HomePortfolio — the section list shown on "/".
 * ────────────────────────────────────────────────────────────────
 * Phase-2:
 *   • Bio + languages + core-strengths blocks have moved to
 *     /about (the new AboutPage). Home is now the proof-of-work
 *     rapid-fire surface.
 *   • Navbar / footer / progress / skip-link / back-to-top
 *     chrome is provided by SiteLayout (in HomePage) so this
 *     file only renders the content sections.
 *
 * Section order still reads as a recruiter's eye trail:
 *   "Here's who I am + impact → proof of work → ways to
 *   work together / follow."
 */
export default function Portfolio() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <SkillsProficiencySection />
      <StackRationaleSection />
      <WorkingPrinciplesSection />
      <EducationSection />
      <TestimonialsSection />
      <BlogSection />
      <GitHubStatsWidget />
      <ContactSection />
    </>
  );
}
