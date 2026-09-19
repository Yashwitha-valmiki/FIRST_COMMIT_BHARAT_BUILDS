import { Request, Response } from "express";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../../lib/awsClients.js";
import { config } from "../../lib/config.js";
import { runAnalysisPipeline } from "../../domain/analysis/runAnalysisPipeline.js";
import { assertValidAnalysis } from "../../lib/validator.js";
import { saveRisk } from "../../repositories/riskRepository.js";

export async function analyzeDocument(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const { text, role, language } = req.body || {};

    let fullText = text;
    if (!fullText) {
      const doc = await ddb.send(new GetCommand({
        TableName: config.DDB_TABLE_DOCUMENTS,
        Key: { PK: `DOC#${documentId}`, SK: "META" }
      }));
      fullText = doc.Item?.parsedText || "";
    }
    if (!fullText) return res.status(400).json({ message: "No text available. Parse first or send text." });

    const result = await runAnalysisPipeline({
      fullText,
      userRole: role || "student",
      outputLanguage: language || "en"
    });

    assertValidAnalysis(result);
    await saveRisk(documentId, { documentId, ...result });

    return res.status(200).json({ documentId, ...result });
  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ message: e?.message || "analysis failed" });
  }
}
