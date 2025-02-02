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
    
    // Construct the prompt based on the agent type and task details
    const systemPrompt = `You are ${agent.name}, an AI assistant specialized in ${agent.description}. Always format your responses in clear, well-structured Markdown.`;
    const userPrompt = `Task Objective: ${objective}\nContext: ${context}\n${
      Object.entries(additionalFields)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    }`;

    console.log('Processing task with prompts:', { systemPrompt, userPrompt });

    // Ensure headers are properly constructed as strings
    const openAIHeaders = {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    };

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: openAIHeaders,
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to process task');
    }

    const data = await openAIResponse.json();
    console.log('Received response from OpenAI:', data);
    
    const result = data.choices[0].message.content;

    // Ensure response headers are properly constructed
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
    };

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
      { headers: responseHeaders }
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