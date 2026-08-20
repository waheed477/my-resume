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
import CoreStrengthsSection from "@/components/CoreStrengthsSection";
import EducationSection from "@/components/EducationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import GitHubStatsWidget from "@/components/GitHubStatsWidget";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import ReadingProgressBar from "@/components/ReadingProgressBar";

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
        <CoreStrengthsSection />
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
