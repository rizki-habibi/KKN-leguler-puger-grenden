import { useState, useEffect } from "react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/fade-in";
import { Camera } from "lucide-react";
import { api, type Galeri } from "@/lib/api";

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState<Galeri[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Galeri | null>(null);

  useEffect(() => {
    api.galeri.list()
      .then((data) => setGaleriList(data))
      .catch(() => setGaleriList([]))
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
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-yellow-300">Galeri Desa</h1>
            <p className="text-xl text-white/90 leading-relaxed">
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
          ) : galeriTampil.length === 0 ? (
            <FadeIn>
              <div className="text-center py-24 text-muted-foreground">
                <Camera className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Belum ada foto galeri</p>
                <a href="/admin" className="text-primary hover:underline text-sm mt-2 inline-block font-medium">
                  Tambahkan melalui panel admin
                </a>
              </div>
            </FadeIn>
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
