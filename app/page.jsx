// app/page.jsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const slug = useMemo(() => {
    const base =
      input
        .trim()
        .toLowerCase()
        .replace(/[^\s\-a-z0-9]/gi, "")
        .replace(/\s+/g, "-")
        .replace(/\/+/g, "-")
        .replace(/^-+|-+$/g, "") || project-${Date.now()};
    return base;
  }, [input]);

  async function handleBuild() {
    if (!input.trim() || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, slug }),
      });
      const data = await res.json();
      if (!data?.ok) throw new Error(data?.error || "Build failed");
      router.push(/builder/${data.slug});
    } catch (e) {
      alert(e.message || "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-4">NovaForge Studio</h1>
        <div className="bg-neutral-900 rounded-xl p-4">
          <textarea
            className="w-full h-32 bg-neutral-950 border border-neutral-800 rounded p-3 outline-none"
            placeholder="اكتب طلبك لبناء التطبيق..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleBuild}
              disabled={busy}
              className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50"
            >
              {busy ? "جارٍ البناء..." : "ابنِ التطبيق"}
            </button>
            <span className="text-sm text-neutral-400">Slug: {slug}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
