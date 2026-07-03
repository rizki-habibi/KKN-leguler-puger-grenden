import { useState, useEffect } from "react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/fade-in";
import { Camera } from "lucide-react";
import { api, type Galeri } from "@/lib/api";

// Fallback gambar lokal
import kknJagung from "@/assets/gambar/kegiatan/kkn-jagung.png";
import bantuanBeras from "@/assets/gambar/kegiatan/bantuan-beras.png";
import tanamPohon from "@/assets/gambar/kegiatan/tanam-pohon.png";
import gotongRoyong from "@/assets/gambar/kegiatan/gotong-royong.png";
import sawahHijau from "@/assets/gambar/desa/sawah-hijau.png";
import kknPresentasi from "@/assets/gambar/kegiatan/kkn-presentasi.png";
import balaiDesa from "@/assets/gambar/desa/balai-desa.png";
import tariTradisional from "@/assets/gambar/kegiatan/tari-tradisional.png";

const GALERI_STATIS: Galeri[] = [
  { id: 1, judul: "Sawah Hijau Desa Grenden", deskripsi: "Pemandangan sawah hijau di desa pesisir Jember", gambarUrl: sawahHijau, kategori: "Alam", urutan: 1, createdAt: "", updatedAt: "" },
  { id: 2, judul: "Inovasi Olahan Jagung", deskripsi: "Mahasiswa KKN mengolah jagung bersama ibu-ibu PKK", gambarUrl: kknJagung, kategori: "Program", urutan: 2, createdAt: "", updatedAt: "" },
  { id: 3, judul: "Balai Desa Grenden", deskripsi: "Suasana balai desa", gambarUrl: balaiDesa, kategori: "Desa", urutan: 3, createdAt: "", updatedAt: "" },
  { id: 4, judul: "Tari Perang Sadeng", deskripsi: "Pertunjukan tari tradisional khas Grenden", gambarUrl: tariTradisional, kategori: "Budaya", urutan: 4, createdAt: "", updatedAt: "" },
  { id: 5, judul: "Bantuan Beras", deskripsi: "Penyaluran bantuan beras kepada warga", gambarUrl: bantuanBeras, kategori: "Sosial", urutan: 5, createdAt: "", updatedAt: "" },
  { id: 6, judul: "Gotong Royong", deskripsi: "Kegiatan gotong royong bersama warga", gambarUrl: gotongRoyong, kategori: "Kegiatan", urutan: 6, createdAt: "", updatedAt: "" },
  { id: 7, judul: "Presentasi Program KKN", deskripsi: "Presentasi kepada perangkat desa", gambarUrl: kknPresentasi, kategori: "Program", urutan: 7, createdAt: "", updatedAt: "" },
  { id: 8, judul: "Tanam Pohon", deskripsi: "Program penghijauan bersama warga", gambarUrl: tanamPohon, kategori: "Program", urutan: 8, createdAt: "", updatedAt: "" },
];

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<Galeri[]>(GALERI_STATIS);
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Galeri | null>(null);

  useEffect(() => {
    api.galeri.list()
      .then((data) => { if (data.length > 0) setGaleriList(data); })
      .catch(() => { /* pakai data statis */ })
      .finally(() => setLoading(false));
  }, []);

  const kategoriAda = ["Semua", ...Array.from(new Set(galeriList.map((g) => g.kategori ?? "Kegiatan")))];
  const galeriTampil = filter === "Semua" ? galeriList : galeriList.filter((g) => (g.kategori ?? "Kegiatan") === filter);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Galeri Desa</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Potret kehidupan, keindahan alam, dan dinamika kegiatan masyarakat Desa Grenden.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter */}
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

      {/* Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid rounded-2xl bg-muted animate-pulse h-48 mb-6" />
              ))}
            </div>
          ) : (
            <StaggerContainer className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galeriTampil.map((g) => (
                <StaggerItem key={g.id} className="break-inside-avoid">
                  <div
                    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-muted"
                    onClick={() => setSelected(g)}
                  >
                    <img
                      src={g.gambarUrl}
                      alt={g.judul}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-semibold text-sm leading-snug drop-shadow-md">{g.judul}</p>
                      {g.deskripsi && <p className="text-white/80 text-xs mt-1 line-clamp-2">{g.deskripsi}</p>}
                      {g.kategori && <span className="inline-block mt-1.5 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{g.kategori}</span>}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.gambarUrl} alt={selected.judul} className="w-full h-auto max-h-[70vh] object-contain rounded-xl" />
            <div className="text-white mt-4 text-center">
              <p className="font-bold text-lg">{selected.judul}</p>
              {selected.deskripsi && <p className="text-white/70 text-sm mt-1">{selected.deskripsi}</p>}
            </div>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">×</button>
          </div>
        </div>
      )}
    </div>
  );
}
