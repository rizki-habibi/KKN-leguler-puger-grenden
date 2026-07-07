import { mysqlTable, serial, varchar, text, datetime, date } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bukuTamuTable = mysqlTable("buku_tamu", {
  id: serial("id").primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  jabatanInstansi: varchar("jabatan_instansi", { length: 255 }),
  noTelepon: varchar("no_telepon", { length: 50 }),
  keperluan: text("keperluan"),
  tanggalKunjungan: date("tanggal_kunjungan").notNull(),
  createdAt: datetime("created_at").$defaultFn(() => new Date()),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()),
});

export const insertBukuTamuSchema = createInsertSchema(bukuTamuTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    nama: z.string().min(1, "Nama wajib diisi"),
    tanggalKunjungan: z.string().min(1, "Tanggal wajib diisi"),
  });

export const updateBukuTamuSchema = insertBukuTamuSchema.partial();

export type BukuTamu = typeof bukuTamuTable.$inferSelect;
export type InsertBukuTamu = z.infer<typeof insertBukuTamuSchema>;
