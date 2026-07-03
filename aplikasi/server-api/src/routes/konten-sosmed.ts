import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "@workspace/db";
import { kontenSosmedTable, insertKontenSosmedSchema, updateKontenSosmedSchema } from "@workspace/db";
import { adminAuth } from "../middlewares/auth.js";

const router: IRouter = Router();

// GET semua konten sosmed (publik)
router.get("/konten-sosmed", async (req, res) => {
  try {
    const konten = await db
      .select()
      .from(kontenSosmedTable)
      .orderBy(asc(kontenSosmedTable.urutan), asc(kontenSosmedTable.id));
    res.json(konten);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil konten sosmed" });
  }
});

// GET satu konten
router.get("/konten-sosmed/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [konten] = await db.select().from(kontenSosmedTable).where(eq(kontenSosmedTable.id, id));
    if (!konten) { res.status(404).json({ message: "Konten tidak ditemukan" }); return; }
    res.json(konten);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil konten" });
  }
});

// POST tambah konten (admin)
router.post("/konten-sosmed", adminAuth, async (req, res) => {
  try {
    const parsed = insertKontenSosmedSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues }); return; }
    const [created] = await db.insert(kontenSosmedTable).values(parsed.data).$returningId();
    const [konten] = await db.select().from(kontenSosmedTable).where(eq(kontenSosmedTable.id, created.id));
    res.status(201).json(konten);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menambahkan konten" });
  }
});

// PUT update konten (admin)
router.put("/konten-sosmed/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const parsed = updateKontenSosmedSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues }); return; }
    await db.update(kontenSosmedTable).set({ ...parsed.data, updatedAt: new Date() } as any).where(eq(kontenSosmedTable.id, id));
    const [updated] = await db.select().from(kontenSosmedTable).where(eq(kontenSosmedTable.id, id));
    if (!updated) { res.status(404).json({ message: "Konten tidak ditemukan" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal memperbarui konten" });
  }
});

// DELETE konten (admin)
router.delete("/konten-sosmed/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [existing] = await db.select().from(kontenSosmedTable).where(eq(kontenSosmedTable.id, id));
    if (!existing) { res.status(404).json({ message: "Konten tidak ditemukan" }); return; }
    await db.delete(kontenSosmedTable).where(eq(kontenSosmedTable.id, id));
    res.json({ message: "Konten berhasil dihapus" });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menghapus konten" });
  }
});

export default router;
