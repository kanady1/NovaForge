"use client";
import {useState} from "react";
import Composer from "../components/Composer";
import ProjectsGrid from "../components/ProjectsGrid";
import { useRouter } from "next/navigation";

export default function Home(){
  const [busy,setBusy] = useState(false);
  const [projects,setProjects] = useState(() => {
    if(typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem("studio:projects")||"[]");
  });
  const router = useRouter();

  const create = async (prompt)=>{
    setBusy(true);
    await new Promise(r=>setTimeout(r, 1200));
    const id = Math.random().toString(36).slice(2,10);
    const p = { id, name: prompt.slice(0,24)||"Untitled", updatedAt: Date.now() };
    const list = [p, ...projects];
    setProjects(list);
    localStorage.setItem("studio:projects", JSON.stringify(list));
    localStorage.setItem(`project:${id}`, JSON.stringify({ prompt, html: "<h1>مشروع جديد</h1><p>سنضيف العناصر المطلوبة هنا.</p>", history: [{role:'user', text: prompt}], timeline: [{t:Date.now(), msg:'Project created'}] }));
    setBusy(false);
    router.push(`/builder/${id}`);
  }

  return (
    <div>
      <div className="pt-10">
        <h1 className="text-center text-4xl font-bold">Build something <span className="text-base-accent">NovaForge</span></h1>
        <p className="text-center text-base-sub mt-2">Create apps and websites by chatting with AI</p>
      </div>
      <div className="mt-8"><Composer onSend={create} disabled={busy}/></div>
      <ProjectsGrid projects={projects}/>
    </div>
  )
}
