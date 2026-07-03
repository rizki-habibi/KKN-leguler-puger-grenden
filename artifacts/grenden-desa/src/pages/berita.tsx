import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Clock, Users, Calendar, ArrowRight } from "lucide-react";
import kknJagung from "@/assets/images/kkn-jagung.png";
import bantuanBeras from "@/assets/images/bantuan-beras.png";
import kknPresentasi from "@/assets/images/kkn-presentasi.png";

export default function Berita() {
  const beritaList = [
    {
      id: 1,
      judul: "Mahasiswa KKN Reguler ITS Mandala Jember Inovasikan Produk Olahan Jagung di Desa Grenden",
      tanggal: "20 Agustus 2025",
      dibaca: 298,
      gambar: kknJagung
    },
    {
      id: 2,
      judul: "Produk Hasil Pangan Lokal KKN Reguler ITS Mandala Jember Grenden Hadirkan Camilan dan Sirup Bergizi",
      tanggal: "13 Agustus 2025",
      dibaca: 381,
      gambar: "https://images.unsplash.com/photo-1605296830594-5cb16298dcba?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      judul: "Katalog Potensi Komoditas Pangan Desa Grenden oleh KKN Reguler ITS Mandala Jember Tahun 2026",
      tanggal: "4 Agustus 2025",
      dibaca: 565,
      gambar: "https://images.unsplash.com/photo-1595183497121-69eb3bd6c57f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      judul: "Potret Potensi Dan Kesejahteraan Warga Oleh Mahasiswa KKN Reguler ITS Mandala Jember 2026",
      tanggal: "4 Agustus 2025",
      dibaca: 719,
      gambar: kknPresentasi
    },
    {
      id: 5,
      judul: "Mahasiswa KKN Reguler ITS Mandala Jember Ikut Serta Dalam Penyaluran Bantuan Beras di Desa Grenden",
      tanggal: "28 Juli 2025",
      dibaca: 426,
      gambar: bantuanBeras
    },
    {
      id: 6,
      judul: "Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Bulan April Tahun 2023",
      tanggal: "17 April 2023",
      dibaca: 1609,
      gambar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 7,
      judul: "Penyaluran Bantuan Insentif Guru Ngaji dan PAUD Tahun Anggaran 2023",
      tanggal: "16 Maret 2023",
      dibaca: 9710,
      gambar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 8,
      judul: "Giat Bimtek Percepatan Input IDM 2023",
      tanggal: "19 Mei 2023",
      dibaca: 494,
      gambar: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 9,
      judul: "Kegiatan Bimbingan Teknis Oleh T.A DPMD Kabupaten Jember",
      tanggal: "17 Mei 2023",
      dibaca: 489,
      gambar: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 10,
      judul: "Musyawarah Desa Khusus Penetapan Penerima BLT-DD Tahun 2023",
      tanggal: "1 Februari 2023",
      dibaca: 699,
      gambar: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 11,
      judul: "Persiapan Giat Penanaman Pohon HARI DESA ASRI NUSANTARA",
      tanggal: "10 Maret 2023",
      dibaca: 1071,
      gambar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 12,
      judul: "Penyaluran BLT-DD Periode Januari Februari dan Maret Tahun 2023",
      tanggal: "2 Maret 2023",
      dibaca: 2975,
      gambar: "https://images.unsplash.com/photo-1603525166258-0056911cdd25?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 13,
      judul: "Kegiatan Jumat Curhat Bersama Polsek Puger",
      tanggal: "1 Februari 2023",
      dibaca: 439,
      gambar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 14,
      judul: "Giat Supervisi PSN dan GJB 60 Menit",
      tanggal: "13 Januari 2023",
      dibaca: 634,
      gambar: "https://images.unsplash.com/photo-1579361730055-66fb49f1ff4f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 15,
      judul: "Peningkatan Kapasitas Kelompok SPP dan Penyaluran CSR Bersama Pemdes Grenden",
      tanggal: "3 Maret 2023",
      dibaca: 568,
      gambar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Berita Desa</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Kabar terbaru, pengumuman, dan dokumentasi kegiatan pembangunan di Desa Grenden.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Berita Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <StaggerItem key={berita.id}>
                <div className="bg-card rounded-2xl overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group cursor-pointer">
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                      src={berita.gambar} 
                      alt={berita.judul} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 font-medium">
                      <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md">
                        <Calendar className="w-3.5 h-3.5" />
                        {berita.tanggal}
                      </span>
                      <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md">
                        <Users className="w-3.5 h-3.5" />
                        {berita.dibaca}x
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-4 line-clamp-3 group-hover:text-primary transition-colors leading-snug">
                      {berita.judul}
                    </h2>
                    <div className="mt-auto pt-4 border-t flex items-center text-sm font-bold text-primary">
                      Baca Berita
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
