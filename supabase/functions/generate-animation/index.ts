import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const API_KEY = 'afllm_ai038UovQOvDXkrzT0u90nydCkbno6cu'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const { prompt } = await req.json()

    if (!prompt || prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('Generating animation for prompt:', prompt)

    // Create a detailed prompt for animation generation
    const animationPrompt = `You are an expert CSS animation developer. Create a complete CSS animation based on this description: "${prompt}"

Please provide:
1. HTML structure (simple, semantic)
2. CSS with animations, keyframes, and beautiful styling
3. A brief description of the animation

Make it visually appealing, smooth, and creative. Use modern CSS features like transforms, transitions, and keyframes. Ensure the animation is fluid and eye-catching.

Format your response as JSON with these fields:
- "html": the HTML code
- "css": the CSS code with animations
- "description": brief description of what the animation does

Example format:
{
  "html": "<div class=\"animation-container\">...</div>",
  "css": ".animation-container { ... } @keyframes animationName { ... }",
  "description": "A smooth bouncing ball animation with elastic effects"
}`

    // Call the API
    const response = await fetch('https://apifreellm.com/api/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: animationPrompt
      })
    })

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Response received:', data.status)

    if (data.status !== 'success') {
      throw new Error(data.error || 'API request failed')
    }

    // Try to parse the JSON response from the AI
    let animationData
    try {
      // Extract JSON from the response text
      const jsonMatch = data.response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        animationData = JSON.parse(jsonMatch[0])
      } else {
        // Fallback: create a simple animation if parsing fails
        animationData = {
          html: `<div class="custom-animation">${prompt}</div>`,
          css: `.custom-animation { 
            padding: 20px; 
            border: 2px solid #3498db; 
            border-radius: 10px; 
            animation: pulse 2s infinite; 
          } 
          @keyframes pulse { 
            0%, 100% { transform: scale(1); } 
            50% { transform: scale(1.05); } 
          }`,
          description: `Animation based on: ${prompt}`
        }
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError)
      // Fallback animation
      animationData = {
        html: `<div class="custom-animation">${prompt}</div>`,
        css: `.custom-animation { 
          padding: 20px; 
          border: 2px solid #3498db; 
          border-radius: 10px; 
          animation: bounce 1s infinite; 
        } 
        @keyframes bounce { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }`,
        description: `Animation based on: ${prompt}`
      }
    }

    // Save to database
    const { error: insertError } = await supabaseClient
      .from('prompt_history')
      .insert({
        user_id: user.id,
        prompt: prompt,
        html_output: animationData.html,
        css_output: animationData.css,
        description: animationData.description
      })

    if (insertError) {
      console.error('Failed to save to database:', insertError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        animation: animationData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in generate-animation function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})