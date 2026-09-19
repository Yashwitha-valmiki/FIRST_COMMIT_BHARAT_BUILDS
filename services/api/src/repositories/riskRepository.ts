import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../lib/awsClients.js";
import { env } from "../lib/env.js";

export async function saveRisk(documentId: string, payload: any) {
  await ddb.send(new PutCommand({
    TableName: env.DDB_TABLE_RISKS,
    Item: {
      PK: `DOC#${documentId}`,
      SK: "RISK#LATEST",
      ...payload,
      updatedAt: new Date().toISOString()
    }
  }));
}

export async function getRisk(documentId: string) {
  const out = await ddb.send(new GetCommand({
    TableName: env.DDB_TABLE_RISKS,
    Key: { PK: `DOC#${documentId}`, SK: "RISK#LATEST" }
  }));
  return out.Item || null;
}
