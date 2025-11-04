-- Allow anonymous users to read approved reviews (but use the view to hide sensitive fields)
CREATE POLICY "Anyone can read approved reviews"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (status = 'approved'::review_status);