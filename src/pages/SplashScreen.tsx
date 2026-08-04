import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/laundry_girl.png";
import Bubbles from "@/components/landing/Bubbles";

const TITLE = "LAUNDRY GIRL";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-splash bg-[length:300%_300%] animate-gradient-shift">
      <Bubbles count={16} />

      <div className="relative flex flex-col items-center gap-6 px-6">
        {/* Logo with glow + shine sweep */}
        <div className="relative animate-scale-in">
          <div className="absolute -inset-8 bg-gradient-glow blur-2xl" aria-hidden="true" />
          <div className="relative w-48 h-48 rounded-3xl overflow-hidden flex items-center justify-center">
            <img src={logo} alt="Laundry Girl Logo" className="w-48 h-48 object-contain animate-bounce-soft" />
            <span
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-primary-foreground/40 blur-md animate-shimmer"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold tracking-[0.25em] text-primary flex" aria-label={TITLE}>
            {TITLE.split("").map((ch, i) => (
              <span
                key={i}
                className="animate-pop-in"
                style={{ animationDelay: `${0.25 + i * 0.06}s` }}
                aria-hidden="true"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
          <p
            className="text-sm tracking-[0.15em] text-secondary animate-fade-in-up"
            style={{ animationDelay: "1.1s", animationFillMode: "both" }}
          >
            DOOR TO DOOR DRY CLEAN SERVICE
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-14 w-48 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-gradient-hero animate-progress-fill" />
      </div>
    </div>
  );
};

export default SplashScreen;
