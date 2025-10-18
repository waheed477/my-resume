import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
const heroBg = "/images/abstract_technology__e685e5a8.jpg";
const profileImg = "/images/professional_develop_aaf5dc2f.jpg";
import personalData from "@/data/personal.json";
import { iconMap } from "@/data/iconMapping";

export default function HeroSection() {
  const { personalInfo, socialLinks } = personalData;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <img
            src={profileImg}
            alt={personalInfo.name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-primary/30 shadow-2xl object-cover"
            data-testid="img-profile"
          />
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4" data-testid="text-hero-title">
          Hi, I'm <span className="text-primary">{personalInfo.name}</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-3" data-testid="text-hero-subtitle">
          {personalInfo.title}
        </p>

        <p className="text-base md:text-lg text-muted-foreground mb-8" data-testid="text-hero-description">
          {personalInfo.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            size="lg"
            onClick={() => scrollToSection("projects")}
            data-testid="button-view-projects"
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="backdrop-blur-md"
            onClick={() => scrollToSection("contact")}
            data-testid="button-contact-me"
          >
            Contact Me
          </Button>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => window.open(socialLinks.github, "_blank")}
            data-testid="button-github"
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => window.open(socialLinks.linkedin, "_blank")}
            data-testid="button-linkedin"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => window.open(`mailto:${socialLinks.email}`, "_blank")}
            data-testid="button-email"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          data-testid="button-scroll-down"
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </button>
      </div>
    </section>
  );
}