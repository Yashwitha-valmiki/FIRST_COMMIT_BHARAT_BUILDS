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
  const token = session.tokens?.idToken?.toString();
  if (!token) throw new Error("No id token after callback");
  localStorage.setItem("id_token", token);
  return token;
}

export async function getIdToken() {
  configureAmplify();
  const local = localStorage.getItem("id_token");
  if (local) return local;
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) return null;
  localStorage.setItem("id_token", token);
  return token;
}

export async function whoAmI() {
  configureAmplify();
  return getCurrentUser();
}

export async function logout() {
  configureAmplify();
  localStorage.removeItem("id_token");
  await signOut();
}
