import { CognitoJwtVerifier } from "aws-jwt-verify";

const userPoolId = process.env.COGNITO_USER_POOL_ID || "";
const clientId = process.env.COGNITO_APP_CLIENT_ID || "";

if (!userPoolId || !clientId) {
  console.warn("Missing COGNITO_USER_POOL_ID / COGNITO_APP_CLIENT_ID");
}

export const cognitoVerifier = CognitoJwtVerifier.create({
  userPoolId,
  tokenUse: "id",
  clientId
});

export async function verifyIdToken(token: string) {
  return cognitoVerifier.verify(token);
}
