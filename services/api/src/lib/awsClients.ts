import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { TextractClient } from "@aws-sdk/client-textract";
import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || "us-east-1";

export const s3 = new S3Client({ region });
export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
export const textract = new TextractClient({ region });
export const bedrock = new BedrockRuntimeClient({ region });
