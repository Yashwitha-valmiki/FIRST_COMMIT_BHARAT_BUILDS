import express from "express";
import { runAnalysisPipeline } from "./domain/analysis/runAnalysisPipeline.js";

const app = express();
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/documents/:documentId/analyze", async (req, res) => {
  try {
    const result = await runAnalysisPipeline({
      fullText: req.body?.text || "sample agreement text with penalty and lock-in",
      userRole: req.body?.role || "student",
      outputLanguage: req.body?.language || "en"
    });
    res.status(200).json({ documentId: req.params.documentId, ...result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "analysis failed" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on :${port}`));
