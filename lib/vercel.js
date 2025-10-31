export async function triggerDeploy(){const hook=process.env.VERCEL_DEPLOY_HOOK_URL;if(!hook)return;try{await fetch(hook,{method:'POST'})}catch{}}
