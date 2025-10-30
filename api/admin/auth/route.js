import { NextResponse } from "next/server";

export async function POST(req){
  const { pw } = await req.json();
  const ok = pw && pw === process.env.ADMIN_PASSWORD;
  return NextResponse.json({ ok: !!ok });
}
