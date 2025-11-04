-- Fix security issues found in scan

-- 1. Create a secure view that hides sensitive PII fields (IP addresses, session IDs)
CREATE OR REPLACE VIEW public.reviews_public AS
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

-- 2. Drop the existing public SELECT policy on reviews
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;

-- 3. Create a new policy that only allows reading through admin role or via the secure view
CREATE POLICY "Admins can view all review details"
ON public.reviews
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Block direct INSERT attempts (force use of edge function)
CREATE POLICY "Reviews must be submitted via edge function"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Reviews cannot be inserted directly by anonymous users"
ON public.reviews
FOR INSERT
TO anon
WITH CHECK (false);

-- 5. Drop the vulnerable DELETE policy (deletion only via edge function now)
DROP POLICY IF EXISTS "Users can delete their own reviews by IP" ON public.reviews;

-- Note: The edge functions use service_role_key which bypasses RLS,
-- so submissions and deletions will continue to work securely through the API