import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Delete review function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { reviewId, sessionId } = await req.json();

    if (!reviewId) {
      console.log('Missing review ID');
      return new Response(
        JSON.stringify({ error: 'Review ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!sessionId) {
      console.log('Missing session ID');
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Attempting to delete review:', reviewId, 'with session:', sessionId);

    // Verify the review belongs to this session before deleting
    // Session ID is stored server-side and cannot be spoofed like IP headers
    const { data: review, error: fetchError } = await supabaseClient
      .from('reviews')
      .select('session_id')
      .eq('id', reviewId)
      .single();

    if (fetchError || !review) {
      console.log('Review not found:', fetchError?.message);
      return new Response(
        JSON.stringify({ error: 'Review not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if session ID matches - this is more secure than IP-based auth
    if (review.session_id !== sessionId) {
      console.log('Session mismatch - unauthorized deletion attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized to delete this review' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Set review status to deleted (keep record for rate limiting)
    const { error: updateError } = await supabaseClient
      .from('reviews')
      .update({ status: 'deleted' })
      .eq('id', reviewId);

    if (updateError) {
      console.error('Error updating review:', updateError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to delete review' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Review deleted successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Review deleted successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Delete review error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
