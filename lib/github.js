import { Octokit } from "@octokit/rest";
const owner=process.env.GITHUB_OWNER;const repo=process.env.GITHUB_REPO;const branch=process.env.GITHUB_BRANCH||"main";
const octo=new Octokit({auth:process.env.GITHUB_TOKEN});
async function getSha(path){try{const{data}=await octo.repos.getContent({owner,repo,path,ref:branch});return data?.sha}catch{return undefined}}
export async function writeFile(path,content,message){const sha=await getSha(path);await octo.repos.createOrUpdateFileContents({owner,repo,path,message,content:Buffer.from(content,'utf8').toString('base64'),branch,sha})}
export async function updateProjectsIndex(entry){const path='data/projects.json';const sha=await getSha(path);let arr=[];if(sha){const{data}=await octo.repos.getContent({owner,repo,path,ref:branch});const raw=Buffer.from(data.content,'base64').toString('utf8');arr=JSON.parse(raw)}if(!arr.find(x=>x.slug===entry.slug))arr.unshift(entry);await octo.repos.createOrUpdateFileContents({owner,repo,path,message:`add project ${entry.slug}`,content:Buffer.from(JSON.stringify(arr,null,2),'utf8').toString('base64'),branch,sha})}
