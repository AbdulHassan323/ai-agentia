import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agent, objective, context, ...additionalFields } = await req.json();
    
    // Log incoming request data for debugging
    console.log('Processing task for agent:', agent.name);
    console.log('Objective:', objective);

    // Construct the prompt
    const systemPrompt = `You are ${agent.name}, an AI assistant specialized in ${agent.description}. Format your response in clear, well-structured Markdown.`;
    const userPrompt = `
Task Objective: ${objective}
Context: ${context}
${Object.entries(additionalFields)
  .filter(([_, value]) => value)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}
    `;

    console.log('Sending request to OpenAI with prompt:', { systemPrompt, userPrompt });

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',  // Changed from gpt-4o-mini to gpt-3.5-turbo
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to process task');
    }

    const data = await openAIResponse.json();
    console.log('Received response from OpenAI');
    
    const result = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        success: true, 
        result,
        taskDetails: {
          agent: agent.name,
          objective,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error processing agent task:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});