import { Request, Response } from "express";
import { runAnalysisPipeline } from "../../domain/analysis/runAnalysisPipeline.js";
import { assertValidAnalysis } from "../../lib/validator.js";
import { saveRisk } from "../../repositories/riskRepository.js";

export async function analyzeDocument(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const { text, role, language } = req.body || {};

    const result = await runAnalysisPipeline({
      fullText: text || "No text supplied",
      userRole: role || "student",
      outputLanguage: language || "en"
    });

    assertValidAnalysis(result);
    await saveRisk(documentId, { documentId, ...result });

    return res.status(200).json({ documentId, ...result });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: e?.message || "analysis failed" });
  }
}
