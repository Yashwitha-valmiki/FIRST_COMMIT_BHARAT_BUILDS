import { Request, Response } from "express";
import { getRisk } from "../../repositories/riskRepository.js";

export async function exportReport(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const analysis = await getRisk(documentId);
    if (!analysis) return res.status(404).json({ message: "analysis not found" });

    // Hackathon-friendly export: JSON report payload.
    // Later swap with PDF generation service.
    return res.status(200).json({
      reportId: `rpt_${Date.now()}`,
      documentId,
      generatedAt: new Date().toISOString(),
      reportFormat: "json",
      data: analysis
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "report export failed" });
  }
}
