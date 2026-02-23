import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/laundry_girl.png";

interface Props {
  role: "staff" | "delivery_boy";
  title: string;
  loginPath: string;
  dashboardPath: string;
}

const StaffAuth = ({ role, title, loginPath, dashboardPath }: Props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "signup">("phone");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const digits = phone.replace(/\D/g, "").slice(-10);

  const handlePhoneSubmit = async () => {
    if (digits.length !== 10) { toast.error("Enter valid 10-digit number"); return; }
    setLoading(true);
    try {
      const fakeEmail = `${role}${digits}@laundryapp.com`;
      const { error } = await supabase.auth.signInWithPassword({ email: fakeEmail, password: digits });

      if (!error) {
        // Check approval
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase.from("profiles").select("is_approved, name").eq("user_id", user.id).single();
          if (profile && !profile.is_approved) {
            await supabase.auth.signOut();
            toast.error("Your account is pending admin approval");
            return;
          }
          toast.success(`Welcome back, ${profile?.name || ""}!`);
          navigate(dashboardPath);
          return;
        }
      }

      if (error?.message?.includes("Invalid login credentials")) {
        setStep("signup");
        toast.info("Please complete your registration");
        return;
      }
      throw error;
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name.trim()) { toast.error("Enter your name"); return; }
    setLoading(true);
    try {
      const fakeEmail = `${role}${digits}@laundryapp.com`;
      const { error } = await supabase.auth.signUp({
        email: fakeEmail,
        password: digits,
        options: {
          data: {
            name: name.trim(),
            mobile_number: `+91${digits}`,
            role,
          },
        },
      });

      if (error) {
        if (error.message?.includes("already been registered")) {
          toast.error("This number is already registered. Try logging in.");
          setStep("phone");
          return;
        }
        throw error;
      }

      await supabase.auth.signOut();
      toast.success("Registration successful! Waiting for admin approval.");
      setStep("phone");
      setName("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-4" />
      <h1 className="text-xl font-bold text-foreground mb-1">{title}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {step === "phone" ? "Enter your mobile number" : "Complete registration"}
      </p>

      {step === "phone" && (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center gap-2 border border-input rounded-xl px-4 py-3 bg-background">
            <span className="text-muted-foreground text-sm">+91</span>
            <input
              type="tel" maxLength={10} placeholder="Mobile number"
              value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 bg-transparent text-foreground outline-none text-sm"
            />
          </div>
          <button onClick={handlePhoneSubmit} disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50">
            {loading ? "Checking..." : "Continue"}
          </button>
        </div>
      )}

      {step === "signup" && (
        <div className="w-full max-w-sm space-y-4">
          <input type="text" placeholder="Your full name" value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          <p className="text-xs text-muted-foreground">Phone: +91 {digits}</p>
          <button onClick={handleSignup} disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>
          <button onClick={() => setStep("phone")} className="w-full text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

export default StaffAuth;
