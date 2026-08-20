import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import personalData from "@/data/personal.json";

export default function HeroSection() {
  const { personalInfo, socialLinks } = personalData;

  const heroBg = "/my-resume/images/abstract_technology__e685e5a8.jpg";
  const profileImg = "/my-resume/images/professional_develop_aaf5dc2f.jpg";
  const resumePdf = "/my-resume/Waheed-Aslam-Resume.pdf";

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
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Availability badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-foreground/90" data-testid="text-availability">
            Open to opportunities · Available immediately
          </span>
        </div>

        <div className="mb-8 flex justify-center">
          <img
            src={profileImg}
            alt={personalInfo.name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-primary/30 shadow-2xl object-cover"
            data-testid="img-profile"
            style={{ objectPosition: "50% 20%" }}
          />
        </div>

        <h1
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          data-testid="text-hero-title"
        >
          Hi, I'm{" "}
          <span className="text-primary">{personalInfo.name}</span>
        </h1>

        <p
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          data-testid="text-hero-subtitle"
        >
          {personalInfo.title}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
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
          {/* Download CV — plain anchor styled as button, no asChild dep */}
          <a
            href={resumePdf}
            download
            aria-label="Download CV as PDF"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "backdrop-blur-md gap-2 no-underline"
            )}
            data-testid="button-download-cv"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => window.open(socialLinks.github, "_blank")}
            aria-label="Visit GitHub profile"
            data-testid="button-github"
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => window.open(socialLinks.linkedin, "_blank")}
            aria-label="Visit LinkedIn profile"
            data-testid="button-linkedin"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => window.open(`mailto:${socialLinks.email}`, "_blank")}
            aria-label="Send an email"
            data-testid="button-email"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll to about section"
          data-testid="button-scroll-down"
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </button>
      </div>
    </section>
  );
}
