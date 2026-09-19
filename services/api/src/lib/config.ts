import { z } from "zod";

const EnvSchema = z.object({
  AWS_REGION: z.string().min(1),
  DOCUMENT_BUCKET: z.string().min(1),
  DDB_TABLE_DOCUMENTS: z.string().min(1),
  DDB_TABLE_RISKS: z.string().min(1),
  BEDROCK_MODEL_ID: z.string().min(1),
  CORS_ORIGIN: z.string().default("http://localhost:3000")
});

export const config = EnvSchema.parse({
  AWS_REGION: process.env.AWS_REGION,
  DOCUMENT_BUCKET: process.env.DOCUMENT_BUCKET,
  DDB_TABLE_DOCUMENTS: process.env.DDB_TABLE_DOCUMENTS,
  DDB_TABLE_RISKS: process.env.DDB_TABLE_RISKS,
  BEDROCK_MODEL_ID: process.env.BEDROCK_MODEL_ID,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000"
});
