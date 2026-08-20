import statsData from "@/data/stats.json";

export default function StatsSection() {
  const { items } = statsData;

  return (
    <section
      className="py-12 md:py-16 border-y border-border/60 bg-background/60 backdrop-blur-sm"
      aria-label="Key metrics"
      data-testid="section-stats"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-center text-sm md:text-base font-medium uppercase tracking-widest text-muted-foreground mb-8"
          data-testid="text-stats-intro"
        >
          By the numbers
        </h2>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          data-testid="grid-stats"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <div
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-1"
                data-testid={`stat-value-${index}`}
              >
                {item.value}
              </div>
              <div
                className="text-sm md:text-base font-semibold"
                data-testid={`stat-label-${index}`}
              >
                {item.label}
              </div>
              <div
                className="text-xs md:text-sm text-muted-foreground mt-1 px-2"
                data-testid={`stat-sublabel-${index}`}
              >
                {item.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
