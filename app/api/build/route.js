import { NextResponse } from "next/server";
import slugify from "slugify";
import { writeFile, updateProjectsIndex } from "@/lib/github";
import { triggerDeploy } from "@/lib/vercel";

function scaffold(title, description) {
  const page = `export const metadata = { title: "${title}" };
export default function Page(){
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">${title}</h1>
        <p className="opacity-80 mb-6">${description}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">قسم 1</div>
          <div className="p-4 border rounded-lg">قسم 2</div>
        </div>
      </div>
    </main>
  )
}`;
  const layout = `export default function Layout({children}){ return <>{children}</> }`;
  return { page, layout };
}

export async function POST(req) {
  const body = await req.json();
  const prompt = body?.prompt || "";
  const lang = body?.lang || "ar";
  const slug = body?.slug;
  const title = (prompt || "New App").slice(0, 80);
  const useSlug = slug ? slug : slugify(title, { lower: true, strict: true }) + "-" + Date.now().toString().slice(-4);
  const base = `app/projects/${useSlug}`;
  const { page, layout } = scaffold(title, prompt);
  await writeFile(`${base}/page.jsx`, page, `build: ${useSlug} page`);
  await writeFile(`${base}/layout.jsx`, layout, `build: ${useSlug} layout`);
  await writeFile(`data/.gitkeep`, "", `ensure data dir`);
  await updateProjectsIndex({ slug: useSlug, title, createdAt: new Date().toISOString() });
  await triggerDeploy();
  const previewUrl = `/projects/${useSlug}`;
  const builderUrl = `/builder/${useSlug}`;
  return NextResponse.json({ ok:true, previewUrl, builderUrl, message:"Project created" });
}
