import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agent, objective, context, ...additionalFields } = await req.json();
    
    // Construct the prompt based on the agent type and task details
    let systemPrompt = `You are ${agent.name}, an AI assistant specialized in ${agent.description}. `;
    let userPrompt = `Task Objective: ${objective}\nContext: ${context}\n`;
    
    // Add any additional fields to the prompt
    Object.entries(additionalFields).forEach(([key, value]) => {
      if (value) {
        userPrompt += `\n${key}: ${value}`;
      }
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to process task');
    }

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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});