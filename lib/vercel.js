export async function triggerVercelDeploy(hook){
  if(!hook) return true;
  const r = await fetch(hook, { method: "POST" });
  if(!r.ok) throw new Error("Deploy hook failed");
  return true;
}
