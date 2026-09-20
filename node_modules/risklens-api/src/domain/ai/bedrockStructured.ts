import { callBedrock } from "./bedrockRuntime.js";

function extractJson(raw: string) {
  const s = raw.indexOf("{");
  const e = raw.lastIndexOf("}");
  if (s < 0 || e < 0 || e <= s) throw new Error("No JSON in Bedrock output");
  return raw.slice(s, e + 1);
}

export async function askBedrockJSON<T>(prompt: string): Promise<T> {
  const raw = await callBedrock(prompt);
  const parsed = JSON.parse(extractJson(raw));
  return parsed as T;
}
