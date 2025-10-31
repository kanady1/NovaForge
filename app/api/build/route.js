// app/api/build/route.js
import { NextResponse } from 'next/server';
import { commitFile } from '../../../lib/github';
import { triggerDeploy } from '../../../lib/vercel';

// فحص سريع للحالة
export function GET() {
  return NextResponse.json({ ok: true, service: 'build-api' });
}

// إنشاء أو تعديل ملف وتشغيل النشر في Vercel
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      path,                 // مسار الملف داخل المستودع (مثلاً: 'projects/test.md')
      content = '',         // محتوى الملف الجديد
      message = 'NovaForge: update', // رسالة الكومِت
      trigger = true        // هل نشغّل نشر Vercel بعد الكومِت؟
    } = body || {};

    if (!path || typeof path !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'path مطلوب ويجب أن يكون نصّاً' },
        { status: 400 }
      );
    }

    // 1️⃣ رفع الملف إلى GitHub
    const commit = await commitFile(path, content, message);

    // 2️⃣ تشغيل النشر في Vercel (اختياري)
    let deploy = null;
    if (trigger) {
      try {
        deploy = await triggerDeploy();
      } catch (err) {
        deploy = { ok: false, error: err?.message ?? 'فشل تنفيذ نشر Vercel' };
      }
    }

    return NextResponse.json({ ok: true, commit, deploy });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'خطأ غير متوقّع في الخادم' },
      { status: 500 }
    );
  }
}
