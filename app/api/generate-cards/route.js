import { NextResponse } from "next/server";
import Groq from 'groq-sdk';

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
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const data = await req.text();

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192", 
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: data },
            ],
        });

        let responseText = '';

        for await (const chunk of completion) {
            responseText += chunk.choices[0]?.delta?.content || '';
        }

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
