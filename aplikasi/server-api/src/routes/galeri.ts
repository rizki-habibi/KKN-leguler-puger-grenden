import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "@workspace/db";
import { galeriTable, insertGaleriSchema, updateGaleriSchema } from "@workspace/db";
import { adminAuth } from "../middlewares/auth.js";

const router: IRouter = Router();

// GET semua galeri (publik)
router.get("/galeri", async (req, res) => {
  try {
    const galeri = await db
      .select()
      .from(galeriTable)
      .orderBy(asc(galeriTable.urutan), asc(galeriTable.id));
    res.json(galeri);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil data galeri" });
  }
});

// GET satu item galeri
router.get("/galeri/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [item] = await db.select().from(galeriTable).where(eq(galeriTable.id, id));
    if (!item) { res.status(404).json({ message: "Item tidak ditemukan" }); return; }
    res.json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil item galeri" });
  }
});

// POST tambah galeri (admin)
router.post("/galeri", adminAuth, async (req, res) => {
  try {
    const parsed = insertGaleriSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues }); return; }
    const [created] = await db.insert(galeriTable).values(parsed.data).$returningId();
    const [item] = await db.select().from(galeriTable).where(eq(galeriTable.id, created.id));
    res.status(201).json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menambahkan item galeri" });
  }
});

// PUT update galeri (admin)
router.put("/galeri/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const parsed = updateGaleriSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues }); return; }
    await db.update(galeriTable).set({ ...parsed.data, updatedAt: new Date() } as any).where(eq(galeriTable.id, id));
    const [updated] = await db.select().from(galeriTable).where(eq(galeriTable.id, id));
    if (!updated) { res.status(404).json({ message: "Item tidak ditemukan" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal memperbarui item galeri" });
  }
});

// DELETE galeri (admin)
router.delete("/galeri/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [existing] = await db.select().from(galeriTable).where(eq(galeriTable.id, id));
    if (!existing) { res.status(404).json({ message: "Item tidak ditemukan" }); return; }
    await db.delete(galeriTable).where(eq(galeriTable.id, id));
    res.json({ message: "Item galeri berhasil dihapus" });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menghapus item galeri" });
  }
});

export default router;
