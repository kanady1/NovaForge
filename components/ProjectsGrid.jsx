"use client";
import Link from "next/link";
export default function ProjectsGrid({projects}){
  return (
    <div className="mx-auto max-w-6xl px-4 mt-10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base-sub font-medium">KANADY's Studio</h3>
        <Link href="/" className="text-sm text-base-sub hover:text-white">View all</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p=> (
          <Link key={p.id} href={`/builder/${p.id}`} className="rounded-xl bg-base-card border border-base-border hover:bg-base-panel transition p-4">
            <div className="h-28 rounded-lg bg-gradient-to-br from-base-panel to-base-card border border-base-border mb-3"></div>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-base-sub mt-1">Edited {new Date(p.updatedAt).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
