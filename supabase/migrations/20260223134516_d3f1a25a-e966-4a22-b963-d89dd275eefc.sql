
-- Fix: drop the already-created policy and recreate order items policy
DROP POLICY IF EXISTS "Authorized users can update orders" ON public.orders;
CREATE POLICY "Authorized users can update orders" ON public.orders FOR UPDATE
  USING (
    auth.uid() = user_id 
    OR has_role(auth.uid(), 'super_admin') 
    OR has_role(auth.uid(), 'admin')
    OR (has_role(auth.uid(), 'staff') AND assigned_washer_id = auth.uid())
    OR (has_role(auth.uid(), 'delivery_boy') AND assigned_delivery_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can view relevant order items" ON public.order_items;
CREATE POLICY "Users can view relevant order items" ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (
      orders.user_id = auth.uid() 
      OR has_role(auth.uid(), 'super_admin') 
      OR has_role(auth.uid(), 'admin')
      OR (has_role(auth.uid(), 'staff') AND orders.assigned_washer_id = auth.uid())
      OR (has_role(auth.uid(), 'delivery_boy') AND orders.assigned_delivery_id = auth.uid())
    )
  ));
