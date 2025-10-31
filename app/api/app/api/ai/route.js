import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ ok: false, error: "Prompt required" }, { status: 400 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || "gpt-4o-mini";
    if (!openaiKey) {
      return NextResponse.json({ ok: false, error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    // سطران لتفعيل الترجمة التلقائية للعربية والعبرية قبل البناء
    const langNote =
      "If the user's text is in Arabic or Hebrew, first translate it to fluent English for coding (preserve technical terms), then proceed.";
    const systemPrompt =
      (process.env.AI_SYSTEM_PROMPT ||
        "You are NovaForge AI, a developer that builds complete web apps using Next.js + Tailwind + Supabase.") +
      "\n\n" +
      langNote;

    const normalizedPrompt = USER_REQUEST:\n${prompt}\n\nREQUIREMENT:\n- If input is Arabic/Hebrew, translate internally to English then implement.\n- Return the generated plan/code clearly.;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${openaiKey},
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: normalizedPrompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await aiResponse.json();
    const output = data?.choices?.[0]?.message?.content || "";

    return NextResponse.json({ ok: true, result: output });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
