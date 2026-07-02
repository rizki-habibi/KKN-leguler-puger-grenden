import { Router, type IRouter } from "express";
import { generateToken } from "../middlewares/auth.js";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "grenden2025";

router.post("/auth/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: "Password salah" });
    return;
  }
  const token = generateToken();
  res.json({ token });
});

router.get("/auth/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Tidak terautentikasi" });
    return;
  }
  res.json({ loggedIn: true, role: "admin" });
});

export default router;
