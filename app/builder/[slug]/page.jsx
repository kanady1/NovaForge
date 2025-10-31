"use client";
import { useEffect,useState } from "react";
export default function Builder({params}){
  const {slug}=params;const [log,setLog]=useState([]);const [previewUrl,setPreviewUrl]=useState("");
  const [input,setInput]=useState("");const [busy,setBusy]=useState(false);
  useEffect(()=>{(async()=>{const r=await fetch(`/api/projects?slug=${slug}`);const j=await r.json();if(j.previewPath)setPreviewUrl(j.previewPath);setLog(j.timeline||[])})()},[slug]);
  async function applyChange(){if(!input.trim()||busy)return;setBusy(true);try{const r=await fetch('/api/build',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt:input,slug})});const j=await r.json();setLog(L=>[j.message||'Applied',...L]);if(j.previewUrl)setPreviewUrl(j.previewUrl);setInput('')}finally{setBusy(false)}};
  return (<div className="min-h-screen bg-black text-white"><div className="mx-auto max-w-7xl px-4 py-6">
    <div className="flex items-center justify-between mb-4"><div className="text-sm opacity-70">Project</div>
      <div className="flex gap-2"><a className="px-3 py-1 rounded-md bg-indigo-600" href={previewUrl||'#'} target="_blank">Publish</a>
        <button className="px-3 py-1 rounded-md bg-neutral-800" onClick={()=>location.reload()}>Sync</button>
        <a className="px-3 py-1 rounded-md bg-neutral-800" href={previewUrl||'#'}>Preview</a></div></div>
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-xl border border-neutral-800 bg-neutral-900 p-3"><iframe src={previewUrl} className="w-full h-[60vh] rounded-lg bg-white"/></div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3"><div className="text-sm mb-2 opacity-70">التحديثات</div>
        <div className="space-y-2 max-h-[60vh] overflow-auto">{log.map((x,i)=>(<div key={i} className="text-sm bg-black/30 rounded-md p-2 border border-neutral-800">{x}</div>))}
          {log.length===0&&<div className="opacity-60 text-sm">لا يوجد سجل حتى الآن.</div>}</div></div></div>
    <div className="fixed left-0 right-0 bottom-0 bg-black/70 border-t border-neutral-800"><div className="mx-auto max-w-7xl px-4 py-3 flex gap-3">
      <textarea className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-3 h-16 resize-none" placeholder="اكتب التعديل المطلوب…" value={input} onChange={e=>setInput(e.target.value)} disabled={busy}/>
      <button onClick={applyChange} disabled={busy} className={`rounded-full w-12 h-12 ${busy?'bg-neutral-700':'bg-white text-black'}`}>↑</button></div></div>
  </div></div>);
}
