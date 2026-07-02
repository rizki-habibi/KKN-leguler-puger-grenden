import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Camera } from "lucide-react";

import kknJagung from "@/assets/images/kkn-jagung.png";
import bantuanBeras from "@/assets/images/bantuan-beras.png";
import tanamPohon from "@/assets/images/tanam-pohon.png";
import gotongRoyong from "@/assets/images/gotong-royong.png";
import sawahHijau from "@/assets/images/sawah-hijau.png";
import kknPresentasi from "@/assets/images/kkn-presentasi.png";
import balaiDesa from "@/assets/images/balai-desa.png";
import tariTradisional from "@/assets/images/tari-tradisional.png";

export default function Galeri() {
  const galeriPhotos = [
    { id: 1, src: sawahHijau, alt: "Pemandangan sawah hijau di desa pesisir Jember Jawa Timur", size: "lg" },
    { id: 2, src: kknJagung, alt: "Mahasiswa KKN mengolah jagung menjadi produk pangan bersama ibu-ibu desa", size: "md" },
    { id: 3, src: balaiDesa, alt: "Suasana balai desa dengan warga berkumpul berdiskusi", size: "md" },
    { id: 4, src: tariTradisional, alt: "Tari tradisional atau pertunjukan budaya lokal Jawa Timur", size: "tall" },
    { id: 5, src: bantuanBeras, alt: "Penyaluran bantuan beras kepada warga desa di balai desa", size: "md" },
    { id: 6, src: gotongRoyong, alt: "Kegiatan gotong royong membersihkan saluran air desa", size: "lg" },
    { id: 7, src: kknPresentasi, alt: "Mahasiswa KKN melakukan presentasi dan penyuluhan kepada warga desa", size: "tall" },
    { id: 8, src: tanamPohon, alt: "Penanaman pohon bersama warga desa di pinggir jalan desa", size: "md" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Galeri Desa</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Potret kehidupan, keindahan alam, dan dinamika kegiatan masyarakat Desa Grenden.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Masonry/Pinterest Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <StaggerContainer className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galeriPhotos.map((photo) => (
              <StaggerItem key={photo.id} className="break-inside-avoid">
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer bg-muted">
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-medium text-sm md:text-base leading-snug drop-shadow-md">
                      {photo.alt}
                    </p>
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
