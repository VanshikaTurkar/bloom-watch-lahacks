import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { keywords, location } = await req.json();

  if (!keywords) {
    return new Response(
      JSON.stringify({ error: "Keywords are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-04-17"
    });

    const chat = model.startChat({
      history: [],
      generationConfig: { maxOutputTokens: 1024 },
    });

    const prompt = `
Based on the following report details, generate a short 1-2 sentence natural-sounding descriptio about a algae bloom,  animal, or general siting:

- Keywords: ${keywords}
- Location: ${location || "Unknown location"}

Focus on writing it clearly and concisely for a real-world incident report made by a citizen. Avoid any formatting like ** or ##.
    `.trim();

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const description = response.text();

    return new Response(
      JSON.stringify({ description }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate description." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
