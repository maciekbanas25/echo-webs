// Edge function to handle quote form submissions
// Sends email via Resend and stores request in database
//
// Required secret: RESEND_API_KEY
// Get your API key at: https://resend.com/api-keys
// Make sure to verify your domain at: https://resend.com/domains

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  email: string;
  business?: string;
  serviceType: string;
  projectDetails: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    const { name, email, business, serviceType, projectDetails }: QuoteRequest = await req.json();

    // Basic input validation
    if (!name || !email || !serviceType || !projectDetails) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Rate limiting: Check if this IP can submit (1 per 5 minutes)
    if (clientIP !== "unknown") {
      const { data: canSubmit, error: rateLimitError } = await supabase
        .rpc("can_submit_quote_by_ip", { p_submitter_ip: clientIP });

      if (rateLimitError) {
        console.error("Rate limit check error:", rateLimitError);
        // Continue if rate limit check fails - don't block legitimate requests
      } else if (!canSubmit) {
        console.log(`Rate limit exceeded for IP: ${clientIP}`);
        return new Response(
          JSON.stringify({ 
            error: "Please wait a few minutes before submitting another request" 
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    }

    // Insert quote request into database with IP for rate limiting
    const { data: quoteData, error: dbError } = await supabase
      .from("quote_requests")
      .insert({
        name,
        email,
        business: business || null,
        service_type: serviceType,
        project_details: projectDetails,
        submitter_ip: clientIP !== "unknown" ? clientIP : null,
      })
      .select("ticket_number")
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to submit your request. Please try again." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format ticket number as TKT-00XXX
    const ticketRef = `TKT-${String(quoteData.ticket_number).padStart(5, "0")}`;

    // Service type display mapping
    const serviceTypeDisplay: Record<string, string> = {
      starter: "Starter Site (Single Page)",
      premium: "Premium Website (Multi-page)",
      ecommerce: "E-Commerce Website",
      redesign: "Website Redesign",
      other: "Other / Not Sure",
    };

    // Send notification email to you (the business owner)
    // UPDATE THIS EMAIL to your verified domain email when ready
    const emailResponse = await resend.emails.send({
      from: "EchoWebs <onboarding@resend.dev>", // Update to your verified domain
      to: ["echowebs25@gmail.com"], // Your email address
      subject: `New Quote Request - ${ticketRef}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Quote Request
          </h1>
          <p style="color: #666; font-size: 14px;">Reference: <strong>${ticketRef}</strong></p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888; width: 120px;">Name:</td>
              <td style="padding: 12px 0; color: #333;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888;">Email:</td>
              <td style="padding: 12px 0; color: #333;">
                <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888;">Business:</td>
              <td style="padding: 12px 0; color: #333;">${business || "Not provided"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 0; color: #888;">Service Type:</td>
              <td style="padding: 12px 0; color: #333;">${serviceTypeDisplay[serviceType] || serviceType}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Project Details:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${projectDetails}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This quote request was submitted via EchoWebs contact form.
          </p>
        </div>
      `,
    });

    console.log("Quote submitted successfully:", ticketRef);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ticketRef,
        message: "Quote request submitted successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-quote function:", error?.message || error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
