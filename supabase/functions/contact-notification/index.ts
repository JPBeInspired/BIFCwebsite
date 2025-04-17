import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the request payload
    const { record } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Send email notification
    const { error: emailError } = await supabaseClient
      .from('supabase_functions_mail_queue')
      .insert([
        {
          to: 'contact@beinspired.fitness',
          subject: `New Contact Form Submission: ${record.source}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${record.name}</p>
            <p><strong>Email:</strong> ${record.email}</p>
            ${record.phone ? `<p><strong>Phone:</strong> ${record.phone}</p>` : ''}
            ${record.business_name ? `<p><strong>Business:</strong> ${record.business_name}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${record.message}</p>
            ${record.product_id ? `<p><strong>Product/Service:</strong> ${record.product_id}</p>` : ''}
            <p><strong>Prefers Phone Call:</strong> ${record.prefer_call ? 'Yes' : 'No'}</p>
            <p><strong>Source:</strong> ${record.source}</p>
          `,
        },
      ]);

    if (emailError) throw emailError;

    return new Response(
      JSON.stringify({ message: 'Notification sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});