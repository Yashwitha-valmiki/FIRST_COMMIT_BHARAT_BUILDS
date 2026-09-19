import { Request, Response } from "express";
import { runAnalysisPipeline } from "../../domain/analysis/runAnalysisPipeline.js";

export async function analyzeDocument(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const { text, role, language } = req.body || {};

    const result = await runAnalysisPipeline({
      fullText: text || "No text supplied",
      userRole: role || "student",
      outputLanguage: language || "en"
    });

    // TODO: persist result in DDB (RiskAssessments table)
    return res.status(200).json({ documentId, ...result });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "analysis failed" });
  }
}
