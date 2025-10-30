'use client';
import { useEffect, useState } from "react";
import { dictionaries } from "../lib/i18n";

export default function Home(){
  const [lang, setLang] = useState('en');
  const t = (k)=> (dictionaries[lang]||dictionaries.en)[k] || k;
  const [prompt, setPrompt] = useState('Landing page for a translator app (Arabic, English, Turkish)');
  const [html, setHtml] = useState('<div class="p-6">Press Generate</div>');

  async function generate(){
    const res = await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt, lang}) });
    const data = await res.json();
    setHtml(data.html || '');
    localStorage.setItem('ai_preview', data.html || '');
    window.dispatchEvent(new Event('ai-preview-update'));
  }

  async function publish(){
    const stored = localStorage.getItem('ai_preview') || html;
    const files = [{ path: 'index.html', content: stored }];
    const r = await fetch('/api/publish', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ files }) });
    const d = await r.json();
    alert(d.message || 'OK');
  }

  return (
    <main className="flex h-screen">
      <aside className="w-96 p-4 border-r border-white/10 bg-v0panel">
        <div className="mb-4 card p-3">
          <div className="text-xl font-semibold">NovaForge</div>
          <div className="text-white/60 text-sm">AI Builder</div>
        </div>

        <div className="card p-3 space-y-2">
          <label className="text-sm">{t('language')}</label>
          <select className="form-input" value={lang} onChange={(e)=>setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="he">עברית</option>
          </select>

          <label className="text-sm mt-3">{t('prompt')}</label>
          <textarea className="form-input h-32" value={prompt} onChange={(e)=>setPrompt(e.target.value)} />

          <div className="flex gap-2 pt-2">
            <button className="btn" onClick={generate}>{t('generate')}</button>
            <button className="btn" onClick={()=>{
              navigator.clipboard.writeText(localStorage.getItem('ai_preview')||html);
              alert('HTML copied');
            }}>{t('copyHtml')}</button>
          </div>

          <div className="flex gap-2 pt-2">
            <button className="btn" onClick={publish}>{t('publish')}</button>
            <a className="btn" href="/plans">{t('plans')}</a>
            <a className="btn" href="/admin">{t('dashboard')}</a>
          </div>
        </div>
      </aside>

      <section className="flex-1 p-4">
        <div className="card p-2 h-full bg-white text-black">
          <div className="text-xs text-gray-500 px-2">Live Preview</div>
          <div className="h-full overflow-auto p-4" dangerouslySetInnerHTML={{__html: html}} />
        </div>
      </section>
    </main>
  )
}
