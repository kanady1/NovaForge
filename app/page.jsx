// app/page.jsx
'use client';

import { useState } from 'react';

function toSlug(s) {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || project-${Date.now()};
}

export default function Home() {
  const [lang, setLang] = useState('ar');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const title = text?.trim();
    if (!title) return;

    setLoading(true);
    setMsg(null);

    const slug = toSlug(title);
    const path = projects/${slug}.json;
    const payload = {
      path,
      message: NovaForge: init ${slug},
      content: JSON.stringify(
        {
          slug,
          title,
          lang,
          createdAt: new Date().toISOString(),
          status: 'draft',
        },
        null,
        2
      ),
      trigger: true,
    };

    try {
      const res = await fetch('/api/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Build API failed');
      }

      // الانتقال إلى صفحة البناء
      window.location.href = /builder/${slug};
    } catch (err) {
      setMsg(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
      // لا نمسح النص هنا حتى لا “يختفي” قبل التوجيه
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">NovaForge Studio</h1>

        <form
          onSubmit={onSubmit}
          className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"
        >
          <div className="flex items-center gap-3 mb-3">
            <label className="text-sm opacity-80">اللغة</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm"
            >
              <option value="ar">العربية</option>
              <option value="he">العبرية</option>
              <option value="en">English</option>
            </select>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب ماذا تريد بنائه…"
            className="w-full min-h-[120px] bg-zinc-800 border border-zinc-700 rounded-lg p-3 outline-none"
          />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-xs">
              <button type="button" className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Supabase</button>
              <button type="button" className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Public</button>
              <button type="button" className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Attach</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg ${
                loading
                  ? 'bg-zinc-700 cursor-not-allowed'
                  : 'bg-white text-black hover:opacity-90'
              }`}
            >
              {loading ? 'جارٍ الإنشاء…' : 'إنشاء'}
            </button>
          </div>

          {msg && (
            <p className="mt-3 text-sm text-red-400">
              {msg}
            </p>
          )}
        </form>

        <div className="mt-10">
          <h2 className="text-lg mb-2">مشاريعك</h2>
          <p className="text-sm opacity-70">
            لا توجد مشاريع بعد. اكتب وصفك في الأعلى واضغط “إنشاء” لبدء أول مشروع.
          </p>
        </div>
      </div>
    </div>
  );
}
