import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Writing", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  const activeId = useScrollSpy(navLinks.map((l) => l.id), 96);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-1 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
      aria-label="Primary"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-serif text-xl md:text-2xl font-bold hover-elevate active-elevate-2 rounded-md px-3 py-2"
            aria-label="Back to top"
            data-testid="button-logo"
          >
            WA
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => scrollToSection(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative transition-colors",
                    isActive && "text-primary"
                  )}
                  data-testid={`button-nav-${link.id}`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-1/2 -bottom-1 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300",
                      isActive ? "w-3/5" : "w-0"
                    )}
                  />
                </Button>
              );
            })}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              data-testid="button-theme-toggle-mobile"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 space-y-2"
            role="menu"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Button
                  key={link.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-primary/10 text-primary"
                  )}
                  onClick={() => scrollToSection(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  role="menuitem"
                  data-testid={`button-mobile-nav-${link.id}`}
                >
                  {link.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
