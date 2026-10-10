-- Outreach previews + opt-outs (EchoWebs Hub outreach engine).
--
-- The hub keeps all lead data on my own machine. Only what a public preview
-- page needs is published here: business name, town, inferred services,
-- public phone, template + palette. Opt-outs from the public unsubscribe page
-- are recorded here and pulled back by the hub.
--
-- Deny-by-default: RLS on, no policies, privileges revoked from anon and
-- authenticated. Only the preview / unsubscribe / outreach-sync edge
-- functions (service role) touch these tables.

CREATE TABLE public.outreach_previews (
  slug             text PRIMARY KEY CHECK (slug ~ '^[a-z0-9-]{8,80}$'),
  template         text NOT NULL CHECK (template IN ('barber', 'detailer', 'cafe', 'photographer', 'generic')),
  data             jsonb NOT NULL CHECK (octet_length(data::text) <= 20000),
  views_count      integer NOT NULL DEFAULT 0,
  first_viewed_at  timestamptz,
  last_viewed_at   timestamptz,
  published_at     timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.outreach_optouts (
  token       text PRIMARY KEY CHECK (token ~ '^[A-Za-z0-9_-]{16,64}$'),
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.outreach_previews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_optouts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.outreach_previews FROM anon, authenticated;
REVOKE ALL ON public.outreach_optouts FROM anon, authenticated;

-- Atomic view count, throttled to one per 20s per preview so refreshes and
-- link scanners can't inflate it. Called only by the preview edge function.
CREATE OR REPLACE FUNCTION public.outreach_record_view(p_slug text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.outreach_previews
  SET views_count = views_count + 1,
      first_viewed_at = COALESCE(first_viewed_at, now()),
      last_viewed_at = now()
  WHERE slug = p_slug
    AND (last_viewed_at IS NULL OR last_viewed_at < now() - interval '20 seconds');
$$;
REVOKE ALL ON FUNCTION public.outreach_record_view(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.outreach_record_view(text) TO service_role;
