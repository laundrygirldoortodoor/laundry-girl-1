import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, Shirt, Truck } from "lucide-react";
import logo from "@/assets/laundry_girl.webp";
import Bubbles from "@/components/landing/Bubbles";
import HeroCollage from "@/components/landing/HeroCollage";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustStrip from "@/components/landing/TrustStrip";
import WhatsAppHelp from "@/components/landing/WhatsAppHelp";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-splash bg-[length:300%_300%] animate-gradient-shift">
      <Bubbles count={10} />

      <div className="relative flex flex-col px-4 sm:px-6 py-6 gap-8">
        {/* Admin icon top-right */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/admin-login")}
            className="p-2 rounded-full bg-muted hover:bg-accent/20 transition-colors"
            aria-label="Admin Login"
          >
            <ShieldCheck className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Brand */}
        <div className="animate-fade-in-up flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-glow blur-2xl" aria-hidden="true" />
            <img
              src={logo}
              alt="Laundry Girl Logo"
              className="relative w-28 h-28 object-contain animate-bounce-soft"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold tracking-[0.2em] text-primary">LAUNDRY GIRL</h1>
            <p className="text-xs tracking-[0.12em] text-secondary">DOOR TO DOOR DRY CLEAN SERVICE</p>
          </div>
        </div>

        {/* Login actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
          <button
            onClick={() => navigate("/customer-login")}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-semibold text-lg shadow-elegant hover:opacity-90 transition-opacity"
          >
            <User className="w-5 h-5" />
            Customer Login
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/washer-login")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              <Shirt className="w-4 h-4" />
              Washer
            </button>
            <button
              onClick={() => navigate("/delivery-login")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              <Truck className="w-4 h-4" />
              Delivery
            </button>
          </div>
        </div>

        <HeroCollage />
        <HowItWorks />
        <TrustStrip />


        <p className="text-muted-foreground text-xs text-center pb-4">Fresh clothes, delivered to your door</p>
      </div>
    </div>
  );
};

export default Landing;
