-- Add submitter_ip column to quote_requests for rate limiting
ALTER TABLE public.quote_requests 
ADD COLUMN submitter_ip inet;

-- Create function to check if IP can submit a quote (rate limit: 1 per 5 minutes)
CREATE OR REPLACE FUNCTION public.can_submit_quote_by_ip(p_submitter_ip inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if there's a recent submission from this IP within the last 5 minutes
  IF EXISTS (
    SELECT 1 FROM public.quote_requests
    WHERE submitter_ip = p_submitter_ip
    AND created_at > NOW() - INTERVAL '5 minutes'
  ) THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;