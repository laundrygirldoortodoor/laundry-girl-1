import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WhatsAppHelp = () => {
  const [number, setNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("Hi, I need help with Laundry Girl.");

  useEffect(() => {
    let active = true;
    supabase
      .from("app_settings")
      .select("key, value")
      .in("key", ["whatsapp_number", "whatsapp_message"])
      .then(({ data }) => {
        if (!active || !data) return;
        const map = Object.fromEntries(data.map((r) => [r.key, r.value ?? ""]));
        setNumber((map.whatsapp_number ?? "").replace(/[^\d]/g, ""));
        if (map.whatsapp_message) setMessage(map.whatsapp_message);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp for help"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-step-three px-4 py-3 text-primary-foreground shadow-elegant transition-transform hover:scale-105"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">Need help?</span>
    </a>
  );
};

export default WhatsAppHelp;
