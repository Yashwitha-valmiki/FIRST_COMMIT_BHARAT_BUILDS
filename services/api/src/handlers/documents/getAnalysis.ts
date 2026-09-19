import { Request, Response } from "express";
import { getRisk } from "../../repositories/riskRepository.js";

export async function getAnalysis(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const item = await getRisk(documentId);
    if (!item) return res.status(404).json({ message: "analysis not found" });
    return res.status(200).json(item);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "failed to fetch analysis" });
  }
}
