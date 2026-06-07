-- Follow-up to 20260607000000: that migration dropped the public read policy on
-- the base reviews table (which leaked session_id / reviewer_ip). But the
-- reviews_public view was in security_invoker mode, so it ran with the visitor's
-- permissions and silently depended on that dropped policy — leaving visitors
-- unable to see approved reviews.
--
-- Run the view with its OWNER's privileges instead. It then bypasses base-table
-- RLS to expose only the safe columns of approved reviews, while the base table
-- stays locked so PII (session_id, reviewer_ip) is never readable by anon.

ALTER VIEW public.reviews_public SET (security_invoker = false);

GRANT SELECT ON public.reviews_public TO anon, authenticated;
