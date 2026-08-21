import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ExperiencePage from "@/pages/ExperiencePage";
import ProjectsPage from "@/pages/ProjectsPage";
import SkillsPage from "@/pages/SkillsPage";
import HowIWorkPage from "@/pages/HowIWorkPage";
import EducationPage from "@/pages/EducationPage";
import WritingPage from "@/pages/WritingPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {/*
            Phase-1 / Phase-2 routing.
            "/"               -> HomePage (the long-form Portfolio)
            "/about"          -> AboutPage (real — bio, languages,
                                              core strengths)
            "/experience"     -> ExperiencePage (placeholder P3)
            "/projects"       -> ProjectsPage (placeholder P3)
            "/skills"         -> SkillsPage (placeholder P4)
            "/how-i-work"      -> HowIWorkPage (placeholder P4)
            "/education"      -> EducationPage (placeholder P4)
            "/writing"        -> WritingPage (placeholder P4 — real
                                              posts in writing.json)
            "/contact"        -> ContactPage (placeholder P2/P3)
            "*"               -> NotFoundPage
          */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/how-i-work" element={<HowIWorkPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
