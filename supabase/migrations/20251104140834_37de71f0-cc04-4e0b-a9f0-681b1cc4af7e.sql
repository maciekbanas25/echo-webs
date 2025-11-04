-- Fix the security definer issue by recreating the view with security_invoker=on
DROP VIEW IF EXISTS public.reviews_public;

CREATE VIEW public.reviews_public 
WITH (security_invoker=on) AS
SELECT 
  id,
  rating,
  text,
  reviewer_name,
  company,
  created_at,
  status
FROM public.reviews
WHERE status = 'approved';

-- Grant access to the view for anonymous users
GRANT SELECT ON public.reviews_public TO anon;
GRANT SELECT ON public.reviews_public TO authenticated;