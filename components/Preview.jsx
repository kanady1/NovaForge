"use client";
export default function Preview({html}){
  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-auto p-6">
      <div className="min-h-[600px] rounded-xl bg-base-card border border-base-border p-6">
        <div className="text-base-sub mb-4">Live Preview</div>
        <div className="rounded-md bg-white text-black p-6 min-h-[300px]" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </div>
  )
}
