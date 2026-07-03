import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { anggotaKknTable, insertAnggotaKknSchema, updateAnggotaKknSchema } from "@workspace/db";
import { adminAuth } from "../middlewares/auth.js";

const router: IRouter = Router();

router.get("/anggota", async (req, res) => {
  try {
    const anggota = await db
      .select()
      .from(anggotaKknTable)
      .orderBy(anggotaKknTable.urutan, anggotaKknTable.id);
    res.json(anggota);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil data anggota" });
  }
});

router.get("/anggota/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID tidak valid" });
      return;
    }
    const [anggota] = await db
      .select()
      .from(anggotaKknTable)
      .where(eq(anggotaKknTable.id, id));
    if (!anggota) {
      res.status(404).json({ message: "Anggota tidak ditemukan" });
      return;
    }
    res.json(anggota);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil data anggota" });
  }
});

router.post("/anggota", adminAuth, async (req, res) => {
  try {
    const parsed = insertAnggotaKknSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues });
      return;
    }
    const [created] = await db.insert(anggotaKknTable).values(parsed.data).returning();
    res.status(201).json(created);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menambahkan anggota" });
  }
});

router.put("/anggota/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID tidak valid" });
      return;
    }
    const parsed = updateAnggotaKknSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues });
      return;
    }
    const [updated] = await db
      .update(anggotaKknTable)
      .set({ ...parsed.data, updatedAt: new Date() } as any)
      .where(eq(anggotaKknTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ message: "Anggota tidak ditemukan" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal memperbarui anggota" });
  }
});

router.delete("/anggota/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID tidak valid" });
      return;
    }
    const [deleted] = await db
      .delete(anggotaKknTable)
      .where(eq(anggotaKknTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ message: "Anggota tidak ditemukan" });
      return;
    }
    res.json({ message: "Anggota berhasil dihapus" });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menghapus anggota" });
  }
});

export default router;
