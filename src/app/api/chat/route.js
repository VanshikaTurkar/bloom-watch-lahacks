import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(req) {
  const { message } = await req.json();
  if (!message) {
    return new Response(JSON.stringify({ reply: "Please send a valid message.", suggestions: [] }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: `
You are AlgaeAdvisor 🌊.
When you reply, output a JSON object with two keys:
- "reply": a Markdown-formatted string
- "suggestions": an array of up to 4 suggestions
Wrap it inside \`\`\`json\n ... \`\`\` fences.
`
        },
        { role: "user", content: message }
      ],
      max_tokens: 700  // increased to reduce cutoffs
    });

    let raw = completion.choices?.[0]?.message?.content?.trim() || "";

    // Remove ```json and ``` if they exist
    raw = raw.replace(/^```(?:json)?\s*/, '').replace(/```$/, '').trim();

    let jsonPart;
    try {
      // Try to extract the { ... } if possible
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        jsonPart = JSON.parse(match[0]);
      } else {
        throw new Error("No valid JSON block found.");
      }
    } catch (e) {
      console.warn("Incomplete or broken JSON:", e);
      // Fallback if parsing failed
      return new Response(
        JSON.stringify({ reply: raw, suggestions: [] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        reply: jsonPart.reply ?? raw,
        suggestions: Array.isArray(jsonPart.suggestions) ? jsonPart.suggestions : []
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("OpenAI error:", err);
    return new Response(
      JSON.stringify({ reply: "AlgaeAdvisor is unavailable.", suggestions: [] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
