import Navbar from "@/components/Navbar";
import SkipToMainContent from "@/components/SkipToMainContent";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import LanguagesSkillsSection from "@/components/LanguagesSkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SkillsProficiencySection from "@/components/SkillsProficiencySection";
import StackRationaleSection from "@/components/StackRationaleSection";
import CoreStrengthsSection from "@/components/CoreStrengthsSection";
import WorkingPrinciplesSection from "@/components/WorkingPrinciplesSection";
import EducationSection from "@/components/EducationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import GitHubStatsWidget from "@/components/GitHubStatsWidget";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import ReadingProgressBar from "@/components/ReadingProgressBar";

/**
 * Portfolio page composition.
 *
 * Section order is intentional — it reads as a recruiter's eye
 * trail from "Is this person real?" to "Should I make them an
 * offer?".
 *
 *   Hero (with real photo) → Numbers → About → Languages → Experience
 *       → Projects → Skills → Proficiency → Stack Rationale
 *       → Core Strengths → How I Work
 *       → Education → Testimonials → Writing(Blog) → GitHub Stats
 *       → Contact → Footer
 *
 * Photo lives once, in the Hero. Recruiters look for the headshot
 * in the first 3 seconds — that's prime real estate and a clean
 * pattern: "here's who I am, here's my impact".
 *
 * The full page is wrapped in <main id="main" tabIndex={-1}> so the
 * SkipToMainContent link leaves focus where it belongs.
 */
export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <SkipToMainContent />
      <ReadingProgressBar />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <LanguagesSkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <SkillsProficiencySection />
        <StackRationaleSection />
        <CoreStrengthsSection />
        <WorkingPrinciplesSection />
        <EducationSection />
        <TestimonialsSection />
        <BlogSection />
        <GitHubStatsWidget />
        <ContactSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
