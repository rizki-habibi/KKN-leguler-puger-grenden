import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import anggotaRouter from "./anggota.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(anggotaRouter);

export default router;
