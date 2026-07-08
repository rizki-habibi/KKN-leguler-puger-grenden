import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Calendar, MapPin, Users, Tag, X } from "lucide-react";

// Gambar kegiatan lokal
import gotongRoyong from "@/assets/gambar/kegiatan/gotong-royong.png";
import bantuanBeras from "@/assets/gambar/kegiatan/bantuan-beras.png";
import kknJagung from "@/assets/gambar/kegiatan/kkn-jagung.png";
import kknPresentasi from "@/assets/gambar/kegiatan/kkn-presentasi.png";
import tanamPohon from "@/assets/gambar/kegiatan/tanam-pohon.png";
import tariTradisional from "@/assets/gambar/kegiatan/tari-tradisional.png";
import kknKegiatan1 from "@/assets/gambar/kegiatan/kegiatan-kkn-1.png";
import kknKegiatan2 from "@/assets/gambar/kegiatan/kegiatan-kkn-2.png";

type KategoriKegiatan = "Sosial" | "Lingkungan" | "Ekonomi" | "Budaya" | "Pendidikan" | "Kesehatan";

interface Kegiatan {
  id: number;
  judul: string;
  tanggal: string;
  lokasi: string;
  peserta: string;
  deskripsi: string;
  kategori: KategoriKegiatan;
  gambar: string;
}

const WARNA_KATEGORI: Record<KategoriKegiatan, string> = {
  Sosial: "bg-blue-100 text-blue-700",
  Lingkungan: "bg-green-100 text-green-700",
  Ekonomi: "bg-amber-100 text-amber-700",
  Budaya: "bg-pink-100 text-pink-700",
  Pendidikan: "bg-purple-100 text-purple-700",
  Kesehatan: "bg-red-100 text-red-700",
};

const DAFTAR_KEGIATAN: Kegiatan[] = [
  {
    id: 1,
    judul: "Penyerahan Mahasiswa KKN ke Desa Grenden",
    tanggal: "1 Juli 2026",
    lokasi: "Balai Desa Grenden",
    peserta: "Mahasiswa KKN, DPL, Perangkat Desa",
    deskripsi:
      "Serah terima resmi mahasiswa KKN Reguler ITS Mandala Jember oleh Dosen Pembimbing Lapangan kepada Kepala Desa Grenden. Kegiatan ini menandai awal pengabdian tim KKN di Desa Grenden.",
    kategori: "Sosial",
    gambar: kknPresentasi,
  },
  {
    id: 2,
    judul: "Gotong Royong Bersih-Bersih Lingkungan",
    tanggal: "3 Juli 2026",
    lokasi: "Seluruh wilayah Desa Grenden",
    peserta: "Mahasiswa KKN, warga, dan perangkat desa",
    deskripsi:
      "Kegiatan gotong royong membersihkan lingkungan desa bersama seluruh warga dan perangkat Desa Grenden. Kegiatan meliputi pembersihan jalan, saluran air, dan fasilitas umum.",
    kategori: "Lingkungan",
    gambar: gotongRoyong,
  },
  {
    id: 3,
    judul: "Inovasi Produk Olahan Jagung bersama PKK",
    tanggal: "3 Juli 2026",
    lokasi: "Balai Desa Grenden",
    peserta: "Ibu-ibu PKK Desa Grenden, mahasiswa KKN",
    deskripsi:
      "Pelatihan pengolahan jagung menjadi produk bernilai ekonomi tinggi bersama ibu-ibu PKK Desa Grenden. Produk yang dihasilkan dikemas secara menarik untuk dipasarkan.",
    kategori: "Ekonomi",
    gambar: kknJagung,
  },
  {
    id: 4,
    judul: "Penyaluran Bantuan Beras kepada Warga",
    tanggal: "2 Juli 2026",
    lokasi: "Desa Grenden",
    peserta: "Warga penerima manfaat, mahasiswa KKN",
    deskripsi:
      "Program penyaluran bantuan beras kepada warga Desa Grenden yang membutuhkan. Kegiatan ini merupakan bagian dari program sosial kemasyarakatan tim KKN.",
    kategori: "Sosial",
    gambar: bantuanBeras,
  },
  {
    id: 5,
    judul: "Program Penghijauan — Tanam Pohon",
    tanggal: "4 Juli 2026",
    lokasi: "Area Terbuka Desa Grenden",
    peserta: "Mahasiswa KKN, warga desa",
    deskripsi:
      "Penanaman pohon di area terbuka Desa Grenden sebagai upaya penghijauan dan pelestarian lingkungan. Tim KKN berkolaborasi dengan warga untuk menjaga kelestarian alam desa.",
    kategori: "Lingkungan",
    gambar: tanamPohon,
  },
  {
    id: 6,
    judul: "Penampilan Tari Perang Sadeng",
    tanggal: "5 Juli 2026",
    lokasi: "Balai Desa Grenden",
    peserta: "Penari tradisional, warga, mahasiswa KKN",
    deskripsi:
      "Penampilan tari tradisional khas Grenden sebagai upaya pelestarian budaya lokal. Mahasiswa KKN turut hadir dan mendokumentasikan kegiatan seni budaya ini.",
    kategori: "Budaya",
    gambar: tariTradisional,
  },
  {
    id: 7,
    judul: "Orientasi dan Survei Wilayah Desa",
    tanggal: "1 Juli 2026",
    lokasi: "Seluruh Desa Grenden",
    peserta: "Mahasiswa KKN",
    deskripsi:
      "Survei dan orientasi wilayah Desa Grenden untuk mengenal potensi dan permasalahan desa. Tim KKN memetakan wilayah dan berinteraksi langsung dengan warga.",
    kategori: "Pendidikan",
    gambar: kknKegiatan1,
  },
  {
    id: 8,
    judul: "Perkenalan dan Silaturahmi dengan Warga",
    tanggal: "1 Juli 2026",
    lokasi: "Dusun-dusun Desa Grenden",
    peserta: "Mahasiswa KKN, warga desa",
    deskripsi:
      "Kegiatan perkenalan dan silaturahmi tim KKN kepada warga Desa Grenden di berbagai dusun. Momen ini mempererat hubungan antara mahasiswa dan masyarakat desa.",
    kategori: "Sosial",
    gambar: kknKegiatan2,
  },
];

export default function KegiatanPage() {
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState<Kegiatan | null>(null);

  const kategoriAda = ["Semua", ...Array.from(new Set(DAFTAR_KEGIATAN.map((k) => k.kategori)))];
  const kegiatanTampil =
    filter === "Semua"
      ? DAFTAR_KEGIATAN
      : DAFTAR_KEGIATAN.filter((k) => k.kategori === filter);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-yellow-300">Kegiatan KKN</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Dokumentasi seluruh kegiatan Tim KKN Reguler ITS Mandala Jember di Desa Grenden,
              Kecamatan Puger, Kabupaten Jember.
            </p>
          </FadeIn>

          {/* Stat */}
          <FadeIn delay={0.2}>
            <div className="mt-8 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-semibold">{DAFTAR_KEGIATAN.length} Kegiatan Terdokumentasi</span>
            </div>
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
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${filter === k
                  ? "bg-primary text-white border-primary"
                  : "bg-muted text-muted-foreground border-transparent hover:border-border"
                }`}
            >
              {k}{" "}
              <span className="opacity-70">
                ({k === "Semua" ? DAFTAR_KEGIATAN.length : DAFTAR_KEGIATAN.filter((g) => g.kategori === k).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {kegiatanTampil.map((kegiatan) => {
                const warna = WARNA_KATEGORI[kegiatan.kategori];
                return (
                  <StaggerItem key={kegiatan.id}>
                    <motion.div
                      layout
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-full cursor-pointer group"
                      onClick={() => setSelected(kegiatan)}
                    >
                      {/* Gambar */}
                      <div className="aspect-video overflow-hidden bg-muted relative">
                        <img
                          src={kegiatan.gambar}
                          alt={kegiatan.judul}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${warna}`}>
                          <Tag className="w-3 h-3" />
                          {kegiatan.kategori}
                        </span>
                      </div>

                      {/* Konten */}
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <h3 className="font-bold text-foreground font-serif leading-snug group-hover:text-primary transition-colors">
                          {kegiatan.judul}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {kegiatan.deskripsi}
                        </p>
                        <div className="mt-auto pt-3 border-t flex flex-col gap-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                            {kegiatan.tanggal}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                            {kegiatan.lokasi}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                            {kegiatan.peserta}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </AnimatePresence>
          </StaggerContainer>
        </div>
      </section>

      {/* Modal Detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selected.gambar}
                  alt={selected.judul}
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${WARNA_KATEGORI[selected.kategori]}`}>
                  {selected.kategori}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold font-serif text-foreground leading-snug">
                  {selected.judul}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{selected.deskripsi}</p>
                <div className="grid grid-cols-1 gap-2 pt-4 border-t text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
                    <span><span className="font-semibold text-foreground">Tanggal:</span> {selected.tanggal}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
                    <span><span className="font-semibold text-foreground">Lokasi:</span> {selected.lokasi}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
                    <span><span className="font-semibold text-foreground">Peserta:</span> {selected.peserta}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
