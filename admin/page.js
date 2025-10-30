'use client';
import { useEffect, useState } from "react";

export default function Admin(){
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState('');
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ id:'', name:'', price:0, quota:1000 });

  useEffect(()=>{
    const pw = prompt('Admin password');
    fetch('/api/admin/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ pw })})
      .then(r=>r.json()).then(d=>{
        if(d.ok){ setOk(true); loadPlans(); } else { setMsg('Not authorized'); }
      })
  },[]);

  async function loadPlans(){
    const r = await fetch('/api/admin/plans'); const d = await r.json(); setPlans(d.items||[]);
  }
  async function addPlan(){
    const r = await fetch('/api/admin/plans', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newPlan)});
    await loadPlans();
  }
  async function delPlan(id){
    await fetch('/api/admin/plans?id='+id, { method:'DELETE'}); await loadPlans();
  }

  if(!ok) return <main className="p-6">{msg||'Checking auth...'}</main>;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <section className="card p-4 mb-6">
        <h2 className="text-xl mb-2">Plans</h2>
        <div className="flex gap-2 mb-3">
          <input className="form-input" placeholder="id" value={newPlan.id} onChange={e=>setNewPlan({...newPlan, id:e.target.value})}/>
          <input className="form-input" placeholder="name" value={newPlan.name} onChange={e=>setNewPlan({...newPlan, name:e.target.value})}/>
          <input className="form-input" placeholder="price" type="number" value={newPlan.price} onChange={e=>setNewPlan({...newPlan, price:+e.target.value})}/>
          <input className="form-input" placeholder="quota" type="number" value={newPlan.quota} onChange={e=>setNewPlan({...newPlan, quota:+e.target.value})}/>
          <button className="btn" onClick={addPlan}>Add</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>ID</th><th>Name</th><th>Price</th><th>Quota</th><th></th></tr></thead>
          <tbody>
            {plans.map(p=>(
              <tr key={p.id} className="border-t border-white/10">
                <td>{p.id}</td><td>{p.name}</td><td>${p.price}</td><td>{p.quota}</td>
                <td><button className="btn" onClick={()=>delPlan(p.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card p-4">
        <h2 className="text-xl mb-2">Gateways</h2>
        <p className="text-white/70 mb-2">Add/enable payment gateways (NOWPayments, RedotPay). Configure callback URLs in env.</p>
        <ul className="list-disc ml-5 text-white/70">
          <li>NOWPayments callback: <code>NOPAY_CALLBACK_URL</code></li>
          <li>RedotPay callback: <code>REDOTPAY_CALLBACK_URL</code></li>
        </ul>
      </section>
    </main>
  )
}
