// Deploy in Supabase Dashboard → Edge Functions → contact-info
// Set "Enforce JWT Verification" to OFF

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log('Contact info received:', JSON.stringify(body))

    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          tool_response: {
            status: "failed",
            error: "Missing required fields: name, email, and message are required."
          }
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Store in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error } = await supabase.from('contacts').insert({
      name,
      email,
      phone: phone || null,
      project_type: 'ai-agent-referral',
      message,
    })

    if (error) {
      console.error('DB insert error:', error)
      return new Response(
        JSON.stringify({
          success: false,
          tool_response: { status: "failed", error: "Failed to store contact info." }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact information has been saved. The JABV Labs team will reach out within 24 hours.",
        tool_response: {
          status: "completed",
          message: "Contact information saved successfully. The team will follow up within 24 hours."
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        tool_response: { status: "failed", error: error.message }
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
