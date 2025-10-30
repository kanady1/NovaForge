import { NextResponse } from "next/server";
import { upsertFilesToRepo } from "../../../lib/github.js";
import { triggerVercelDeploy } from "../../../lib/vercel.js";

export async function POST(req){
  try{
    const { files } = await req.json();
    const token  = process.env.GITHUB_TOKEN;
    const owner  = process.env.GITHUB_OWNER;
    const repo   = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "main";
    const siteDir = process.env.SITE_DIR || "";

    if(!token || !owner || !repo) throw new Error("GitHub env missing");

    const sha = await upsertFilesToRepo({ owner, repo, branch, token, files, siteDir });
    if(process.env.VERCEL_DEPLOY_HOOK_URL){
      await triggerVercelDeploy(process.env.VERCEL_DEPLOY_HOOK_URL);
    }
    return NextResponse.json({ message:"Published", commit: sha });
  }catch(e){
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
