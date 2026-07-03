import { pgTable, serial, text, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export interface Pengalaman {
  institusi: string;
  posisi: string;
  durasi: string;
  deskripsi: string;
}

export const anggotaKknTable = pgTable("anggota_kkn", {
  id: serial("id").primaryKey(),
  nama: text("nama").notNull(),
  jabatan: text("jabatan").notNull(),
  divisi: text("divisi").notNull(),
  nim: text("nim"),
  programStudi: text("program_studi"),
  fotoUrl: text("foto_url"),
  bio: text("bio"),
  bidangKeahlian: jsonb("bidang_keahlian").$type<string[]>().default([]),
  pengalaman: jsonb("pengalaman").$type<Pengalaman[]>().default([]),
  urutan: integer("urutan").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
