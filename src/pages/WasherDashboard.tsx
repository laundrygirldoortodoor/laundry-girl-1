import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Package, CheckCircle, Clock, Loader2 } from "lucide-react";
import logo from "@/assets/laundry_girl.webp";

interface Order {
  id: string;
  status: string;
  total_amount: number;
  notes: string | null;
  created_at: string;
  customer_name?: string;
  items?: { item_name: string; service_type: string | null; quantity: number }[];
}

const STATUS_FLOW: Record<string, { next: string; label: string }> = {
  assigned_washer: { next: "washing", label: "Start Washing" },
  washing: { next: "washed", label: "Mark Washed" },
  washed: { next: "ready_for_delivery", label: "Ready for Delivery" },
};

const WasherDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => { init(); }, []);

  const init = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/washer-login"); return; }

    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "staff").maybeSingle();
    if (!role) { navigate("/washer-login"); return; }

    const { data: p } = await supabase.from("profiles").select("name, is_approved").eq("user_id", user.id).single();
    if (!p?.is_approved) { await supabase.auth.signOut(); toast.error("Account not approved"); navigate("/washer-login"); return; }
    setProfile(p);

    await fetchOrders(user.id);
    setLoading(false);
  };

  const fetchOrders = async (userId: string) => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("assigned_washer_id", userId)
      .in("status", ["assigned_washer", "washing", "washed", "ready_for_delivery"])
      .order("created_at", { ascending: false });

    if (ordersData) {
      const enriched = await Promise.all(ordersData.map(async (o) => {
        const { data: items } = await supabase.from("order_items").select("item_name, service_type, quantity").eq("order_id", o.id);
        const { data: cp } = await supabase.from("profiles").select("name").eq("user_id", o.user_id).single();
        return { ...o, items: items || [], customer_name: cp?.name || "Customer" };
      }));
      setOrders(enriched);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (error) toast.error(error.message);
    else {
      toast.success("Status updated!");
      const { data: { user } } = await supabase.auth.getUser();
      if (user) await fetchOrders(user.id);
    }
    setUpdating(null);
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); navigate("/washer-login"); };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  const statusColor = (s: string) => {
    switch (s) {
      case "assigned_washer": return "bg-yellow-100 text-yellow-800";
      case "washing": return "bg-blue-100 text-blue-800";
      case "washed": return "bg-green-100 text-green-800";
      case "ready_for_delivery": return "bg-purple-100 text-purple-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <p className="text-xs opacity-80">Washing Agent</p>
            <p className="font-bold text-base">{profile?.name}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="opacity-80 hover:opacity-100"><LogOut className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> Assigned Orders ({orders.length})
        </h3>

        {orders.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No orders assigned yet</p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground text-sm">{o.customer_name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColor(o.status)}`}>
                    {o.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {o.items?.map((i, idx) => (
                    <span key={idx} className="inline-block bg-muted rounded px-1.5 py-0.5 mr-1 mb-1">
                      {i.quantity}x {i.item_name} {i.service_type ? `(${i.service_type.replace("_", "+")})` : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">₹{o.total_amount}</span>
                  {STATUS_FLOW[o.status] && (
                    <button
                      onClick={() => updateStatus(o.id, STATUS_FLOW[o.status].next)}
                      disabled={updating === o.id}
                      className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
                    >
                      {updating === o.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                      {STATUS_FLOW[o.status].label}
                    </button>
                  )}
                </div>
                {o.notes && <p className="text-xs text-muted-foreground mt-2 italic">Note: {o.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WasherDashboard;
