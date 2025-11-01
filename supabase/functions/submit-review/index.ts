import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReviewSubmission {
  rating: number;
  text?: string;
  reviewer_name?: string;
  company?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get client IP address for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Parse and validate request body
    const body: ReviewSubmission = await req.json();

    // Server-side validation
    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Rating must be between 1 and 5' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate string lengths
    if (body.reviewer_name && body.reviewer_name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name must be less than 100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.company && body.company.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Company must be less than 100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.text && body.text.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Review text must be less than 500 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Comprehensive HTML sanitization function
    const sanitize = (input: string | undefined): string | null => {
      if (!input) return null;
      return input
        .trim()
        .replace(/[<>\"'&]/g, (char) => {
          const entities: Record<string, string> = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '&': '&amp;'
          };
          return entities[char];
        });
    };

    // Sanitize inputs with proper HTML entity encoding
    const sanitizedText = sanitize(body.text);
    const sanitizedName = sanitize(body.reviewer_name);
    const sanitizedCompany = sanitize(body.company);

    // Check IP-based rate limiting
    const { data: canSubmit } = await supabaseClient.rpc('can_submit_review_by_ip', {
      reviewer_ip: clientIp
    });

    if (!canSubmit) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          message: 'You can only submit one review per 24 hours. Please try again later.'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert review with pending status
    const { error: insertError } = await supabaseClient
      .from('reviews')
      .insert({
        rating: body.rating,
        text: sanitizedText,
        reviewer_name: sanitizedName,
        company: sanitizedCompany,
        reviewer_ip: clientIp,
        status: 'pending',
        session_id: null
      });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to submit review' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Review submitted successfully and pending approval'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});