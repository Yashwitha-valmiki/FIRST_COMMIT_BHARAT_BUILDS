import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { textract } from "../../lib/awsClients.js";

export async function extractTextFromS3(bucket: string, key: string) {
  const out = await textract.send(new AnalyzeDocumentCommand({
    Document: { S3Object: { Bucket: bucket, Name: key } },
    FeatureTypes: ["FORMS", "TABLES"]
  }));

  const lines = (out.Blocks || [])
    .filter(b => b.BlockType === "LINE" && b.Text)
    .map(b => b.Text as string);

  return {
    fullText: lines.join("\n"),
    lineCount: lines.length
  };
}
