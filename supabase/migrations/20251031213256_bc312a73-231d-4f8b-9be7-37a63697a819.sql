-- Fix search_path for security functions
CREATE OR REPLACE FUNCTION public.can_submit_review(user_session_id TEXT)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.reviews
    WHERE session_id = user_session_id
    AND created_at > NOW() - INTERVAL '24 hours'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_review_by_session(
  review_id UUID,
  user_session_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted BOOLEAN;
BEGIN
  DELETE FROM public.reviews
  WHERE id = review_id
  AND session_id = user_session_id
  RETURNING true INTO deleted;
  
  RETURN COALESCE(deleted, false);
END;
$$;