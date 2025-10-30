const API = "https://api.github.com";

export async function upsertFilesToRepo({ owner, repo, branch, token, files, siteDir = "" }) {
  const ref = await fetch(`${API}/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    headers: { Authorization: `token ${token}`, Accept: "application/vnd.github+json" }
  }).then(r=>r.json());
  if(!ref?.object?.sha) throw new Error("Cannot read base SHA");
  const baseSha = ref.object.sha;

  const tree = files.map(f => ({
    path: siteDir ? `${siteDir}/${f.path}` : f.path,
    mode: "100644",
    type: "blob",
    content: f.content
  }));

  const newTree = await fetch(`${API}/repos/${owner}/${repo}/git/trees`, {
    method: "POST",
    headers: { Authorization: `token ${token}`, Accept: "application/vnd.github+json" },
    body: JSON.stringify({ base_tree: baseSha, tree })
  }).then(r=>r.json());
  if(!newTree?.sha) throw new Error("Tree create failed");

  const commit = await fetch(`${API}/repos/${owner}/${repo}/git/commits`, {
    method: "POST",
    headers: { Authorization: `token ${token}`, Accept: "application/vnd.github+json" },
    body: JSON.stringify({ message: "publish: AI builder output", tree: newTree.sha, parents: [baseSha] })
  }).then(r=>r.json());
  if(!commit?.sha) throw new Error("Commit failed");

  const updatedRef = await fetch(`${API}/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: "PATCH",
    headers: { Authorization: `token ${token}`, Accept: "application/vnd.github+json" },
    body: JSON.stringify({ sha: commit.sha, force: true })
  }).then(r=>r.json());
  if(!updatedRef?.object?.sha) throw new Error("Ref update failed");

  return commit.sha;
}
