// app/api/build/route.js
import { NextResponse } from 'next/server';
import { commitFile } from '@/lib/github';
import { triggerDeploy } from '@/lib/vercel';

// صحة API
export function GET() {
  return NextResponse.json({ ok: true, service: 'build-api' });
}

// إنشاء/تعديل ملف + (اختياري) تشغيل نشر Vercel
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      path,                // مسار الملف داخل المستودع (مثال: 'projects/foo.md')
      content = '',        // محتوى الملف
      message = 'NovaForge: update', // رسالة الكومِت
      trigger = true       // شغّل نشر Vercel بعد الكومِت؟
    } = body || {};

    if (!path || typeof path !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'path مطلوب ويجب أن يكون نصّاً' },
        { status: 400 }
      );
    }

    // 1) كومِت على GitHub
    const commit = await commitFile(path, content, message);

    // 2) نشر Vercel (اختياري)
    let deploy = null;
    if (trigger) {
      try {
        deploy = await triggerDeploy();
      } catch (e) {
        // لا نفشل الطلب كله لو فشل النشر
        deploy = { ok: false, error: e?.message ?? 'Deploy hook failed' };
      }
    }

    return NextResponse.json({ ok: true, commit, deploy });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}
