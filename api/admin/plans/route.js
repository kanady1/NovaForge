import { NextResponse } from "next/server";

const store = globalThis.__PLANS__ || (globalThis.__PLANS__ = [
  { id:'free', name:'Free', price:0, quota:1000 },
  { id:'basic', name:'Basic', price:20, quota:10000 },
  { id:'pro', name:'Pro', price:50, quota:50000 },
  { id:'elite', name:'Elite', price:100, quota:150000 }
]);

export async function GET(){ return NextResponse.json({ items: store }); }

export async function POST(req){
  const body = await req.json();
  const idx = store.findIndex(p=>p.id===body.id);
  if(idx>=0) store[idx]=body; else store.push(body);
  return NextResponse.json({ ok:true });
}

export async function DELETE(req){
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');
  const i = store.findIndex(p=>p.id===id);
  if(i>=0) store.splice(i,1);
  return NextResponse.json({ ok:true });
}
