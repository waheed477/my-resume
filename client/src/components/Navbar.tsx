import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

/**
 * Site-wide navbar. Phase-2 wiring: nav items are real routes
 * via react-router NavLink (which auto-applies aria-current when
 * a path matches). Scroll-spy is intentionally disabled because
 * each route is its own page; cross-page scroll-spy would have
 * nothing to highlight once the user clicks through to /about.
 *
 * HeroSection still uses scroll-spy internally for its
 * "scroll-down" arrow and "View Projects" / "Contact Me" CTAs.
 * That's purely an in-page scroll and lives where it belongs.
 */

interface NavItem {
  label: string;
  to: string;
}

const navLinks: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "How I Work", to: "/how-i-work" },
  { label: "Education", to: "/education" },
  { label: "Writing", to: "/writing" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-1 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent",
      )}
      aria-label="Primary"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-serif text-xl md:text-2xl font-bold hover-elevate active-elevate-2 rounded-md px-3 py-2"
            aria-label="Home"
            data-testid="link-logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            WA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium px-4 py-2 transition-all hover-elevate active-elevate-2 border border-transparent transition-colors",
                    isActive
                      ? "text-primary"
                      : "hover:text-primary",
                  )
                }
                data-testid={`link-nav-${link.to.replaceAll("/", "")}`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-1/2 -bottom-1 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300",
                        isActive ? "w-3/5" : "w-0",
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
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

          {/* Mobile cluster */}
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
              onClick={() => setIsMobileMenuOpen((o) => !o)}
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

        {/* Mobile drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2" role="menu">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "w-full justify-start inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium min-h-8 px-3 py-2 border border-transparent hover-elevate active-elevate-2",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "",
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
                role="menuitem"
                data-testid={`link-mobile-nav-${link.to.replaceAll("/", "")}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
