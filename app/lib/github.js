// lib/github.js
const GITHUB_TOKEN  = process.env.GITHUB_TOKEN;
const GITHUB_OWNER  = process.env.GITHUB_OWNER;
const GITHUB_REPO   = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
  console.warn("[github lib] Missing GitHub env vars (token/owner/repo).");
}

async function getFileSha(path) {
  const res = await fetch(
    https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)}?ref=${GITHUB_BRANCH},
    { headers: { Authorization: Bearer ${GITHUB_TOKEN}, Accept: "application/vnd.github+json" } }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(GitHub getFileSha failed: ${res.status});
  const json = await res.json();
  return json.sha ?? null;
}

/**
 * ينشئ/يحدّث ملفًا في GitHub (بنفس الكومِت).
 */
export async function commitFile({ path, content, message }) {
  const sha = await getFileSha(path);
  const body = {
    message: message || update ${path},
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: GITHUB_BRANCH,
    sha: sha || undefined
  };

  const res = await fetch(
    https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)},
    {
      method: "PUT",
      headers: {
        Authorization: Bearer ${GITHUB_TOKEN},
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(GitHub commit failed: ${res.status} ${txt});
  }
  return res.json();
}
