import express from "express";
import { analyzeDocument } from "./handlers/documents/analyzeDocument.js";
import { parseDocument } from "./handlers/documents/parseDocument.js";
import { getUploadUrl } from "./handlers/documents/getUploadUrl.js";
import { getAnalysis } from "./handlers/documents/getAnalysis.js";
import { exportReport } from "./handlers/reports/exportReport.js";

const app = express();
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));
app.post("/documents/upload-url", getUploadUrl);
app.post("/documents/:documentId/parse", parseDocument);
app.post("/documents/:documentId/analyze", analyzeDocument);
app.get("/documents/:documentId/analysis", getAnalysis);
app.get("/documents/:documentId/report", exportReport);

app.get("/dashboard/summary", async (_, res) => {
  // placeholder summary for demo; replace with DDB query scan/index query
  res.json({
    totalDocuments: 3,
    highRiskCount: 1,
    moderateRiskCount: 1,
    safeCount: 1,
    upcomingObligations: 2
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on :${port}`));
