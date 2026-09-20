import { Request, Response } from "express";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../../lib/awsClients.js";
import { config } from "../../lib/config.js";
import { extractTextFromS3 } from "../../domain/parse/textractFromS3.js";

export async function parseDocument(req: Request, res: Response) {
  try {
    const { documentId } = req.params;

    const doc = await ddb.send(new GetCommand({
      TableName: config.DDB_TABLE_DOCUMENTS,
      Key: { PK: `DOC#${documentId}`, SK: "META" }
    }));

    if (!doc.Item?.key) return res.status(404).json({ message: "document key not found" });

    const parsed = await extractTextFromS3(config.DOCUMENT_BUCKET, doc.Item.key);

    await ddb.send(new UpdateCommand({
      TableName: config.DDB_TABLE_DOCUMENTS,
      Key: { PK: `DOC#${documentId}`, SK: "META" },
      UpdateExpression: "SET #status=:s, parsedText=:t, parsedAt=:p",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: {
        ":s": "PARSED",
        ":t": parsed.fullText,
        ":p": new Date().toISOString()
      }
    }));

    return res.status(200).json({ message: "parsed", documentId, lineCount: parsed.lineCount });
  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ message: e?.message || "parse failed" });
  }
}
