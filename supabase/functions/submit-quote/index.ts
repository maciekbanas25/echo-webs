// Edge function to handle quote form submissions
// Sends email via Resend and stores request in database
//
// Required secret: RESEND_API_KEY
// Get your API key at: https://resend.com/api-keys
// Make sure to verify your domain at: https://resend.com/domains

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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

    // Validate email format — the confirmation email is sent to this address,
    // so reject anything that isn't a plausible address to avoid sending
    // EchoWebs-branded mail to garbage/spoofed recipients.
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || email.length > 150 || !emailRe.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Bound field lengths (defence-in-depth alongside the DB CHECK constraints)
    // so oversized payloads can't pollute the database.
    if (
      name.length > 100 ||
      (business && business.length > 150) ||
      serviceType.length > 60 ||
      projectDetails.length > 5000
    ) {
      return new Response(
        JSON.stringify({ error: "One or more fields exceed the allowed length" }),
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

    // Escape user-supplied values before interpolating into email HTML so a
    // submission can't inject markup (links/images) into the emails we send.
    const esc = (input: string | undefined | null): string =>
      (input ?? "").replace(/[<>"'&]/g, (char) => {
        const entities: Record<string, string> = {
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "&": "&amp;",
        };
        return entities[char];
      });

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeBusiness = business ? esc(business) : "Not provided";
    const safeProjectDetails = esc(projectDetails);

    // Service type display mapping
    const serviceTypeDisplay: Record<string, string> = {
      starter: "Starter Site (Single Page)",
      premium: "Premium Website (Multi-page)",
      ecommerce: "E-Commerce Website",
      booking: "Booking Integration",
      redesign: "Website Redesign",
      other: "Other / Not Sure",
    };

    // Send notification email to you (the business owner) — best-effort only.
    // The lead is already saved above; a failed/unconfigured email must NOT
    // fail the request or block the visitor.
    // UPDATE THIS EMAIL to your verified domain email when ready
    try {
      const resendKey = Deno.env.get("RESEND_API_KEY");
      if (!resendKey) {
        console.log("RESEND_API_KEY not set — skipping email notification (quote still saved)");
      } else {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "EchoWebs <contact@echowebs.co.uk>", // verified Resend domain sender
            to: ["contact@echowebs.co.uk"], // Your email address
            subject: `New quote request - ${ticketRef}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f1f5f9;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
            <div style="background-color:#3B82F6;background:linear-gradient(135deg,#3B82F6 0%,#06B6D4 100%);padding:28px 24px;text-align:center;">
              <img src="https://echowebs.co.uk/email-logo.png" alt="EchoWebs" width="52" height="52" style="display:inline-block;background:#ffffff;border-radius:12px;padding:6px;" />
              <div style="color:#ffffff;font-size:20px;font-weight:bold;margin-top:10px;">EchoWebs</div>
            </div>
            <div style="padding:28px;">
              <h1 style="color:#0f172a;font-size:22px;margin:0 0 4px 0;">New quote request</h1>
              <p style="color:#64748b;font-size:14px;margin:0 0 20px 0;">Reference: <strong style="color:#3B82F6;">${ticketRef}</strong></p>
              <table style="width:100%;border-collapse:collapse;">
                <tr style="border-bottom:1px solid #e5e7eb;">
                  <td style="padding:12px 0;color:#94a3b8;width:120px;">Name</td>
                  <td style="padding:12px 0;color:#0f172a;">${safeName}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e7eb;">
                  <td style="padding:12px 0;color:#94a3b8;">Email</td>
                  <td style="padding:12px 0;"><a href="mailto:${safeEmail}" style="color:#3B82F6;">${safeEmail}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #e5e7eb;">
                  <td style="padding:12px 0;color:#94a3b8;">Business</td>
                  <td style="padding:12px 0;color:#0f172a;">${safeBusiness}</td>
                </tr>
                <tr style="border-bottom:1px solid #e5e7eb;">
                  <td style="padding:12px 0;color:#94a3b8;">Service</td>
                  <td style="padding:12px 0;color:#0f172a;">${esc(serviceTypeDisplay[serviceType] || serviceType)}</td>
                </tr>
              </table>
              <div style="margin-top:20px;padding:16px;background-color:#eff6ff;border-radius:8px;">
                <h3 style="color:#0f172a;margin:0 0 8px 0;font-size:15px;">Project details</h3>
                <p style="color:#334155;line-height:1.6;margin:0;white-space:pre-wrap;">${safeProjectDetails}</p>
              </div>
              <p style="color:#94a3b8;font-size:12px;margin:28px 0 0 0;text-align:center;">
                Submitted via the EchoWebs contact form.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
          }),
        });
        if (!emailRes.ok) {
          console.error("Resend API error (quote still saved):", emailRes.status, await emailRes.text());
        } else {
          console.log("Notification email sent for", ticketRef);
        }

        // Confirmation email to the customer (best-effort).
        const confirmRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "EchoWebs <contact@echowebs.co.uk>",
            to: [email],
            subject: `We've received your request - ${ticketRef}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f1f5f9;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
            <div style="background-color:#3B82F6;background:linear-gradient(135deg,#3B82F6 0%,#06B6D4 100%);padding:28px 24px;text-align:center;">
              <img src="https://echowebs.co.uk/email-logo.png" alt="EchoWebs" width="52" height="52" style="display:inline-block;background:#ffffff;border-radius:12px;padding:6px;" />
              <div style="color:#ffffff;font-size:20px;font-weight:bold;margin-top:10px;">EchoWebs</div>
            </div>
            <div style="padding:28px;">
              <h1 style="color:#0f172a;font-size:22px;margin:0 0 12px 0;">Thanks, ${safeName}! &#128075;</h1>
              <p style="color:#334155;line-height:1.6;margin:0 0 14px 0;">I've received your request and I'll personally get back to you within 24 hours.</p>
              <p style="color:#64748b;font-size:14px;margin:0 0 20px 0;">Your reference number is <strong style="color:#3B82F6;">${ticketRef}</strong> &mdash; quote it if you need to follow up.</p>
              <div style="padding:16px;background-color:#eff6ff;border-radius:8px;">
                <p style="color:#334155;line-height:1.6;margin:0;"><strong>What you asked about:</strong><br/>${esc(serviceTypeDisplay[serviceType] || serviceType)}</p>
              </div>
              <p style="color:#94a3b8;font-size:12px;margin:28px 0 0 0;">
                EchoWebs &middot; Professional web design for small businesses<br/>
                <a href="https://echowebs.co.uk" style="color:#3B82F6;">echowebs.co.uk</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
          }),
        });
        if (!confirmRes.ok) {
          console.error("Customer confirmation email failed:", confirmRes.status, await confirmRes.text());
        } else {
          console.log("Confirmation email sent to customer for", ticketRef);
        }
      }
    } catch (emailError: any) {
      console.error("Email notification failed (quote still saved):", emailError?.message || emailError);
    }

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
