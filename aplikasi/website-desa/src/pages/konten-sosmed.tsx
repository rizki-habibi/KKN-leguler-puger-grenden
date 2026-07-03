import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Instagram, Youtube, Link as LinkIcon } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { api, type KontenSosmed } from "@/lib/api";

type Platform = "Instagram" | "TikTok" | "YouTube" | "Facebook" | "Twitter/X" | "Lainnya";

const PLATFORM_STYLE: Record<string, { color: string; icon: React.ReactNode }> = {
  Instagram: { color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white", icon: <Instagram className="w-4 h-4" /> },
  TikTok: { color: "bg-gray-900 text-white", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" /></svg> },
  YouTube: { color: "bg-red-600 text-white", icon: <Youtube className="w-4 h-4" /> },
  Facebook: { color: "bg-blue-600 text-white", icon: <LinkIcon className="w-4 h-4" /> },
  "Twitter/X": { color: "bg-black text-white", icon: <LinkIcon className="w-4 h-4" /> },
  Lainnya: { color: "bg-gray-600 text-white", icon: <LinkIcon className="w-4 h-4" /> },
};

const KONTEN_STATIS: KontenSosmed[] = [
  { id: 1, judul: "Observasi Awal dan Penentuan Perlengkapan KKN", platform: "Instagram", url: "https://www.instagram.com/kkn_desagrendenpuger", deskripsi: "Tim melakukan observasi awal Desa Grenden.", tanggal: "2026-07-01", urutan: 1, createdAt: "", updatedAt: "" },
  { id: 2, judul: "Perkenalan Tim KKN Reguler di Desa Grenden", platform: "Instagram", url: "https://www.instagram.com/kkn_desagrendenpuger", deskripsi: "Tim KKN resmi memperkenalkan diri kepada warga Desa Grenden.", tanggal: "2026-07-01", urutan: 2, createdAt: "", updatedAt: "" },
  { id: 3, judul: "Penyerahan Mahasiswa KKN ke Desa Grenden", platform: "TikTok", url: "https://www.tiktok.com/@kkn_desagrendenpuger", deskripsi: "Momen penyerahan resmi mahasiswa KKN oleh DPL.", tanggal: "2026-07-01", urutan: 3, createdAt: "", updatedAt: "" },
  { id: 4, judul: "Inovasi Produk Olahan Jagung Bersama PKK", platform: "Instagram", url: "https://www.instagram.com/kkn_desagrendenpuger", deskripsi: "Dokumentasi inovasi produk olahan jagung bersama PKK.", tanggal: "2026-07-03", urutan: 4, createdAt: "", updatedAt: "" },
  { id: 5, judul: "Vlog Penyaluran Bantuan Beras kepada Warga", platform: "TikTok", url: "https://www.tiktok.com/@kkn_desagrendenpuger", deskripsi: "Video dokumentasi penyaluran bantuan beras.", tanggal: "2026-07-02", urutan: 5, createdAt: "", updatedAt: "" },
];

export default function KontenSosmed() {
  const [daftarKonten, setDaftarKonten] = useState<KontenSosmed[]>(KONTEN_STATIS);
  const [filterPlatform, setFilterPlatform] = useState<string>("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.kontenSosmed.list()
      .then((data) => { if (data.length > 0) setDaftarKonten(data); })
      .catch(() => { /* pakai data statis */ })
      .finally(() => setLoading(false));
  }, []);

  const platformAda = Array.from(new Set(daftarKonten.map((k) => k.platform)));
  const kontenTampil = filterPlatform === "Semua" ? daftarKonten : daftarKonten.filter((k) => k.platform === filterPlatform);

  const formatTgl = (d: string) => {
    try { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <LinkIcon className="w-4 h-4" />KKN Reguler — Konten Media Sosial
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Konten Sosial Media</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Kumpulan tautan konten dokumentasi kegiatan KKN di Instagram, TikTok, YouTube, dan platform lainnya.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b py-4 px-4">
        <div className="container mx-auto max-w-5xl flex flex-wrap gap-2">
          {(["Semua", ...platformAda]).map((p) => (
            <button key={p} onClick={() => setFilterPlatform(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${filterPlatform === p ? "bg-primary text-white border-primary" : "bg-muted text-muted-foreground border-transparent hover:border-border"}`}>
              {p} ({p === "Semua" ? daftarKonten.length : daftarKonten.filter(k => k.platform === p).length})
            </button>
          ))}
        </div>
      </section>

      {/* Konten */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => <div key={i} className="rounded-2xl border bg-muted animate-pulse h-48" />)}
            </div>
          ) : kontenTampil.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <LinkIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Belum ada konten</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {kontenTampil.map((konten) => {
                  const style = PLATFORM_STYLE[konten.platform] ?? PLATFORM_STYLE["Lainnya"];
                  return (
                    <motion.div key={konten.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
                      <div className={`px-5 py-3 flex items-center gap-2 ${style.color}`}>
                        {style.icon}
                        <span className="font-semibold text-sm">{konten.platform}</span>
                        {konten.tanggal && <span className="ml-auto text-xs opacity-75">{formatTgl(konten.tanggal)}</span>}
                      </div>
                      <div className="p-5 flex-1 flex flex-col gap-2">
                        <h3 className="font-bold text-foreground leading-snug line-clamp-2">{konten.judul}</h3>
                        {konten.deskripsi && <p className="text-muted-foreground text-sm line-clamp-3">{konten.deskripsi}</p>}
                        <a href={konten.url} target="_blank" rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />Buka Konten
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

      <section className="py-6 px-4 border-t bg-muted/30">
        <div className="container mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          Pengelolaan konten oleh tim admin.{" "}
          <a href="/admin" className="text-primary hover:underline font-medium">Login ke panel admin</a>{" "}
          untuk menambah atau mengubah konten.
        </div>
      </section>
    </div>
  );
}
