import { Smartphone, Bike, WashingMachine, ArrowRight, Clock, MapPin, Wind, Layers } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    n: 1,
    title: "Customer",
    icon: Smartphone,
    accent: "step-one",
    caption: "Book in seconds from the app",
    chips: [
      { label: "Easy Booking", icon: Clock },
      { label: "Doorstep Pickup", icon: MapPin },
    ],
  },
  {
    n: 2,
    title: "Delivery Staff",
    icon: Bike,
    accent: "step-two",
    caption: "Pickup from your doorstep",
    chips: [{ label: "On-time Pickup", icon: Bike }],
  },
  {
    n: 3,
    title: "Washing Partner",
    icon: WashingMachine,
    accent: "step-three",
    caption: "Washed, dried and neatly folded",
    chips: [
      { label: "Wash", icon: WashingMachine },
      { label: "Dry", icon: Wind },
      { label: "Fold", icon: Layers },
    ],
  },
];

const accentClasses: Record<string, { bg: string; text: string; ring: string; chip: string }> = {
  "step-one": {
    bg: "bg-step-one",
    text: "text-step-one",
    ring: "ring-step-one/25",
    chip: "bg-step-one/10 text-step-one",
  },
  "step-two": {
    bg: "bg-step-two",
    text: "text-step-two",
    ring: "ring-step-two/25",
    chip: "bg-step-two/10 text-step-two",
  },
  "step-three": {
    bg: "bg-step-three",
    text: "text-step-three",
    ring: "ring-step-three/25",
    chip: "bg-step-three/10 text-step-three",
  },
};

const HowItWorks = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="w-full max-w-4xl mx-auto">
      <h2 className="text-center text-lg font-bold text-foreground mb-1">How it works</h2>
      <p className="text-center text-xs text-muted-foreground mb-6">Three simple steps to fresh clothes</p>

      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
        {steps.map((step, i) => {
          const a = accentClasses[step.accent];
          const Icon = step.icon;
          return (
            <div key={step.n} className="flex-1 flex flex-col md:flex-row md:items-center gap-3 md:gap-2">
              <div
                className={`flex-1 rounded-2xl bg-card border border-border p-4 shadow-elegant ring-1 ${a.ring} transition-all duration-700 ease-smooth hover:-translate-y-1 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${a.bg} text-primary-foreground flex items-center justify-center shadow-elegant animate-bounce-soft`}
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-[11px] font-bold tracking-widest ${a.text}`}>STEP {step.n}</p>
                    <p className="font-bold text-foreground leading-tight">{step.title}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{step.caption}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.chips.map((chip) => {
                    const ChipIcon = chip.icon;
                    return (
                      <span
                        key={chip.label}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${a.chip}`}
                      >
                        <ChipIcon className="w-3 h-3" />
                        {chip.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {i < steps.length - 1 && (
                <ArrowRight
                  className="hidden md:block w-5 h-5 shrink-0 text-primary animate-arrow-slide"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
