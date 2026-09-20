import { Request, Response, NextFunction } from "express";

const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQ = 60;

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, ts: now };

  if (now - rec.ts > WINDOW_MS) {
    rec.count = 0;
    rec.ts = now;
  }

  rec.count += 1;
  hits.set(ip, rec);

  if (rec.count > MAX_REQ) return res.status(429).json({ message: "Too many requests" });
  next();
}
