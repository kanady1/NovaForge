"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BuilderPage() {
  const { slug } = useParams();           // مجلد/اسم المشروع
  const router = useRouter();

  // حالة واجهة الكتابة
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // مسار الملف داخل الريبو (مثلاً projects/my-app.md)
  const filePath = useMemo(() => projects/${slug}.md, [slug]);

  async function handleBuild() {
    if (!input.trim() || busy) return;
    setBusy(true);

    try {
      const res = await fetch("/api/build", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          path: filePath,
          content: input,                                 // محتوى الملف الذي تُنشئه
          message: NovaForge: update ${filePath},       // رسالة الكومِت
          trigger: true                                   // يطلّق نشر Vercel إذا متوفر
        }),
      });

      const data = await res.json();
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Build API failed");
      }

      // لو رجّعت API عنوان معاينة نعرضه
      if (data.previewUrl) setPreviewUrl(data.previewUrl);

      // تنظيف محرر النص بعد نجاح الإرسال
      setInput("");
    } catch (e) {
      alert(e.message || "حدث خطأ أثناء الإنشاء");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-3">NovaForge Studio</h1>

        {/* صندوق الكتابة */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب ماذا تريد بناءه..."
            className="w-full h-40 bg-transparent outline-none resize-none"
            disabled={busy}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm opacity-70">المسار: {filePath}</div>

            {/* زر السهم للإرسال */}
            <button
              onClick={handleBuild}
              disabled={busy || !input.trim()}
              className={`rounded-full w-10 h-10 grid place-items-center
                         ${busy || !input.trim()
                           ? "bg-neutral-800 opacity-60 cursor-not-allowed"
                           : "bg-white text-black hover:opacity-80"}`}
              aria-label="Build"
              title="Build"
            >
              ↑
            </button>
          </div>
        </div>

        {/* روابط تحتية */}
        <div className="flex gap-3 mt-4 text-sm">
          <a className="underline" href="/admin" target="_blank">Admin</a>
          <a className="underline" href="/plans" target="_blank">Plans</a>
          {previewUrl && (
            <a className="underline" href={previewUrl} target="_blank">
              Preview
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
