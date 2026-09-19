import { Request, Response } from "express";

export async function parseDocument(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    // TODO:
    // 1) read document metadata/key from DDB
    // 2) run Textract if PDF/image
    // 3) store parsed sections to DDB
    return res.status(202).json({ message: "parse started", documentId });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "parse failed" });
  }
}
