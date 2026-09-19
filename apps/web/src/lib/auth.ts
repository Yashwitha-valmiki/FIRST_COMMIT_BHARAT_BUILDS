"use client";
import { configureAmplify } from "./amplify";
import { signInWithRedirect, fetchAuthSession, signOut, getCurrentUser } from "aws-amplify/auth";

export async function loginHostedUI() {
  configureAmplify();
  await signInWithRedirect();
}

export async function handleAuthCallbackAndStoreToken() {
  configureAmplify();
  const session = await fetchAuthSession();
  const token = session.tokens?.accessToken?.toString();
  if (!token) throw new Error("No access token after callback");
  localStorage.setItem("access_token", token);
  return token;
}

export async function getAccessToken() {
  configureAmplify();
  const local = localStorage.getItem("access_token");
  if (local) return local;
  const session = await fetchAuthSession();
  const token = session.tokens?.accessToken?.toString();
  if (!token) return null;
  localStorage.setItem("access_token", token);
  return token;
}

export async function whoAmI() {
  configureAmplify();
  return getCurrentUser();
}

export async function logout() {
  configureAmplify();
  localStorage.removeItem("access_token");
  await signOut();
}
