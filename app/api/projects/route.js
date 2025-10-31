import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
const owner=process.env.GITHUB_OWNER;const repo=process.env.GITHUB_REPO;const branch=process.env.GITHUB_BRANCH||"main";
const octo=new Octokit({auth:process.env.GITHUB_TOKEN});
export async function GET(req){
  const {searchParams}=new URL(req.url);const slug=searchParams.get('slug');
  try{
    const {data}=await octo.repos.getContent({owner,repo,path:'data/projects.json',ref:branch});
    const raw=Buffer.from(data.content,'base64').toString('utf8');const projects=JSON.parse(raw);
    if(slug){return NextResponse.json({projects,previewPath:`/projects/${slug}`,timeline:[]})}
    return NextResponse.json({projects})
  }catch{return NextResponse.json({projects:[]})}
}
