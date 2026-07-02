import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Link } from "wouter";
import { ArrowRight, Users, Map, Clock, Building, MapPin } from "lucide-react";

// Asset imports
import heroBanner from "@/assets/images/hero-banner.png";
import kknJagung from "@/assets/images/kkn-jagung.png";

export default function Beranda() {
  const beritaTerbaru = [
    {
      id: 1,
      judul: "Mahasiswa KKN Kolaboratif Kelompok 018 Inovasikan Produk Olahan Jagung di Desa Grenden",
      tanggal: "20 Agustus 2025",
      dibaca: 298,
      gambar: kknJagung
    },
    {
      id: 2,
      judul: "Produk Hasil Pangan Lokal KKN Kolaboratif 018 Grenden Hadirkan Camilan dan Sirup Bergizi",
      tanggal: "13 Agustus 2025",
      dibaca: 381,
      gambar: "https://images.unsplash.com/photo-1605296830594-5cb16298dcba?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      judul: "KATALOG POTENSI KOMODITAS PANGAN DI DESA GRENDEN OLEH KKN KOLABORATIF KELOMPOK 018 TAHUN 2025",
      tanggal: "4 Agustus 2025",
      dibaca: 565,
      gambar: "https://images.unsplash.com/photo-1595183497121-69eb3bd6c57f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBanner} 
            alt="Pemandangan Desa Grenden" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-md mb-6">
                <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
                Situs Resmi Desa Grenden
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Grenden Baru, <br className="hidden md:block" />
                <span className="text-accent">Grenden Bersatu.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Membangun masyarakat yang Bersih, Religius, Sejahtera, Rapi, dan Indah melalui pelayanan yang inovatif dan transparan di Kabupaten Jember.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/profil" 
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Profil Desa
                </Link>
                <Link 
                  href="/berita" 
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-md px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20"
                >
                  Berita Terbaru
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sambutan */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Sambutan Kepala Desa</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Selamat Datang di Portal Resmi Desa Grenden</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya sehingga website resmi Desa Grenden dapat hadir sebagai media informasi publik.
                </p>
                <p>
                  Website ini dibangun dengan semangat transparansi dan keterbukaan informasi. Kami berharap portal ini dapat menjadi jembatan penghubung antara pemerintah desa dengan masyarakat, serta menjadi etalase potensi dan kekayaan budaya Desa Grenden, Kecamatan Puger, Kabupaten Jember kepada dunia luar.
                </p>
                <p>
                  Mari bersama-sama mewujudkan visi "Grenden Baru, Grenden Bersatu" demi kesejahteraan masyarakat yang berkeadilan.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t">
                <p className="font-serif font-bold text-2xl text-foreground">Suyono</p>
                <p className="text-muted-foreground">Kepala Desa Grenden (2019-2025)</p>
              </div>
            </FadeIn>
            <FadeIn direction="left" className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1544372551-0d32f5fb0b04?auto=format&fit=crop&q=80&w=800" 
                  alt="Balai Desa Grenden" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-primary/20 rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-[240px] hidden md:block">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-accent" />
                </div>
                <p className="font-bold text-lg mb-1">Berdiri Sejak</p>
                <p className="text-3xl font-serif text-primary">1917</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Statistik Desa */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StaggerItem className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-4xl md:text-5xl font-bold font-serif mb-2">15.105</h4>
              <p className="text-primary-foreground/80 font-medium">Jiwa Penduduk</p>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <Map className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-4xl md:text-5xl font-bold font-serif mb-2">1.111.690</h4>
              <p className="text-primary-foreground/80 font-medium">Meter Persegi Luas</p>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-4xl md:text-5xl font-bold font-serif mb-2">7</h4>
              <p className="text-primary-foreground/80 font-medium">Meter mdpl</p>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-4xl md:text-5xl font-bold font-serif mb-2">108</h4>
              <p className="text-primary-foreground/80 font-medium">Tahun Sejarah</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Informasi Terkini</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Kabar Desa Grenden</h3>
            </div>
            <Link 
              href="/berita" 
              className="group inline-flex items-center font-medium text-primary hover:text-primary/80"
            >
              Lihat Semua Berita 
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaTerbaru.map((berita) => (
              <StaggerItem key={berita.id}>
                <Link href="/berita" className="group block h-full">
                  <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img 
                        src={berita.gambar} 
                        alt={berita.judul} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {berita.tanggal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {berita.dibaca}x dibaca
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-card-foreground mb-4 line-clamp-3 group-hover:text-primary transition-colors">
                        {berita.judul}
                      </h4>
                      <div className="mt-auto pt-4 border-t border-border flex items-center text-sm font-medium text-primary">
                        Baca selengkapnya
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
