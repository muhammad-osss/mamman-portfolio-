import Anthropic from "@anthropic-ai/sdk";
import { assistantKnowledge } from "@/lib/data";

// This route runs server-side only. The Anthropic API key never reaches the
// browser. Set ANTHROPIC_API_KEY in your deployment environment (.env.local
// for local dev, project settings on Vercel).

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          error:
            "The assistant isn't configured yet. Add ANTHROPIC_API_KEY to your environment to enable it.",
        },
        { status: 503 }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Keep the conversation short and bounded to control cost/latency
    const trimmed = messages.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 2000),
    }));

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: assistantKnowledge,
      messages: trimmed,
    });

    const text = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n")
      .trim();

    return Response.json({ reply: text });
  } catch (err) {
    console.error("Assistant API error:", err);
    return Response.json(
      { error: "The assistant hit a snag. Please try again in a moment." },
      { status: 500 }
    );
  }
}
