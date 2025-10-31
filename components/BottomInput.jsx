"use client";
import { ArrowUpCircle } from "lucide-react";
import { useState } from "react";
export default function BottomInput({busy, onSend}){
  const [txt,setTxt] = useState("");
  const submit=()=>{
    if(busy || !txt.trim()) return;
    onSend(txt.trim());
    setTxt("");
  }
  return (
    <div className="fixed bottom-4 left-[380px] right-6 z-20">
      <div className="rounded-2xl bg-black text-white border border-base-border shadow-panel p-3">
        <div className="flex items-center gap-3">
          <input className="flex-1 bg-transparent outline-none" value={txt} onChange={e=>setTxt(e.target.value)} placeholder="أكتب ماذا نعدّل ونضيف هنا..." disabled={busy}/>
          <button onClick={submit} disabled= {busy} className={"px-3 py-1.5 rounded-lg flex items-center gap-2 " + (busy?"bg-neutral-700 cursor-not-allowed":"bg-white text-black hover:brightness-95")}>
            إرسال <ArrowUpCircle size={18}/>
          </button>
        </div>
      </div>
    </div>
  )
}
