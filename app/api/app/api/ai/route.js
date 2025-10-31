// app/api/ai/route.js
import { NextResponse } from "next/server";
import { commitFile } from "../../../lib/github.js";
import { triggerDeploy } from "../../../lib/vercel.js";

/**
 * POST /api/ai
 * body: { prompt: string, slug?: string }
 * - يرسل الطلب لنموذج الذكاء
 * - ينشئ ملف مشروع Markdown في مجلد projects
 * - يطلب نشر Vercel (اختياري)
 */
export async function POST(req) {
  try {
    const { prompt = "", slug = "" } = await req.json();

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { ok: false, error: "prompt is required" },
        { status: 400 }
      );
    }

    // ترجمة تلقائية إن لزم عبر متغيرات البيئة (اختياري)
    const langNote =
      process.env.AI_TRANSLATE_AR === "true"
        ? "User may write in Arabic. If Arabic is detected, translate to English first, then produce code."
        : "";

    const systemPrompt =
      process.env.AI_SYSTEM_PROMPT ||
      "You are NovaForge AI, a developer that builds complete web apps using Next.js + Tailwind + Supabase.";

    const model = process.env.AI_MODEL || "gpt-4o-mini";
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      return NextResponse.json(
        { ok: false, error: "OPENAI_API_KEY is missing" },
        { status: 500 }
      );
    }

    // نرسل الطلب لواجهة OpenAI الرسمية
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${openaiKey},
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: ${prompt}\n\n${langNote} },
        ],
        temperature: 0.2,
      }),
    });

    if (!aiResponse.ok) {
      const txt = await aiResponse.text();
      return NextResponse.json(
        { ok: false, error: OpenAI error: ${txt} },
        { status: 500 }
      );
    }

    const aiJson = await aiResponse.json();
    const aiText = aiJson?.choices?.[0]?.message?.content || "";

    // احفظ ناتج الذكاء في ملف مشروع
    const safeSlug =
      slug && typeof slug === "string"
        ? slug
        : project-${Date.now().toString(36)};

    const path = projects/${safeSlug}.md;
    const content = [
      # ${safeSlug},
      "",
      "## AI Output",
      "",
      "",
      aiText,
      "",
      "",
    ].join("\n");

    await commitFile(path, content, nova: create ${safeSlug});

    // اطلب نشر Vercel إن تم ضبط HOOK
    await triggerDeploy();

    return NextResponse.json({
      ok: true,
      slug: safeSlug,
      path,
      preview: /builder/${encodeURIComponent(safeSlug)}
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
