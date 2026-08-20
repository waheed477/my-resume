import personalData from "@/data/personal.json";

export default function AboutSection() {
  const { personalInfo } = personalData;

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-about-title"
        >
          About Me
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto">
          {personalInfo.bio.map((paragraph, index) => (
            <p
              key={index}
              className={`text-base md:text-lg ${
                index === 0 ? "text-foreground mb-4" : "text-muted-foreground"
              }`}
              data-testid={`text-about-paragraph-${index}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
