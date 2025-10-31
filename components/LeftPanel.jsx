"use client";
import { useEffect, useRef } from "react";
export default function LeftPanel({history, timeline}){
  const box = useRef(null);
  useEffect(()=>{
    if(box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [history]);
  return (
    <div className="w-[360px] shrink-0 h-[calc(100vh-64px)] overflow-hidden border-r border-base-border">
      <div className="h-full grid grid-rows-[1fr,auto]">
        <div ref={box} className="overflow-y-auto p-4 space-y-3">
          {history.map((m,i)=> (
            <div key={i} className={`p-3 rounded-lg border ${m.role==='user'?'bg-base-card border-base-border':'bg-base-panel border-base-border'}`}>
              <div className="text-xs text-base-sub">{m.role==='user'?'You':'Builder'}</div>
              <div className="mt-1 whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-base-border p-3">
          <div className="text-sm text-base-sub mb-2">التحديثات</div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {timeline.map((t,i)=> (
              <div key={i} className="text-xs text-base-sub/90">{new Date(t.t).toLocaleTimeString()} — {t.msg}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
