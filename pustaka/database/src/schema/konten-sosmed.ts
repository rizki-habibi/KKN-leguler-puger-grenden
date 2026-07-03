import { mysqlTable, serial, varchar, text, datetime, int } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const kontenSosmedTable = mysqlTable("konten_sosmed", {
  id: serial("id").primaryKey(),
  judul: varchar("judul", { length: 255 }).notNull(),
  platform: varchar("platform", { length: 50 }).notNull().default("Instagram"),
  url: text("url").notNull(),
  deskripsi: text("deskripsi"),
  tanggal: varchar("tanggal", { length: 20 }),
  urutan: int("urutan").default(0),
  createdAt: datetime("created_at").$defaultFn(() => new Date()),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()),
});

export const insertKontenSosmedSchema = createInsertSchema(kontenSosmedTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    judul: z.string().min(1),
    url: z.string().min(1),
  });

export const updateKontenSosmedSchema = insertKontenSosmedSchema.partial();

export type KontenSosmed = typeof kontenSosmedTable.$inferSelect;
export type InsertKontenSosmed = z.infer<typeof insertKontenSosmedSchema>;
