import OpenAI from "openai";
export function getClient(){
  const key = process.env.OPENAI_API_KEY;
  if(!key) throw new Error("OPENAI_API_KEY missing");
  return new OpenAI({ apiKey: key });
}
