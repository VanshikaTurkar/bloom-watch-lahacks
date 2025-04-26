// src/app/api/chat/route.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"  // note the trailing slash
});

export async function POST(req) {
  const { message } = await req.json();
  if (!message) {
    return new Response(JSON.stringify({ reply: "Please send a valid message." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",   // ← use a supported model ID
      messages: [
        {
          role: "system",
          content: `
          You are MarineBot 🌊 — always reply **entirely in valid Markdown**.
          • Use headings (##, ###) for sections  
          • Use **bold** for key terms  
          • Use bullet lists for examples  
          • No plain-text lists or HTML  
      `
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 200
    });

    const reply = completion.choices?.[0]?.message?.content
      ?? "Sorry, I didn't quite catch that.";
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Gemini API error:", err);
    return new Response(JSON.stringify({
      reply: "MarineBot is currently unavailable. Please try again later."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
