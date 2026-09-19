const required = [
  "AWS_REGION",
  "DOCUMENT_BUCKET",
  "DDB_TABLE_DOCUMENTS",
  "DDB_TABLE_RISKS",
  "BEDROCK_MODEL_ID",
  "COGNITO_USER_POOL_ID",
  "COGNITO_APP_CLIENT_ID"
];

const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error("Missing env:", missing.join(", "));
  process.exit(1);
}
console.log("Preflight OK");
