"use client";
import {Paperclip, DatabaseZap, ArrowUpCircle, Globe, Mic} from "lucide-react";
import { useState } from "react";
export default function Composer({onSend, disabled}){
  const [text,setText] = useState("");
  const send = ()=>{
    if(!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  }
  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-2xl bg-black text-white shadow-panel border border-base-border p-3">
          <div className="flex items-start gap-3">
            <textarea
              value={text}
              onChange={e=>setText(e.target.value)}
              placeholder="اكتب ماذا تريد أن يبنيه الذكاء..."
              className="bg-transparent flex-1 outline-none resize-none h-20"
              disabled={disabled}
            />
            <div className="flex flex-col items-center gap-2 pt-1">
              <button className="p-2 rounded-lg bg-base-card border border-base-border hover:bg-base-panel" title="Attach"><Paperclip size={18}/></button>
              <button className="p-2 rounded-lg bg-base-card border border-base-border hover:bg-base-panel" title="Supabase"><DatabaseZap size={18}/></button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 rounded-md border border-base-border text-base-sub hover:text-white flex items-center gap-2" title="Public">
                <Globe size={16}/> Public
              </button>
              <span className="text-base-sub text-xs">•</span>
              <button className="px-2 py-1 rounded-md border border-base-border text-base-sub hover:text-white flex items-center gap-2" title="Mic">
                <Mic size={16}/> Mic
              </button>
            </div>
            <button
              onClick={send}
              disabled={disabled}
              className={"flex items-center gap-2 px-3 py-1.5 rounded-lg " + (disabled ? "bg-neutral-700 cursor-not-allowed" : "bg-white text-black hover:brightness-95")}
              title="ابدأ البناء"
            >
              ابدأ البناء <ArrowUpCircle size={18}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
