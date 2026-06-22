-- Lock down quote_requests inserts.
--
-- Previously the policy "Anyone can submit quote requests" used
-- WITH CHECK (true) with no TO clause, so the anon role could POST directly
-- to PostgREST (/rest/v1/quote_requests) using the public anon key — bypassing
-- the submit-quote edge function's rate limiting, IP capture, and validation.
--
-- Submissions now MUST go through the submit-quote edge function, which uses
-- the service_role key (service_role bypasses RLS), so the public form keeps
-- working. This mirrors how the reviews table is already protected.

DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;

CREATE POLICY "Quotes must be submitted via edge function"
ON public.quote_requests
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Quotes cannot be inserted directly by authenticated users"
ON public.quote_requests
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Bound column sizes so an attacker (or buggy client) can't pollute the table
-- with arbitrarily large payloads. Mirrors the limits enforced in the edge fn.
ALTER TABLE public.quote_requests
  ADD CONSTRAINT quote_requests_name_len CHECK (char_length(name) <= 100),
  ADD CONSTRAINT quote_requests_email_len CHECK (char_length(email) <= 150),
  ADD CONSTRAINT quote_requests_business_len CHECK (business IS NULL OR char_length(business) <= 150),
  ADD CONSTRAINT quote_requests_service_type_len CHECK (char_length(service_type) <= 60),
  ADD CONSTRAINT quote_requests_project_details_len CHECK (char_length(project_details) <= 5000);
