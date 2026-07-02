import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Target, CheckCircle2, ShieldCheck, Search } from "lucide-react";
import balaiDesa from "@/assets/images/balai-desa.png";

export default function VisiMisi() {
  const misiDesaPanjang = [
    "Melanjutkan pembangunan desa yang belum terlaksana.",
    "Meningkatkan kerjasama antara pemerintah desa dengan lembaga desa.",
    "Meningkatkan kesejahteraan masyarakat desa dengan meningkatkan sarana dan prasarana ekonomi warga."
  ];

  const misiDesaPendek = [
    "Mengembangkan dan menjaga serta melestarikan adat istiadat desa.",
    "Meningkatkan pelayanan dalam bidang pemerintahan.",
    "Meningkatkan sarana dan prasarana ekonomi warga.",
    "Meningkatkan sarana dan prasarana pendidikan."
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={balaiDesa} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">Visi & Misi</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
              Arah kebijakan dan tujuan pembangunan Pemerintah Desa Grenden beserta komitmen transparansi PPID.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Visi Desa */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Visi Pemerintah Desa</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground font-serif leading-tight">
              "Grenden Baru, <span className="text-accent">Grenden Bersatu</span>"
            </h3>
            <p className="mt-4 text-xl text-muted-foreground font-medium">
              (Bersih, Religius, Sejahtera, Rapi, dan Indah)
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-4xl mx-auto">
            <div className="bg-card border-2 border-primary/10 rounded-3xl p-8 md:p-12 shadow-xl text-center relative overflow-hidden">
              <Target className="absolute -top-12 -right-12 w-48 h-48 text-primary/5 opacity-50" />
              <p className="text-xl md:text-2xl leading-relaxed text-foreground font-serif relative z-10">
                "Terwujudnya masyarakat Desa Grenden yang Bersih, Religius, Sejahtera, Rapi dan Indah melalui Akselerasi Pembangunan yang berbasis Keagamaan, Budaya Hukum dan Berwawasan Lingkungan dengan berorientasi pada peningkatan Kinerja Aparatur dan Pemberdayaan Masyarakat"
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Misi Desa */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Misi Pemerintah Desa</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground font-serif">Langkah Mewujudkan Visi</h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <StaggerContainer>
              <StaggerItem className="h-full">
                <div className="bg-card border rounded-2xl p-8 shadow-sm h-full flex flex-col">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold mb-6">Pembangunan Jangka Panjang</h4>
                  <ul className="space-y-4 mt-auto">
                    {misiDesaPanjang.map((misi, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{misi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer delayChildren={0.2}>
              <StaggerItem className="h-full">
                <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-6 font-serif text-white">Pembangunan Jangka Pendek</h4>
                  <ul className="space-y-4 mt-auto">
                    {misiDesaPendek.map((misi, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                        <span className="text-primary-foreground/90 leading-relaxed">{misi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Visi PPID */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-widest text-secondary uppercase">Pejabat Pengelola Informasi dan Dokumentasi</h2>
                  <h3 className="text-3xl font-bold text-foreground font-serif">Visi PPID Desa</h3>
                </div>
              </div>
              
              <div className="prose prose-lg text-muted-foreground mt-8">
                <p className="text-2xl font-serif font-medium text-foreground mb-4">
                  "Grenden Baru, Grenden Bersatu" <br/>
                  <span className="text-primary">(Mudah, Cepat, Tepat dan Transparan)</span>
                </p>
                <div className="bg-muted/50 p-6 rounded-2xl border-l-4 border-secondary mt-8 italic text-foreground/80">
                  "Terwujudnya Media Penghubung Masyarakat untuk dapat mengenal, memahami dan berpartisipasi dalam kegiatan Pemerintah Desa Grenden sebagai langkah merangkul bersama dalam membangun desa grenden secara terbuka"
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" className="relative">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=800" 
                  alt="Transparansi Informasi Publik" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium border border-white/30">
                    <Search className="w-4 h-4 mr-2" />
                    Keterbukaan Informasi Publik
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
