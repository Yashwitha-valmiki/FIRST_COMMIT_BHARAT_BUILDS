export function classifyPrompt(text: string) {
  return `Return ONLY JSON:
{"docType":"internship|loan|rental|employment|other","confidence":0}
TEXT:
${text.slice(0,12000)}`;
}

export function clausesPrompt(text: string) {
  return `Return ONLY JSON:
{"clauses":[{"clauseType":"penalty|lockin|liability|privacy|jurisdiction|payment|other","text":"...","severity":0,"confidence":0}]}
TEXT:
${text.slice(0,14000)}`;
}
