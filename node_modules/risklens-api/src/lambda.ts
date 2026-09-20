import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { config } from "./lib/config.js";
import { analyzeDocument } from "./handlers/documents/analyzeDocument.js";
import { parseDocument } from "./handlers/documents/parseDocument.js";
import { getUploadUrl } from "./handlers/documents/getUploadUrl.js";
import { getAnalysis } from "./handlers/documents/getAnalysis.js";
import { exportReport } from "./handlers/reports/exportReport.js";
import { createDocument } from "./handlers/documents/createDocument.js";
import { authGuard } from "./middleware/authGuard.js";

const app = express();
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));
app.post("/documents/upload-url", authGuard, getUploadUrl);
app.post("/documents", authGuard, createDocument);
app.post("/documents/:documentId/parse", authGuard, parseDocument);
app.post("/documents/:documentId/analyze", authGuard, analyzeDocument);
app.get("/documents/:documentId/analysis", authGuard, getAnalysis);
app.get("/documents/:documentId/report", authGuard, exportReport);

export const handler = serverless(app);
