import { Request, Response } from "express";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../../lib/awsClients.js";
import { config } from "../../lib/config.js";

export async function createDocument(req: Request, res: Response) {
  try {
    const { documentId, key, fileName, contentType } = req.body || {};
    if (!documentId || !key || !fileName || !contentType) {
      return res.status(400).json({ message: "documentId, key, fileName, contentType required" });
    }

    await ddb.send(new PutCommand({
      TableName: config.DDB_TABLE_DOCUMENTS,
      Item: {
        PK: `DOC#${documentId}`,
        SK: "META",
        documentId,
        key,
        fileName,
        contentType,
        status: "UPLOADED",
        createdAt: new Date().toISOString()
      }
    }));

    return res.status(201).json({ message: "document created", documentId });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "create document failed" });
  }
}
