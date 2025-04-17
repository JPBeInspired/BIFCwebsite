import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "npm:emailjs@4.0.3";

const GMAIL_USER = "jakep@beinspired.fitness";
const GMAIL_APP_PASSWORD = "kwsg gvbx xxkk vzuw";
const FORWARD_TO_EMAIL = "jakep@beinspired.fitness";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, message, source, product_id, business_name, prefer_call } = await req.json();

    const client = new SMTPClient({
      user: GMAIL_USER,
      password: GMAIL_APP_PASSWORD,
      host: "smtp.gmail.com",
      port: 587,
      tls: true,
      timeout: 10000,
    });

    // Prepare email content with HTML formatting
    const emailContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #00B4D8;">New Contact Form Submission</h2>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${business_name ? `<p><strong>Business:</strong> ${business_name}</p>` : ''}
    ${product_id ? `<p><strong>Product/Service:</strong> ${product_id}</p>` : ''}
    <p><strong>Prefers Phone Call:</strong> ${prefer_call ? 'Yes' : 'No'}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
</body>
</html>`.trim();

    // Send email
    await client.send({
      from: GMAIL_USER,
      to: FORWARD_TO_EMAIL,
      subject: `New Contact Form Submission: ${source}`,
      text: `New submission from ${name} (${email})`,
      attachment: [
        {
          data: emailContent,
          alternative: true
        }
      ]
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});