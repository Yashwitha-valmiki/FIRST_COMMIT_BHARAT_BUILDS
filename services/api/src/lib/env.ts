export const env = {
  AWS_REGION: process.env.AWS_REGION || "us-east-1",
  DOCUMENT_BUCKET: process.env.DOCUMENT_BUCKET || "",
  DDB_TABLE_DOCUMENTS: process.env.DDB_TABLE_DOCUMENTS || "Documents",
  DDB_TABLE_RISKS: process.env.DDB_TABLE_RISKS || "RiskAssessments"
};
