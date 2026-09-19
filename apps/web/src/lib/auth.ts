type LoginInput = { username: string; password: string };

export async function loginWithCognito({ username, password }: LoginInput) {
  // For hackathon: call backend auth proxy later, or use Amplify Auth.
  // Temporary local token for protected API calls:
  const fakeToken = `demo-${btoa(username + ":" + password)}-token-1234567890`;
  localStorage.setItem("demo_token", fakeToken);
  return { accessToken: fakeToken };
}
