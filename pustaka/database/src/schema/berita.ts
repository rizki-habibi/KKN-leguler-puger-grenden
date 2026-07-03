import { mysqlTable, serial, varchar, text, datetime, boolean } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const beritaTable = mysqlTable("berita", {
  id: serial("id").primaryKey(),
  judul: varchar("judul", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  ringkasan: text("ringkasan"),
  isi: text("isi"),
  gambarUrl: text("gambar_url"),
  kategori: varchar("kategori", { length: 100 }).default("Umum"),
  diterbitkan: boolean("diterbitkan").default(false),
  createdAt: datetime("created_at").$defaultFn(() => new Date()),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()),
});

export const insertBeritaSchema = createInsertSchema(beritaTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    judul: z.string().min(1),
    slug: z.string().min(1),
  });

export const updateBeritaSchema = insertBeritaSchema.partial();

export type Berita = typeof beritaTable.$inferSelect;
export type InsertBerita = z.infer<typeof insertBeritaSchema>;
