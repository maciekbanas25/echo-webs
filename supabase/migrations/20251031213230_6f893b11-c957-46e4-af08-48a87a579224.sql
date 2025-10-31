-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  reviewer_name TEXT,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
CREATE POLICY "Anyone can read reviews"
ON public.reviews FOR SELECT
TO public
USING (true);

-- Allow anyone to insert reviews (rate limiting handled by function)
CREATE POLICY "Anyone can insert reviews"
ON public.reviews FOR INSERT
TO public
WITH CHECK (true);

-- Create function to check if user can submit review (24 hour rate limit)
CREATE OR REPLACE FUNCTION public.can_submit_review(user_session_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.reviews
    WHERE session_id = user_session_id
    AND created_at > NOW() - INTERVAL '24 hours'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to delete review by session
CREATE OR REPLACE FUNCTION public.delete_review_by_session(
  review_id UUID,
  user_session_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  deleted BOOLEAN;
BEGIN
  DELETE FROM public.reviews
  WHERE id = review_id
  AND session_id = user_session_id
  RETURNING true INTO deleted;
  
  RETURN COALESCE(deleted, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add check constraint for rate limiting on insert
ALTER TABLE public.reviews ADD CONSTRAINT reviews_rate_limit_check
CHECK (can_submit_review(session_id));

-- Create index for faster queries
CREATE INDEX idx_reviews_session_created ON public.reviews(session_id, created_at DESC);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);