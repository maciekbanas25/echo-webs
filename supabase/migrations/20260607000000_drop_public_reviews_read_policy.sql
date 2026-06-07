-- Security fix: stop exposing the base public.reviews table to anon/authenticated.
--
-- A prior migration (20251104141223) re-added a public SELECT policy on the base
-- reviews table. RLS is row-level, not column-level, so that policy leaked every
-- column of approved reviews — including reviewer_ip (PII) and session_id, which
-- the delete-review edge function treats as the deletion secret. With session_id
-- readable, anyone could enumerate it and delete any review.
--
-- The app reads approved reviews through the public.reviews_public view (which
-- exposes only safe columns), so the base-table policy is unnecessary. Admins
-- still read the full table via the "Admins can view all review details" policy,
-- and the edge functions use the service role which bypasses RLS.

DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
