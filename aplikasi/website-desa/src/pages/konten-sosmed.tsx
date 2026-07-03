import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Instagram, Youtube, Link as LinkIcon } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

const STORAGE_KEY = "grenden-kkn-konten";

type Platform = "Instagram" | "TikTok" | "YouTube" | "Facebook" | "Twitter/X" | "Lainnya";

interface Konten {
  id: string;
  judul: string;
  platform: Platform;
  url: string;
  deskripsi: string;
  tanggal: string;
}

const PLATFORM_STYLE: Record<Platform, { color: string; icon: React.ReactNode }> = {
  Instagram: {
    color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    icon: <Instagram className="w-4 h-4" />,
  },
  TikTok: {
    color: "bg-gray-900 text-white",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" />
      </svg>
    ),
  },
  YouTube: {
    color: "bg-red-600 text-white",
    icon: <Youtube className="w-4 h-4" />,
  },
  Facebook: {
    color: "bg-blue-600 text-white",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  "Twitter/X": {
    color: "bg-black text-white",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  Lainnya: {
    color: "bg-gray-600 text-white",
    icon: <LinkIcon className="w-4 h-4" />,
  },
};

const DATA_AWAL: Konten[] = [
  {
    id: "1",
    judul: "Observasi Awal dan Penentuan Perlengkapan KKN",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Surya bersama tim melakukan observasi awal Desa Grenden dan menentukan perlengkapan yang akan dibawa selama kegiatan KKN berlangsung.",
    tanggal: "2026-07-01",
  },
  {
    id: "2",
    judul: "Perkenalan Tim KKN Reguler di Desa Grenden",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Tim KKN Reguler ITS Mandala Jember resmi memperkenalkan diri kepada perangkat dan warga Desa Grenden. Semangat mengabdi!",
    tanggal: "2026-07-01",
  },
  {
    id: "3",
    judul: "Penyerahan Mahasiswa KKN ke Desa Grenden",
    platform: "TikTok",
    url: "https://www.tiktok.com",
    deskripsi: "Momen penyerahan resmi mahasiswa KKN Reguler kepada pemerintah Desa Grenden oleh Dosen Pembimbing Lapangan ITS Mandala Jember.",
    tanggal: "2026-07-01",
  },
  {
    id: "4",
    judul: "Inovasi Produk Olahan Jagung Bersama PKK Desa Grenden",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Dokumentasi kegiatan inovasi produk olahan jagung bersama ibu-ibu PKK Desa Grenden. Mengolah komoditas lokal menjadi produk bernilai tinggi.",
    tanggal: "2025-08-20",
  },
  {
    id: "5",
    judul: "Vlog Penyaluran Bantuan Beras kepada Warga",
    platform: "TikTok",
    url: "https://www.tiktok.com",
    deskripsi: "Video dokumentasi mahasiswa KKN ikut serta dalam penyaluran bantuan beras kepada warga Desa Grenden.",
    tanggal: "2025-07-28",
  },
  {
    id: "6",
    judul: "Katalog Potensi Komoditas Pangan Desa Grenden",
    platform: "YouTube",
    url: "https://www.youtube.com",
    deskripsi: "Video lengkap katalog potensi komoditas pangan di Desa Grenden yang disusun oleh mahasiswa KKN ITS Mandala Jember tahun 2025.",
    tanggal: "2025-08-04",
  },
  {
    id: "7",
    judul: "Produk Camilan dan Sirup Bergizi dari Pangan Lokal",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Produk hasil pangan lokal Desa Grenden: camilan dan sirup bergizi buah tangan mahasiswa KKN untuk warga setempat.",
    tanggal: "2025-08-13",
  },
  {
    id: "8",
    judul: "Gotong Royong Bersama Warga Desa Grenden",
    platform: "TikTok",
    url: "https://www.tiktok.com",
    deskripsi: "Tim KKN bersama warga bergotong royong membersihkan lingkungan desa. Semangat kebersamaan yang luar biasa!",
    tanggal: "2025-07-20",
  },
];

export default function KontenSosmed() {
  const [daftarKonten, setDaftarKonten] = useState<Konten[]>([]);
  const [filterPlatform, setFilterPlatform] = useState<Platform | "Semua">("Semua");

  useEffect(() => {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (tersimpan) {
      setDaftarKonten(JSON.parse(tersimpan));
    } else {
      setDaftarKonten(DATA_AWAL);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA_AWAL));
    }
  }, []);

  const kontenTampil = filterPlatform === "Semua"
    ? daftarKonten
    : daftarKonten.filter((k) => k.platform === filterPlatform);

  const platformAda = Array.from(new Set(daftarKonten.map((k) => k.platform)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <LinkIcon className="w-4 h-4" />
              KKN Reguler — Konten Media Sosial
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Konten Sosial Media</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Kumpulan tautan konten dokumentasi kegiatan KKN di Instagram, TikTok, YouTube, dan platform lainnya.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Platform */}
      <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            {(["Semua", ...platformAda] as (Platform | "Semua")[]).map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlatform(p)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  filterPlatform === p
                    ? "bg-primary text-white border-primary"
                    : "bg-muted text-muted-foreground border-transparent hover:border-border"
                }`}
              >
                {p} {p !== "Semua" ? `(${daftarKonten.filter((k) => k.platform === p).length})` : `(${daftarKonten.length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Daftar Konten */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          {kontenTampil.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <LinkIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Belum ada konten</p>
              <p className="text-sm mt-1">Konten akan segera hadir.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {kontenTampil.map((konten) => {
                  const style = PLATFORM_STYLE[konten.platform];
                  return (
                    <motion.div
                      key={konten.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col"
                    >
                      {/* Platform Header */}
                      <div className={`px-5 py-3 flex items-center gap-2 ${style.color}`}>
                        {style.icon}
                        <span className="font-semibold text-sm">{konten.platform}</span>
                        <span className="ml-auto text-xs opacity-75">
                          {new Date(konten.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      {/* Konten */}
                      <div className="p-5 flex-1 flex flex-col gap-2">
                        <h3 className="font-bold text-foreground leading-snug line-clamp-2">{konten.judul}</h3>
                        {konten.deskripsi && (
                          <p className="text-muted-foreground text-sm line-clamp-3">{konten.deskripsi}</p>
                        )}
                        <a
                          href={konten.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Buka Konten
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Info Admin */}
      <section className="py-6 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          Pengelolaan konten dilakukan oleh tim admin.{" "}
          <a href="/admin" className="text-primary hover:underline font-medium">
            Login ke panel admin
          </a>{" "}
          untuk menambah, mengubah, atau menghapus konten.
        </div>
      </section>
    </div>
  );
}
