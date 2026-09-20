import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { getRisk } from "../../repositories/riskRepository.js";

export async function exportReportPdf(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const analysis = await getRisk(documentId);
    if (!analysis) return res.status(404).json({ message: "analysis not found" });

    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${documentId}-risk-report.pdf"`);

    doc.pipe(res);
    doc.fontSize(20).text("RiskLens Report", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Document ID: ${documentId}`);
    doc.text(`Generated At: ${new Date().toISOString()}`);
    doc.moveDown();

    doc.fontSize(14).text("Decision");
    doc.fontSize(12).text(`Label: ${analysis.decision?.label || "N/A"}`);
    doc.text(`Score: ${analysis.decision?.overallRiskScore ?? "N/A"}`);
    doc.text(`Confidence: ${analysis.decision?.confidenceScore ?? "N/A"}`);
    doc.moveDown();

    doc.fontSize(14).text("Top Red Flags");
    (analysis.topRedFlags || []).slice(0, 5).forEach((f: any, i: number) => {
      doc.fontSize(12).text(`${i + 1}. ${f.title || "Flag"} (${f.severity || "N/A"})`);
      if (f.whatCanGoWrong) doc.text(`   - ${f.whatCanGoWrong}`);
      if (f.whatToDoNow) doc.text(`   - Action: ${f.whatToDoNow}`);
    });

    doc.moveDown();
    doc.fontSize(10).text(analysis.disclaimer || "AI-assisted output. Not legal advice.");
    doc.end();
  } catch (e:any) {
    console.error(e);
    res.status(500).json({ message: e?.message || "pdf export failed" });
  }
}
