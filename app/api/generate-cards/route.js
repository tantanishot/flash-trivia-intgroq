import Groq from 'groq-sdk';

const systemPrompt = `You are a flashcard creator. Create exactly 10 flashcards from the given topic. Both front and back should be one sentence long.`;

export async function POST(req) {
  try {
    const { topic } = await req.json();
    
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Create flashcards about ${topic}` }
      ],
      model: 'llama3-70b-8192',
    });

    let response = '';
    for await (const chunk of completion) {
      response += chunk.choices[0]?.delta?.content || '';
    }

    return new Response(JSON.stringify({ flashcards: JSON.parse(response) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
