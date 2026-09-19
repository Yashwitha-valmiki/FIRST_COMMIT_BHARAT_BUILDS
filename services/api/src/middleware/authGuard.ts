import { Request, Response, NextFunction } from "express";

/**
 * Hackathon auth guard skeleton.
 * Replace verifyToken() with Cognito JWT verification using jwks.
 */
function verifyToken(authHeader?: string): boolean {
  if (!authHeader) return false;
  if (!authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.slice("Bearer ".length).trim();
  // TODO: verify JWT signature + issuer + audience
  return token.length > 10;
}

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const ok = verifyToken(req.headers.authorization);
  if (!ok) return res.status(401).json({ message: "Unauthorized" });
  next();
}
