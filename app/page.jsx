"use client";
import { useState,useEffect } from "react";
export default function Home(){
  const [prompt,setPrompt]=useState("");const [busy,setBusy]=useState(false);
  const [projects,setProjects]=useState([]);const [lang,setLang]=useState("ar");
  useEffect(()=>{(async()=>{try{const r=await fetch('/api/projects',{cache:'no-store'});const j=await r.json();setProjects(j.projects||[])}catch{}})()},[]);
  async function onSubmit(){if(!prompt.trim()||busy)return;setBusy(true);try{const r=await fetch('/api/build',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt,lang})});const j=await r.json();if(j.previewUrl)window.location.href=j.builderUrl??j.previewUrl}finally{setBusy(false);setPrompt('')}};
  return (<div className="min-h-screen bg-black text-white"><div className="mx-auto max-w-6xl px-4 py-8">
    <h1 className="text-3xl font-semibold mb-6">NovaForge Studio</h1>
    <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800 mb-8">
      <div className="mb-3 flex gap-3 items-center"><label className="text-sm opacity-70">اللغة</label>
        <select className="bg-neutral-800 rounded-md px-2 py-1 text-sm" value={lang} onChange={(e)=>setLang(e.target.value)}>
          <option value="ar">العربية</option><option value="he">العبرية</option><option value="en">English</option>
        </select></div>
      <textarea className="w-full rounded-xl bg-neutral-800 p-3 outline-none resize-none h-28" placeholder="اكتب ماذا تريد بناءه…" value={prompt} onChange={e=>setPrompt(e.target.value)} disabled={busy} />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-md bg-neutral-800 text-xs">Attach</button>
          <button className="px-3 py-1 rounded-md bg-neutral-800 text-xs">Public</button>
          <button className="px-3 py-1 rounded-md bg-neutral-800 text-xs">Supabase</button>
        </div>
        <button onClick={onSubmit} disabled={busy} className={`rounded-full w-10 h-10 flex items-center justify-center ${busy?'bg-neutral-700':'bg-white text-black'}`} title="إنشاء">↑</button>
      </div>
    </div>
    <h2 className="text-xl mb-3">مشاريعك</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(p=>(<a key={p.slug} href={`/builder/${p.slug}`} className="block rounded-xl border border-neutral-800 p-4 bg-neutral-900 hover:bg-neutral-800"><div className="text-lg">{p.title}</div><div className="text-xs opacity-60 mt-1">{new Date(p.createdAt).toLocaleString()}</div></a>))}
      {projects.length===0&&(<div className="opacity-60 text-sm">لا توجد مشاريع بعد. اكتب وصفك في الأعلى واضغط السهم لبدء أول مشروع.</div>)}
    </div></div></div>);
}
