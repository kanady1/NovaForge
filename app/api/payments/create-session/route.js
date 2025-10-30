import { NextResponse } from "next/server";
import { createCheckout } from "../../../../lib/payments.js";

export async function POST(req){
  const { provider, planId, email } = await req.json();
  // TODO: persist intent in DB (userId/email/plan)
  const session = await createCheckout({ provider, planId, userId: email||'guest', email });
  return NextResponse.json(session);
}
