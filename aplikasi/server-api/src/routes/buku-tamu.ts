import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "@workspace/db";
import { bukuTamuTable, insertBukuTamuSchema, updateBukuTamuSchema } from "@workspace/db";
import { adminAuth } from "../middlewares/auth.js";

const router: IRouter = Router();

// GET semua tamu (publik)
router.get("/buku-tamu", async (req, res) => {
  try {
    const hasil = await db
      .select()
      .from(bukuTamuTable)
      .orderBy(desc(bukuTamuTable.tanggalKunjungan));
    res.json(hasil);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil data buku tamu" });
  }
});

// GET satu tamu by id
router.get("/buku-tamu/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [tamu] = await db.select().from(bukuTamuTable).where(eq(bukuTamuTable.id, id));
    if (!tamu) { res.status(404).json({ message: "Data tidak ditemukan" }); return; }
    res.json(tamu);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil data tamu" });
  }
});

// POST tambah tamu — dilindungi PIN humas (via adminAuth)
router.post("/buku-tamu", adminAuth, async (req, res) => {
  try {
    const parsed = insertBukuTamuSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues });
      return;
    }
    const [created] = await db.insert(bukuTamuTable).values(parsed.data).$returningId();
    const [tamu] = await db.select().from(bukuTamuTable).where(eq(bukuTamuTable.id, created.id));
    res.status(201).json(tamu);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menambahkan data tamu" });
  }
});

// PUT update tamu (admin)
router.put("/buku-tamu/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const parsed = updateBukuTamuSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues });
      return;
    }
    await db.update(bukuTamuTable).set({ ...parsed.data, updatedAt: new Date() } as any).where(eq(bukuTamuTable.id, id));
    const [updated] = await db.select().from(bukuTamuTable).where(eq(bukuTamuTable.id, id));
    if (!updated) { res.status(404).json({ message: "Data tidak ditemukan" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal memperbarui data tamu" });
  }
});

// DELETE tamu (admin)
router.delete("/buku-tamu/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [existing] = await db.select().from(bukuTamuTable).where(eq(bukuTamuTable.id, id));
    if (!existing) { res.status(404).json({ message: "Data tidak ditemukan" }); return; }
    await db.delete(bukuTamuTable).where(eq(bukuTamuTable.id, id));
    res.json({ message: "Data tamu berhasil dihapus" });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menghapus data tamu" });
  }
});

export default router;
