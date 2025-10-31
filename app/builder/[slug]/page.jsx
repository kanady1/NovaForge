// app/builder/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function Builder({ params }) {
  const { slug } = params;
  const [link, setLink] = useState("");

  useEffect(() => {
    // بعد إنشاء المشروع عبر /api/ai، الملف يكون محفوظ بـ projects/{slug}.md
    // هنا نعرض روابط مفيدة فقط.
    setLink(/projects/${encodeURIComponent(slug)}.md);
  }, [slug]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Project: {slug}</h1>
        <p className="text-neutral-400 mb-6">
          تم إنشاء المشروع عبر الذكاء الاصطناعي وحُفظ في المستودع.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={link}
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
          >
            Preview Markdown
          </a>
          <a
            href="/"
            className="px-4 py-2 rounded border border-white/20 hover:bg-white/10"
          >
            إنشاء مشروع جديد
          </a>
        </div>
      </div>
    </main>
  );
}
