// Deploy this in Supabase Dashboard → Edge Functions → redirect-to-contact
// This version removes auth requirements so ElevenLabs can call it directly.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json().catch(() => ({}))
    console.log('ElevenLabs redirect request:', JSON.stringify(body))

    // Return the exact format ElevenLabs expects
    return new Response(
      JSON.stringify({
        success: true,
        message: "User will be redirected to the JABV Labs contact form for a personalized consultation.",
        redirect_url: "https://jabvlabs.com/contact",
        tool_response: {
          status: "completed",
          redirect_url: "https://jabvlabs.com/contact",
          message: "User will be redirected to the JABV Labs contact form for a personalized consultation."
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        tool_response: { status: "failed", error: error.message }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
