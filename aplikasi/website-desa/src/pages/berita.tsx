import { useState, useEffect } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Calendar, ArrowRight, Newspaper, Tag } from "lucide-react";
import { api, type Berita } from "@/lib/api";

// Fallback data statis kalau backend tidak tersedia
const BERITA_STATIS: Berita[] = [
  { id: 1, judul: "KKN ITS Mandala Jember Resmi Bertugas di Desa Grenden", slug: "kkn-its-resmi-bertugas", ringkasan: "Tim KKN Reguler ITS Mandala Jember 2026 resmi diserahkan dan mulai bertugas di Desa Grenden.", isi: null, gambarUrl: "/gambar/kegiatan/kkn-presentasi.png", kategori: "KKN", diterbitkan: true, createdAt: "2026-07-01T00:00:00.000Z", updatedAt: "2026-07-01T00:00:00.000Z" },
  { id: 2, judul: "Inovasi Produk Olahan Jagung Tingkatkan Nilai Ekonomi Warga", slug: "inovasi-olahan-jagung", ringkasan: "Mahasiswa KKN berkolaborasi dengan ibu-ibu PKK untuk mengembangkan produk olahan jagung bernilai ekonomi tinggi.", isi: null, gambarUrl: "/gambar/kegiatan/kkn-jagung.png", kategori: "Pertanian", diterbitkan: true, createdAt: "2026-07-02T00:00:00.000Z", updatedAt: "2026-07-02T00:00:00.000Z" },
  { id: 3, judul: "Gotong Royong Pembersihan Lingkungan Desa Grenden", slug: "gotong-royong-2026", ringkasan: "Mahasiswa KKN bersama warga Desa Grenden menggelar kegiatan gotong royong membersihkan lingkungan.", isi: null, gambarUrl: "/gambar/kegiatan/gotong-royong.png", kategori: "Sosial", diterbitkan: true, createdAt: "2026-07-03T00:00:00.000Z", updatedAt: "2026-07-03T00:00:00.000Z" },
];

const WARNA_KATEGORI: Record<string, string> = {
  KKN: "bg-green-100 text-green-700",
  Pertanian: "bg-amber-100 text-amber-700",
  Sosial: "bg-blue-100 text-blue-700",
  Program: "bg-purple-100 text-purple-700",
  Budaya: "bg-pink-100 text-pink-700",
  Umum: "bg-gray-100 text-gray-600",
};

export default function Berita() {
  const [beritaList, setBeritaList] = useState<Berita[]>(BERITA_STATIS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");

  useEffect(() => {
    api.berita.list(false)
      .then((data) => { if (data.length > 0) setBeritaList(data); })
      .catch(() => { /* pakai data statis */ })
      .finally(() => setLoading(false));
  }, []);

  const kategoriAda = ["Semua", ...Array.from(new Set(beritaList.map((b) => b.kategori ?? "Umum")))];
  const beritaTampil = filter === "Semua" ? beritaList : beritaList.filter((b) => (b.kategori ?? "Umum") === filter);

  const formatTgl = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Berita Desa</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Kabar terbaru, pengumuman, dan dokumentasi kegiatan pembangunan Desa Grenden.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Kategori */}
      <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b py-3 px-4">
        <div className="container mx-auto max-w-5xl flex flex-wrap gap-2">
          {kategoriAda.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${filter === k ? "bg-primary text-white border-primary" : "bg-muted text-muted-foreground border-transparent hover:border-border"
                }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Konten */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border bg-muted animate-pulse h-72" />
              ))}
            </div>
          ) : beritaTampil.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Belum ada berita</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beritaTampil.map((b) => (
                <StaggerItem key={b.id}>
                  <div className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group cursor-pointer">
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      {b.gambarUrl ? (
                        <img src={b.gambarUrl} alt={b.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Newspaper className="w-12 h-12 text-muted-foreground/30" /></div>
                      )}
                      {b.kategori && (
                        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${WARNA_KATEGORI[b.kategori] ?? WARNA_KATEGORI["Umum"]}`}>
                          <Tag className="w-3 h-3" />{b.kategori}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3.5 h-3.5" />{formatTgl(b.createdAt)}
                      </span>
                      <h2 className="text-base font-bold text-foreground mb-2 line-clamp-3 group-hover:text-primary transition-colors leading-snug">
                        {b.judul}
                      </h2>
                      {b.ringkasan && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{b.ringkasan}</p>
                      )}
                      <div className="mt-auto pt-3 border-t flex items-center text-sm font-bold text-primary">
                        Baca Selengkapnya <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </div>
  );
}
