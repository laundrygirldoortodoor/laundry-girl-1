import { UserCheck, ShieldCheck, Truck, BadgeIndianRupee } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const items = [
  { label: "Trained Women Partners", icon: UserCheck, tone: "bg-step-three" },
  { label: "Safe & Hygienic Service", icon: ShieldCheck, tone: "bg-step-two" },
  { label: "On-time Delivery", icon: Truck, tone: "bg-step-one" },
  { label: "Affordable Pricing", icon: BadgeIndianRupee, tone: "bg-step-three" },
];

const TrustStrip = () => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`flex items-center gap-2 rounded-xl bg-card border border-border px-3 py-2.5 transition-all duration-700 ease-smooth ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className={`w-7 h-7 shrink-0 rounded-full ${item.tone} text-primary-foreground flex items-center justify-center`}>
              <Icon className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-medium text-foreground leading-tight">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrustStrip;
