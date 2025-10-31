// lib/vercel.js
const HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL;

/**
 * يستدعي نشر Vercel عبر الـ Deploy Hook (اختياري).
 */
export async function triggerDeploy() {
  if (!HOOK_URL) {
    console.warn("[vercel lib] VERCEL_DEPLOY_HOOK_URL not set, skipping trigger.");
    return { skipped: true };
  }
  const res = await fetch(HOOK_URL, { method: "POST" });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(Vercel hook failed: ${res.status} ${txt});
  }
  return res.json().catch(() => ({ ok: true }));
}
