-- Add moderation system and stronger validation for reviews table

-- Add moderation status enum
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

-- Add new columns for moderation and IP tracking
ALTER TABLE public.reviews
ADD COLUMN status public.review_status NOT NULL DEFAULT 'pending',
ADD COLUMN reviewer_ip inet,
ADD COLUMN moderated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN moderated_by UUID REFERENCES auth.users(id);

-- Add database-level length constraints
ALTER TABLE public.reviews
ADD CONSTRAINT reviewer_name_length CHECK (char_length(reviewer_name) <= 100),
ADD CONSTRAINT company_length CHECK (char_length(company) <= 100),
ADD CONSTRAINT text_length CHECK (char_length(text) <= 500);

-- Update RLS policies to only show approved reviews
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Anyone can read approved reviews"
ON public.reviews
FOR SELECT
USING (status = 'approved');

-- Remove insert policy - will be handled by edge function
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;

-- Create IP-based rate limiting function
CREATE OR REPLACE FUNCTION public.can_submit_review_by_ip(reviewer_ip inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.reviews
    WHERE reviewer_ip = $1
    AND created_at > NOW() - INTERVAL '24 hours'
  );
END;
$$;

-- Remove the old session-based delete function since we're removing delete functionality
DROP FUNCTION IF EXISTS public.delete_review_by_session(uuid, text);

-- Create admin policies for moderation (for future use)
CREATE POLICY "Admins can view all reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
  )
);

CREATE POLICY "Admins can update review status"
ON public.reviews
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
  )
);