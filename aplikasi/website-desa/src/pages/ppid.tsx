import { FadeIn } from "@/components/fade-in";
import { ShieldCheck, MapPin, Phone, Building2, ExternalLink } from "lucide-react";

export default function Ppid() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-yellow-300">PPID Desa Grenden</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Pejabat Pengelola Informasi dan Dokumentasi. Wujud nyata keterbukaan dan transparansi publik.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-12">

            <FadeIn>
              <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-8 text-foreground border-b pb-4">
                  PPID Utama Desa
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Dinas Pemberdayaan Masyarakat Dan Desa Kabupaten Jember</h3>
                      <p className="text-muted-foreground mt-1">Lembaga Pembina PPID Tingkat Desa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Alamat Kantor</h3>
                      <p className="text-muted-foreground mt-1">Jl. Jawa No.26, Sumbersari, Jember</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Telepon</h3>
                      <p className="text-muted-foreground mt-1">(0331) 322870</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t">
                  <h3 className="text-lg font-bold mb-4">Portal Resmi PPID Kabupaten</h3>
                  <a
                    href="https://ppid-desa.jemberkab.go.id/desa/grenden"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-secondary px-8 py-4 text-base font-bold text-secondary-foreground shadow-lg transition-all hover:bg-secondary/90 hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Akses Portal PPID Jember
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">
                    Akses data statistik terpadu, anggaran, dan dokumen publik lainnya melalui portal PPID Jemberkab.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-muted/50 rounded-3xl p-8 md:p-12 border border-border">
                <h2 className="text-2xl font-bold font-serif mb-6 text-foreground">
                  PPID Utama Kabupaten
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-background rounded-full border shadow-sm flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Dinas Komunikasi dan Informatika Kabupaten Jember</h3>
                    <p className="text-muted-foreground mt-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Jl. Nusantara No.02, Kaliwates, Jember
                    </p>
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
