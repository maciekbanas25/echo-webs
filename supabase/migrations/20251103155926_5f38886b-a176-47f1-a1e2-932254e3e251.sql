-- Fix the ambiguous column reference in can_submit_review_by_ip function
DROP FUNCTION IF EXISTS public.can_submit_review_by_ip(inet);

CREATE OR REPLACE FUNCTION public.can_submit_review_by_ip(p_reviewer_ip inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.reviews r
    WHERE r.reviewer_ip = p_reviewer_ip
    AND r.created_at > NOW() - INTERVAL '24 hours'
  );
END;
$function$;