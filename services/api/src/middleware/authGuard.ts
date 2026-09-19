import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/cognitoVerifier.js";

export async function authGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.slice("Bearer ".length).trim();
    const payload = await verifyAccessToken(token);

    (req as any).user = {
      sub: payload.sub,
      username: payload.username || payload.client_id || "unknown"
    };

    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
