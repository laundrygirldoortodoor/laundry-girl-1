CREATE TABLE public.app_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT ON public.app_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read app settings" ON public.app_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert app settings" ON public.app_settings FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'super_admin') OR has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update app settings" ON public.app_settings FOR UPDATE TO authenticated USING (has_role(auth.uid(),'super_admin') OR has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete app settings" ON public.app_settings FOR DELETE TO authenticated USING (has_role(auth.uid(),'super_admin') OR has_role(auth.uid(),'admin'));
CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON public.app_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.app_settings (key, value) VALUES ('whatsapp_number',''), ('whatsapp_message','Hi, I need help with Laundry Girl.');