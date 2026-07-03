import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "@workspace/db";
import { beritaTable, insertBeritaSchema, updateBeritaSchema } from "@workspace/db";
import { adminAuth } from "../middlewares/auth.js";

const router: IRouter = Router();

// GET semua berita (publik - hanya yang diterbitkan, admin semua)
router.get("/berita", async (req, res) => {
  try {
    const isAdmin = req.headers.authorization?.startsWith("Bearer ");
    const semua = await db
      .select()
      .from(beritaTable)
      .orderBy(desc(beritaTable.createdAt));
    const hasil = isAdmin ? semua : semua.filter((b) => b.diterbitkan);
    res.json(hasil);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil data berita" });
  }
});

// GET satu berita by id
router.get("/berita/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [berita] = await db.select().from(beritaTable).where(eq(beritaTable.id, id));
    if (!berita) { res.status(404).json({ message: "Berita tidak ditemukan" }); return; }
    res.json(berita);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal mengambil berita" });
  }
});

// POST tambah berita (admin)
router.post("/berita", adminAuth, async (req, res) => {
  try {
    const parsed = insertBeritaSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues }); return; }
    const [created] = await db.insert(beritaTable).values(parsed.data).$returningId();
    const [berita] = await db.select().from(beritaTable).where(eq(beritaTable.id, created.id));
    res.status(201).json(berita);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menambahkan berita" });
  }
});

// PUT update berita (admin)
router.put("/berita/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const parsed = updateBeritaSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ message: "Data tidak valid", errors: parsed.error.issues }); return; }
    await db.update(beritaTable).set({ ...parsed.data, updatedAt: new Date() } as any).where(eq(beritaTable.id, id));
    const [updated] = await db.select().from(beritaTable).where(eq(beritaTable.id, id));
    if (!updated) { res.status(404).json({ message: "Berita tidak ditemukan" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal memperbarui berita" });
  }
});

// DELETE berita (admin)
router.delete("/berita/:id", adminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) { res.status(400).json({ message: "ID tidak valid" }); return; }
    const [existing] = await db.select().from(beritaTable).where(eq(beritaTable.id, id));
    if (!existing) { res.status(404).json({ message: "Berita tidak ditemukan" }); return; }
    await db.delete(beritaTable).where(eq(beritaTable.id, id));
    res.json({ message: "Berita berhasil dihapus" });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Gagal menghapus berita" });
  }
});

export default router;
