import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Shirt, Wrench, Sparkles, Zap, Droplets, Wind, Hammer, Bug, ShoppingCart, Plus, ChevronRight } from "lucide-react";
import logo from "@/assets/laundry_girl.webp";
import { CartProvider, useCart } from "@/components/customer/CartContext";
import CartSheet from "@/components/customer/CartSheet";

interface AddonService {
  id: string;
  name: string;
  description: string | null;
  booking_charge: number;
  category: string;
  icon_name: string | null;
}

interface LaundryFeature {
  id: string;
  name: string;
  category: string;
  price_wash: number | null;
  price_iron: number | null;
  price_wash_iron: number | null;
}

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  droplets: <Droplets className="w-6 h-6" />,
  hammer: <Hammer className="w-6 h-6" />,
  bug: <Bug className="w-6 h-6" />,
  wind: <Wind className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
};

const CustomerHomeContent = () => {
  const navigate = useNavigate();
  const { addItem, itemCount, total } = useCart();
  const [profile, setProfile] = useState<{ name: string } | null>(null);
  const [services, setServices] = useState<AddonService[]>([]);
  const [features, setFeatures] = useState<LaundryFeature[]>([]);
  const [tab, setTab] = useState<"laundry" | "services">("laundry");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/customer-login"); return; }

      const { data: p } = await supabase.from("profiles").select("name").eq("user_id", user.id).single();
      if (p) setProfile(p);

      const { data: s } = await supabase.from("addon_services").select("*").eq("is_active", true).order("sort_order");
      if (s) setServices(s as AddonService[]);

      const { data: f } = await supabase.from("laundry_features").select("*").eq("is_active", true).order("sort_order");
      if (f) setFeatures(f as LaundryFeature[]);
    };
    init();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/landing");
  };

  const addLaundryItem = (feature: LaundryFeature, serviceType: "wash" | "iron" | "wash_iron", price: number) => {
    addItem({
      type: "laundry",
      name: feature.name,
      serviceType,
      unitPrice: price,
      quantity: 1,
      laundryFeatureId: feature.id,
    });
    toast.success(`${feature.name} (${serviceType === "wash_iron" ? "Wash+Iron" : serviceType === "wash" ? "Wash" : "Iron"}) added to cart`);
  };

  const addAddonItem = (service: AddonService) => {
    addItem({
      type: "addon",
      name: service.name,
      unitPrice: service.booking_charge,
      quantity: 1,
      addonServiceId: service.id,
    });
    toast.success(`${service.name} added to cart`);
  };

  return (
    <div className="min-h-screen flex flex-col app-bg">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-surface px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-elegant">
            <img src={logo} alt="Laundry Girl logo" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Welcome back</p>
            <p className="font-bold text-base text-foreground leading-tight">{profile?.name || "Customer"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative w-10 h-10 rounded-xl border border-border/60 bg-card/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-card transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-background">
                {itemCount}
              </span>
            )}
          </button>
          <button onClick={handleSignOut} aria-label="Sign out" className="w-10 h-10 rounded-xl border border-border/60 bg-card/70 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-1 p-1 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl">
          <button
            onClick={() => setTab("laundry")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "laundry" ? "bg-gradient-hero text-primary-foreground shadow-elegant" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Shirt className="w-4 h-4" /> Laundry
          </button>
          <button
            onClick={() => setTab("services")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "services" ? "bg-gradient-hero text-primary-foreground shadow-elegant" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wrench className="w-4 h-4" /> Add-ons
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto pb-28">
        {/* Laundry Features */}
        {tab === "laundry" && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4">Tap a price to add it to your cart</p>
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f.id} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-foreground">{f.name}</span>
                    </div>
                    <span className="text-[11px] font-semibold capitalize bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{f.category}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {f.price_wash != null && (
                      <button
                        onClick={() => addLaundryItem(f, "wash", f.price_wash!)}
                        className="rounded-xl border border-primary/25 bg-primary/10 hover:bg-primary/20 px-3 py-2 text-left transition-colors"
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Wash</div>
                        <div className="font-bold text-base text-primary flex items-center gap-1">₹{f.price_wash}<Plus className="w-3.5 h-3.5" /></div>
                      </button>
                    )}
                    {f.price_iron != null && (
                      <button
                        onClick={() => addLaundryItem(f, "iron", f.price_iron!)}
                        className="rounded-xl border border-secondary/25 bg-secondary/10 hover:bg-secondary/20 px-3 py-2 text-left transition-colors"
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Iron</div>
                        <div className="font-bold text-base text-secondary flex items-center gap-1">₹{f.price_iron}<Plus className="w-3.5 h-3.5" /></div>
                      </button>
                    )}
                    {f.price_wash_iron != null && (
                      <button
                        onClick={() => addLaundryItem(f, "wash_iron", f.price_wash_iron!)}
                        className="rounded-xl border border-step-three/30 bg-step-three/10 hover:bg-step-three/20 px-3 py-2 text-left transition-colors"
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Wash+Iron</div>
                        <div className="font-bold text-base text-step-three flex items-center gap-1">₹{f.price_wash_iron}<Plus className="w-3.5 h-3.5" /></div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-on Services */}
        {tab === "services" && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4">Tap to add home services to your order</p>
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s.id} className="glass-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center shadow-elegant">
                        {iconMap[s.icon_name ?? "wrench"]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground truncate">{s.name}</p>
                        {s.description && <p className="text-xs text-muted-foreground line-clamp-2">{s.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Charge</p>
                        <p className="font-bold text-foreground">₹{s.booking_charge}</p>
                      </div>
                      <button
                        onClick={() => addAddonItem(s)}
                        className="bg-gradient-hero text-primary-foreground rounded-xl px-3.5 py-2 text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-elegant"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Floating Cart Bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full max-w-lg mx-auto flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-lg hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/20 rounded-lg px-2.5 py-1 text-sm font-bold">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </div>
              <span className="font-medium text-sm">View Cart</span>
            </div>
            <span className="font-bold text-lg">₹{total}</span>
          </button>
        </div>
      )}

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

const CustomerHome = () => (
  <CartProvider>
    <CustomerHomeContent />
  </CartProvider>
);

export default CustomerHome;
