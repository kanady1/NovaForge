import { NextResponse } from "next/server";
import { getClient } from "../../../lib/openai.js";

export async function POST(req){
  const { prompt, lang } = await req.json();
  const client = getClient();

  const sys = "Return ONLY complete HTML (with inline CSS) for a beautiful landing page. Use elegant dark theme, rounded cards, gradient buttons, Arabic/English/Hebrew text if asked.";
  const msg = `Make a landing page for: ${prompt}. Language preference: ${lang}. Include a hero section, features grid, and CTA buttons.`

  const r = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [ {role:"system", content: sys}, {role:"user", content: msg} ],
    max_tokens: 1400
  });

  const html = r.choices?.[0]?.message?.content || "<div>No output</div>";
  return NextResponse.json({ html });
}
