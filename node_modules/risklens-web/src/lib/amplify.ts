"use client";
import { Amplify } from "aws-amplify";

let configured = false;

export function configureAmplify() {
  if (configured) return;
  const region = process.env.NEXT_PUBLIC_AWS_REGION!;
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!;
  const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!;
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const redirectSignIn = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN!;
  const redirectSignOut = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT!;

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        loginWith: {
          oauth: {
            domain,
            scopes: ["email", "openid", "profile"],
            redirectSignIn: [redirectSignIn],
            redirectSignOut: [redirectSignOut],
            responseType: "code"
          }
        }
      }
    }
  });

  configured = true;
}
