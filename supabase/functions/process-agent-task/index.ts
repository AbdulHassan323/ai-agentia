import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getAgentPrompt = (agent: string, objective: string, context: string, additionalFields: any) => {
  switch (agent) {
    case "Competitor Analyst":
      return `As a Competitor Analysis expert, analyze the following competitors:
      ${additionalFields.competitorUrls}
      
      Focus on these metrics: ${additionalFields.targetMetrics}
      Provide a detailed analysis with the following structure:
      1. Overview
      2. Key Findings
      3. Recommendations
      
      Additional Context: ${context}
      Objective: ${objective}`;

    case "Web Page Copy Editor":
      return `As a Web Copy Editor, please edit and improve the following content:
      ${context}
      
      Objective: ${objective}
      
      Provide the edited version with:
      1. Improved copy
      2. SEO recommendations
      3. Readability score`;

    case "AI Content Generator":
      return `As an AI Content Generator, create content based on:
      Objective: ${objective}
      Context: ${context}
      
      Generate content that is:
      1. Engaging and original
      2. SEO-optimized
      3. Formatted in clear sections`;

    default:
      return `As an AI assistant, help with the following task:
      Objective: ${objective}
      Context: ${context}`;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agent, objective, context, ...additionalFields } = await req.json();
    
    console.log('Processing task for agent:', agent.name);
    console.log('Objective:', objective);

    const prompt = getAgentPrompt(agent.name, objective, context, additionalFields);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: `You are ${agent.name}, an AI assistant specialized in ${agent.description}. Format your response in clear, well-structured Markdown.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to process task');
    }

    const data = await response.json();
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