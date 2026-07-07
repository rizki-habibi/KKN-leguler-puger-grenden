import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import anggotaRouter from "./anggota.js";
import beritaRouter from "./berita.js";
import galeriRouter from "./galeri.js";
import kontenSosmedRouter from "./konten-sosmed.js";
import bukuTamuRouter from "./buku-tamu.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(anggotaRouter);
router.use(beritaRouter);
router.use(galeriRouter);
router.use(kontenSosmedRouter);
router.use(bukuTamuRouter);

export default router;
