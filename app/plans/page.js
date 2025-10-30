'use client';
import { useEffect, useState } from "react";

const PLANS = [
  { id:'free', name:'Free', price:0, quota:1000 },
  { id:'basic', name:'Basic', price:20, quota:10000 },
  { id:'pro', name:'Pro', price:50, quota:50000 },
  { id:'elite', name:'Elite', price:100, quota:150000 }
];

export default function Plans(){
  const [provider, setProvider] = useState('nowpayments');
  async function pay(planId){
    const email = prompt('Enter your email to continue');
    const r = await fetch('/api/payments/create-session', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ provider, planId, email })
    });
    const d = await r.json();
    if(d.url) window.location.href = d.url; else alert('Payment error');
  }
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Choose Plan</h1>
      <div className="mb-4">
        <label className="mr-2">Payment Provider</label>
        <select className="form-input w-60" value={provider} onChange={e=>setProvider(e.target.value)}>
          <option value="nowpayments">NOWPayments</option>
          <option value="redotpay">RedotPay</option>
        </select>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {PLANS.map(p=>(
          <div key={p.id} className="card p-4">
            <div className="text-xl">{p.name}</div>
            <div className="text-white/60 mb-2">${p.price} / mo</div>
            <div className="text-sm mb-4">AI quota: {p.quota.toLocaleString()}</div>
            <button className="btn" onClick={()=>pay(p.id)}>Pay Now</button>
          </div>
        ))}
      </div>
    </main>
  )
}
