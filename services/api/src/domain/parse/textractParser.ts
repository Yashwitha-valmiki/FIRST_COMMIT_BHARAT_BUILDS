import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { textract } from "../../lib/awsClients.js";

export async function extractTextFromBytes(documentBytes: Uint8Array, mimeType: string) {
  // For PDFs/images. For DOCX/TXT use alternate parser path.
  const cmd = new AnalyzeDocumentCommand({
    Document: { Bytes: documentBytes },
    FeatureTypes: ["FORMS", "TABLES"]
  });

  const out = await textract.send(cmd);
  const lines =
    out.Blocks?.filter((b) => b.BlockType === "LINE" && b.Text).map((b) => b.Text!) || [];

  return {
    fullText: lines.join("\n"),
    lineCount: lines.length
  };
}
