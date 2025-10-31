"use client";
import { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar";
import LeftPanel from "../../../components/LeftPanel";
import Preview from "../../../components/Preview";
import BottomInput from "../../../components/BottomInput";
import { useParams, useRouter } from "next/navigation";
import { useStudio } from "../../../lib/store";

export default function BuilderPage(){
  const { id } = useParams();
  const router = useRouter();
  const [busy,setBusy] = useState(false);
  const [model,setModel] = useState(null);
  const studio = useStudio();

  useEffect(()=>{
    const raw = localStorage.getItem(`project:${id}`);
    if(!raw){ router.replace("/"); return; }
    setModel(JSON.parse(raw));
  }, [id]);

  const save = (m)=>{
    localStorage.setItem(`project:${id}`, JSON.stringify(m));
    studio.saveVersion(id, m);
  }

  const send = async (text)=>{
    if(busy) return;
    setBusy(true);
    const m = {...model};
    m.history = [...m.history, {role:'user', text}];
    m.timeline = [...m.timeline, {t:Date.now(), msg:"Applying: "+text.slice(0,42)}];
    await new Promise(r=>setTimeout(r, 1200));
    m.html = `<h1>${text}</h1><p>تم التوليد بنجاح.</p>` + (m.html||"");
    m.timeline = [...m.timeline, {t:Date.now(), msg:"Build complete"}];
    setModel(m);
    save(m);
    setBusy(false);
  }

  const onPreview = ()=>{ alert("Preview refreshed"); }
  const onPublish = ()=>{ alert("Placeholder: wire with GitHub/Vercel later."); }

  if(!model) return null;

  return (
    <div className="h-screen">
      <TopBar title={model.prompt?.slice(0,36) || "Project"} onPreview={onPreview} onPublish={onPublish}/>
      <div className="flex">
        <LeftPanel history={model.history||[]} timeline={model.timeline||[]}/>
        <Preview html={model.html||""}/>
      </div>
      <BottomInput busy={busy} onSend={send}/>
    </div>
  )
}
