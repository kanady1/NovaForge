import { create } from "zustand";

export const useStudio = create((set,get)=>({
  projects: [],
  current: null,
  addProject: (p)=> set(s=>({projects:[p, ...s.projects]})),
  setCurrent: (id)=> set({current:id}),
  saveVersion: (id, snapshot)=>{
    const key = `versions:${id}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.unshift({ t: Date.now(), snapshot });
    localStorage.setItem(key, JSON.stringify(list.slice(0,50)));
  },
  listVersions: (id)=>{
    const key = `versions:${id}`;
    return JSON.parse(typeof window!=='undefined' ? (localStorage.getItem(key)||"[]") : "[]");
  },
  restoreVersion: (id, index)=>{
    const key = `versions:${id}`;
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    return list[index]?.snapshot || null;
  }
}))
