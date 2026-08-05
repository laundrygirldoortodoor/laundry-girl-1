import collage from "@/assets/hero-collage.webp";
import { useReveal } from "@/hooks/useReveal";

const HeroCollage = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="relative w-full max-w-4xl mx-auto">
      <div className="absolute -inset-6 bg-gradient-glow blur-2xl animate-pulse" aria-hidden="true" />
      <div
        className={`relative rounded-3xl overflow-hidden shadow-architectural border border-border transition-all duration-1000 ease-smooth ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <img
          src={collage}
          alt="How Laundry Girl works: customer books on the app, delivery staff collects at the doorstep, washing partner washes, dries and folds"
          className="w-full h-auto animate-ken-burns"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-overlay" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <p className="text-primary-foreground font-bold text-lg sm:text-2xl tracking-tight animate-fade-in-up">
            Clean Clothes. Happy Life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroCollage;
