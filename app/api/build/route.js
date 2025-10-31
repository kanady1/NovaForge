// app/api/build/route.js
import { NextResponse } from "next/server";
import { commitFile } from "@/lib/github";
import { triggerDeploy } from "@/lib/vercel";

// فحص سريع للحالة
export function GET() {
  return NextResponse.json({ ok: true, service: "build-api" });
}

// استدعاء: POST /api/build  مع body = { path, content, message?, trigger? }
export async function POST(req) {
  try {
    const { path, content, message, trigger = true } = await req.json();

    if (!path || typeof content !== "string") {
      return NextResponse.json(
        { ok: false, error: "path و content مطلوبان" },
        { status: 400 }
      );
    }

    // كومِت للملف في GitHub
    const result = await commitFile({ path, content, message });

    // (اختياري) شغّل نشر Vercel إذا معيّن hook
    if (trigger) {
      try {
        await triggerDeploy();
      } catch (e) {
        // نطنّش خطأ الهوك حتى ما يفشل الطلب كله
        console.warn("vercel hook error:", e?.message);
      }
    }

    return NextResponse.json({
      ok: true,
      commitSha: result?.commit?.sha ?? null,
      path,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
