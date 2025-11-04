-- Update review_status enum to include 'deleted'
ALTER TYPE review_status ADD VALUE IF NOT EXISTS 'deleted';

-- Update the rate limit function to handle the new logic
DROP FUNCTION IF EXISTS public.can_submit_review_by_ip(inet);

CREATE OR REPLACE FUNCTION public.can_submit_review_by_ip(p_reviewer_ip inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if there's an active approved review from this IP
  IF EXISTS (
    SELECT 1 FROM public.reviews
    WHERE reviewer_ip = p_reviewer_ip
    AND status = 'approved'
  ) THEN
    RETURN false;
  END IF;
  
  -- Check if there's been any review from this IP in the last 12 hours
  IF EXISTS (
    SELECT 1 FROM public.reviews
    WHERE reviewer_ip = p_reviewer_ip
    AND created_at > NOW() - INTERVAL '12 hours'
  ) THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;

-- Update RLS policy to allow anyone to read approved reviews
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
CREATE POLICY "Anyone can read approved reviews"
ON public.reviews
FOR SELECT
TO public
USING (status = 'approved');

-- Add RLS policy to allow deletion by matching IP
CREATE POLICY "Users can delete their own reviews by IP"
ON public.reviews
FOR DELETE
TO public
USING (reviewer_ip = inet(current_setting('request.headers')::json->>'x-forwarded-for'));