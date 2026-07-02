import { createHmac } from "crypto";
import type { Request, Response, NextFunction } from "express";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-secret";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "grenden2025";

export function generateToken(): string {
  return createHmac("sha256", SESSION_SECRET).update(ADMIN_PASSWORD).digest("hex");
}

export function verifyToken(token: string): boolean {
  const expected = generateToken();
  return token === expected;
}

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token tidak ditemukan" });
    return;
  }
  const token = auth.slice(7);
  if (!verifyToken(token)) {
    res.status(401).json({ message: "Token tidak valid" });
    return;
  }
  next();
}
