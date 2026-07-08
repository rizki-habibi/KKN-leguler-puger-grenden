import { createHmac } from "crypto";
import type { Request, Response, NextFunction } from "express";

const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-secret";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "grenden2025";
const HUMAS_PIN = process.env.HUMAS_PIN ?? "humas2026";

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

// Middleware khusus buku tamu — cek PIN humas dari header x-humas-pin
export function humasAuth(req: Request, res: Response, next: NextFunction): void {
  const pin = req.headers["x-humas-pin"];
  if (!pin || pin !== HUMAS_PIN) {
    res.status(401).json({ message: "PIN humas tidak valid" });
    return;
  }
  next();
}
