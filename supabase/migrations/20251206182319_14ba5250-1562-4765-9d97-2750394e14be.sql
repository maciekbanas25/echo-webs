-- Create quote_requests table to store submissions with ticket numbers
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number SERIAL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT,
  service_type TEXT NOT NULL,
  project_details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form)
CREATE POLICY "Anyone can submit quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view quotes
CREATE POLICY "Only admins can view quote requests" 
ON public.quote_requests 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));