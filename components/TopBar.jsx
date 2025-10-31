"use client";
import {Share2, Rocket, MonitorSmartphone, RefreshCw} from "lucide-react";
export default function TopBar({title="NovaForge", onPreview, onPublish}){
  return (
    <div className="sticky top-0 z-30 w-full bg-base-bg/70 backdrop-blur border-b border-base-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-base-card shadow-panel grid place-items-center">
            <span className="text-xs">NF</span>
          </div>
          <div>
            <div className="text-sm text-base-sub">Project</div>
            <div className="font-semibold">{title}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPreview} className="px-3 py-1.5 rounded-lg bg-base-card border border-base-border hover:bg-base-panel flex items-center gap-2">
            <MonitorSmartphone size={16}/> Preview
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-base-card border border-base-border hover:bg-base-panel flex items-center gap-2">
            <Share2 size={16}/> Share
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-base-card border border-base-border hover:bg-base-panel flex items-center gap-2">
            <RefreshCw size={16}/> Sync
          </button>
          <button onClick={onPublish} className="px-4 py-1.5 rounded-lg bg-base-accent hover:brightness-110 text-white flex items-center gap-2">
            <Rocket size={16}/> Publish
          </button>
        </div>
      </div>
    </div>
  )
}
