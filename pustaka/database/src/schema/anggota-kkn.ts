import {
  mysqlTable,
  serial,
  varchar,
  text,
  json,
  int,
  datetime,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export interface Pengalaman {
  institusi: string;
  posisi: string;
  durasi: string;
  deskripsi: string;
}

export const anggotaKknTable = mysqlTable("anggota_kkn", {
  id: serial("id").primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  jabatan: varchar("jabatan", { length: 255 }).notNull(),
  divisi: varchar("divisi", { length: 255 }).notNull(),
  nim: varchar("nim", { length: 50 }),
  programStudi: varchar("program_studi", { length: 255 }),
  fotoUrl: text("foto_url"),
  bio: text("bio"),
  bidangKeahlian: json("bidang_keahlian").$type<string[]>().default([]),
  pengalaman: json("pengalaman").$type<Pengalaman[]>().default([]),
  urutan: int("urutan").default(0),
  createdAt: datetime("created_at").$defaultFn(() => new Date()),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()),
});

export const insertAnggotaKknSchema = createInsertSchema(anggotaKknTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    bidangKeahlian: z.array(z.string()).optional().default([]),
    pengalaman: z
      .array(
        z.object({
          institusi: z.string(),
          posisi: z.string(),
          durasi: z.string(),
          deskripsi: z.string(),
        })
      )
      .optional()
      .default([]),
  });

export const updateAnggotaKknSchema = insertAnggotaKknSchema.partial();

export type AnggotaKkn = typeof anggotaKknTable.$inferSelect;
export type InsertAnggotaKkn = z.infer<typeof insertAnggotaKknSchema>;
