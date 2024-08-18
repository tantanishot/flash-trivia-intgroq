
//i tried changing it to server.js but i dont think i shoudl do that
import { NextResponse } from 'next/server.js';
import Groq from 'groq-sdk';

// Define the system prompt for flashcard generation
const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards 
based on the given topic or content.
Follow these guidelines:
Return in the following JSON format:
{
    "flashcards": [
        {
            "front": "string",
            "back": "string"
        }
    ]
}
`;

export async function POST(req) {
    try {
        console.log("Starting API route...");
        const apiKey = process.env.GROQ_API_KEY;
        
      
        if (!apiKey) {
            console.error("Missing GROQ_API_KEY.");
            return NextResponse.json({ error: "GROQ_API_KEY is missing" }, { status: 500 });
        }

        const groq = new Groq({ apiKey });

        
        const { topic } = await req.json();
        console.log("Received topic:", topic);

        
        if (!topic) {
            console.error("Topic is missing.");
            return NextResponse.json({ error: "Topic is required" }, { status: 400 });
        }

       
        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192", // Check if the model is valid
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: topic },
            ],
        });

        
        console.log('Response from Groq:', completion);

       
        let responseText = completion.choices[0]?.message?.content || '';

        console.log('Parsed response text from Groq:', responseText);

       
        let flashcards;
        try {
            flashcards = JSON.parse(responseText);
        } catch (e) {
            console.error("Failed to parse JSON from Groq response:", responseText);
            return NextResponse.json({ error: "Failed to parse JSON from Groq response" }, { status: 500 });
        }

        return NextResponse.json(flashcards.flashcards, { status: 200 });

    } catch (error) {
        console.error("Error in processing the request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
