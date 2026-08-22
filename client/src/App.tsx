import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
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
            Routes
            ─────────────────────────────────────────────────────────
            Every <Route /> renders inside a single <ErrorBoundary>
            at the Routes level. If any one page or any of its
            descendants throws a render-time error (e.g. undefined
            data field in a JSON file, a missing icon import,
            a third-party widget crashing inside an effect), the
            user gets a polished fallback card with Reload + Try
            again buttons — instead of the whole site going
            blank. Navbar + Footer stay interactive so they can
            jump to another page.

            Route map
            "/"               -> HomePage   (long-form Portfolio)
            "/about"          -> AboutPage
            "/experience"     -> ExperiencePage
            "/projects"       -> ProjectsPage
            "/skills"         -> SkillsPage
            "/how-i-work"      -> HowIWorkPage
            "/education"      -> EducationPage
            "/writing"        -> WritingPage
            "/contact"        -> ContactPage
            "*"               -> NotFoundPage
          */}
          <ErrorBoundary>
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
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
