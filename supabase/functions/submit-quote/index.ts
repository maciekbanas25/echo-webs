// Edge function to handle quote form submissions
// Sends email via Resend and stores request in database
//
// Required secret: RESEND_API_KEY
// Get your API key at: https://resend.com/api-keys
// Make sure to verify your domain at: https://resend.com/domains

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
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
    const { name, email, business, serviceType, projectDetails }: QuoteRequest = await req.json();

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert quote request into database
    const { data: quoteData, error: dbError } = await supabase
      .from("quote_requests")
      .insert({
        name,
        email,
        business: business || null,
        service_type: serviceType,
        project_details: projectDetails,
      })
      .select("ticket_number")
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save quote request");
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

    console.log("Email sent successfully:", emailResponse);

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
    console.error("Error in submit-quote function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
