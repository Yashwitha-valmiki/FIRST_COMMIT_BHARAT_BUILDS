import { CognitoJwtVerifier } from "aws-jwt-verify";

const userPoolId = process.env.COGNITO_USER_POOL_ID || "";
const clientId = process.env.COGNITO_APP_CLIENT_ID || "";
const region = process.env.AWS_REGION || "us-east-1";

if (!userPoolId || !clientId) {
  console.warn("Cognito verifier not fully configured. Set COGNITO_USER_POOL_ID and COGNITO_APP_CLIENT_ID");
}

export const cognitoVerifier = CognitoJwtVerifier.create({
  userPoolId,
  tokenUse: "access",
  clientId
});

export async function verifyAccessToken(token: string) {
  return cognitoVerifier.verify(token);
}
