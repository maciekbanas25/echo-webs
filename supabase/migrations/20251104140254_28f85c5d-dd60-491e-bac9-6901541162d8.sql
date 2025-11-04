-- Update the rate limiting function to allow immediate resubmission after deletion
CREATE OR REPLACE FUNCTION public.can_submit_review_by_ip(p_reviewer_ip inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only check if there's an active approved review from this IP
  -- No time-based restriction - users can resubmit immediately after deletion
  IF EXISTS (
    SELECT 1 FROM public.reviews
    WHERE reviewer_ip = p_reviewer_ip
    AND status = 'approved'
  ) THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;