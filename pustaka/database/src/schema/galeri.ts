import { mysqlTable, serial, varchar, text, datetime, int } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const galeriTable = mysqlTable("galeri", {
  id: serial("id").primaryKey(),
  judul: varchar("judul", { length: 255 }).notNull(),
  deskripsi: text("deskripsi"),
  gambarUrl: text("gambar_url").notNull(),
  kategori: varchar("kategori", { length: 100 }).default("Kegiatan"),
  urutan: int("urutan").default(0),
  createdAt: datetime("created_at").$defaultFn(() => new Date()),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()),
});

export const insertGaleriSchema = createInsertSchema(galeriTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    judul: z.string().min(1),
    gambarUrl: z.string().min(1),
  });

export const updateGaleriSchema = insertGaleriSchema.partial();

export type Galeri = typeof galeriTable.$inferSelect;
export type InsertGaleri = z.infer<typeof insertGaleriSchema>;
