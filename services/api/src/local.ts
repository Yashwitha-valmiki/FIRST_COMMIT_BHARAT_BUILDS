import express from "express";
import { analyzeDocument } from "./handlers/documents/analyzeDocument.js";
import { parseDocument } from "./handlers/documents/parseDocument.js";
import { getUploadUrl } from "./handlers/documents/getUploadUrl.js";
import { getAnalysis } from "./handlers/documents/getAnalysis.js";

const app = express();
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));
app.post("/documents/upload-url", getUploadUrl);
app.post("/documents/:documentId/parse", parseDocument);
app.post("/documents/:documentId/analyze", analyzeDocument);
app.get("/documents/:documentId/analysis", getAnalysis);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on :${port}`));
