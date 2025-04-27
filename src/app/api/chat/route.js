// src/app/api/chat/route.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Helper: reliably extract a single JSON object from messy raw text
function extractJSON(raw) {
  let inString = false;
  let escapeNext = false;
  let depth = 0;
  let start = -1;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (!inString) {
      if (ch === "{") {
        if (depth === 0) start = i;
        depth++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0 && start !== -1) {
          return raw.slice(start, i + 1);
        }
      } else if (ch === '"') {
        inString = true;
      }
    } else {
      if (escapeNext) {
        escapeNext = false;
      } else if (ch === "\\") {
        escapeNext = true;
      } else if (ch === '"') {
        inString = false;
      }
    }
  }
  return null;
}

export async function POST(req) {
  const { message } = await req.json();
  if (!message) {
    return new Response(
      JSON.stringify(
        { reply: "Please send a valid message.", suggestions: [] },
        null,
        2
      ),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: `
You are AlgaeAdvisor 🌊.
Respond only with a JSON object, for example:

\`\`\`json
{
  "reply": "## What are algae blooms?\\nThey are…",
  "suggestions": ["What causes them?", "Are they harmful?"]
}
\`\`\`

The server will strip any code fences and extract the JSON automatically.
`
        },
        { role: "user", content: message }
      ],
      max_tokens: 300
    });

    // 1) Get raw content (may include ```fences```)
    let raw = completion.choices?.[0]?.message?.content || "";

    // 2) Strip only the outer code fences, preserving inner braces
    raw = raw
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

    // 3) Extract well-formed JSON substring
    const jsonText = extractJSON(raw) || raw;

    // 4) Parse JSON, fallback to raw reply
    let payload;
    try {
      payload = JSON.parse(jsonText);
    } catch (e) {
      console.warn("JSON.parse failed:", e);
      payload = { reply: raw, suggestions: [] };
    }

    const output = {
      reply: payload.reply,
      suggestions: Array.isArray(payload.suggestions) ? payload.suggestions : []
    };

    // 5) Return pretty-printed JSON
    return new Response(JSON.stringify(output, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("OpenAI error:", err);
    return new Response(
      JSON.stringify(
        { reply: "AlgaeAdvisor is unavailable.", suggestions: [] },
        null,
        2
      ),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
