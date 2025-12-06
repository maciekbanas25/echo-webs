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

// Generate a secure session ID for review ownership verification
const generateSessionId = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

serve(async (req) => {
  console.log('Submit review function called');
  
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
    console.log('Checking rate limit for IP:', clientIp);
    const { data: canSubmit, error: rpcError } = await supabaseClient.rpc('can_submit_review_by_ip', {
      p_reviewer_ip: clientIp
    });

    if (rpcError) {
      console.error('Rate limit check error:', rpcError.message);
    }

    console.log('Rate limit check result:', { canSubmit });

    if (!canSubmit) {
      console.log('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          message: 'You already have an active review. Please delete your existing review before submitting a new one.'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate a secure session ID for review ownership
    const sessionId = generateSessionId();

    console.log('Rate limit check passed, inserting review');

    // Insert review with approved status (direct posting)
    const { data: insertData, error: insertError } = await supabaseClient
      .from('reviews')
      .insert({
        rating: body.rating,
        text: sanitizedText,
        reviewer_name: sanitizedName,
        company: sanitizedCompany,
        reviewer_ip: clientIp,
        status: 'approved',
        session_id: sessionId
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to submit review' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Review submitted successfully!',
        reviewId: insertData?.id,
        sessionId: sessionId // Return session ID to client for deletion capability
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Submit review error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
