export async function POST(req) {
  const { message } = await req.json();
  if (!message) {
    return new Response(
      JSON.stringify({ reply: "Please send a valid message.", suggestions: [] }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `
You are AlgaeAdvisor 🌊.
When you reply, output a JSON object with two keys:
- "reply": a Markdown-formatted string
- "suggestions": an array of up to 4 suggestions
Wrap your entire reply inside \`\`\`json\n...\`\`\` fences.
Here is the user's question: ${message}
          ` }]
          }
        ]
      })
    });

    const geminiData = await geminiRes.json();
    let raw = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Clean up ```json ... ``` fences
    raw = raw.replace(/^```(?:json)?\s*/, '').replace(/```$/, '').trim();

    let jsonPart;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        jsonPart = JSON.parse(match[0]);
      } else {
        throw new Error("No valid JSON block found.");
      }
    } catch (e) {
      console.warn("Broken or incomplete JSON from Gemini:", e);
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
    console.error("Gemini API error:", err);
    return new Response(
      JSON.stringify({ reply: "AlgaeAdvisor is temporarily unavailable.", suggestions: [] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
