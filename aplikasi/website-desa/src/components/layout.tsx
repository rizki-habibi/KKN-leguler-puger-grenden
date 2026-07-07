import { Link, useLocation } from "wouter";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Profil Desa", path: "/profil" },
    { name: "Visi Misi", path: "/visi-misi" },
    { name: "Berita", path: "/berita" },
    { name: "Galeri", path: "/galeri" },
    { name: "Kegiatan", path: "/kegiatan" },
    { name: "Proker", path: "/proker" },
    { name: "PPID", path: "/ppid" },
    { name: "Anggota KKN", path: "/anggota-kkn" },
    { name: "Konten Sosmed", path: "/konten-sosmed" },
    { name: "Buku Tamu", path: "/buku-tamu" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-border shadow-sm py-3"
            : "bg-white border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl group-hover:scale-105 transition-transform">
              G
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-primary leading-tight">Desa Grenden</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Kabupaten Jember</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
                  location === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  location === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-grow pt-[88px]">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-serif font-bold text-2xl">
                  G
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl text-white">Desa Grenden</h2>
                  <p className="text-xs uppercase tracking-wider text-white/70">Kec. Puger, Kab. Jember</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed max-w-sm mt-4">
                Situs resmi Desa Grenden, media informasi publik dan dokumentasi kegiatan masyarakat serta inovasi pembangunan desa.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white mb-4">Kontak Resmi</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/80">
                  <MapPin className="w-5 h-5 shrink-0 text-accent" />
                  <span>Jalan Raya Puger No. 01 Dusun Krajan 1 RT 001 RW 015 Desa Grenden, Kec. Puger, Jember 68164</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Phone className="w-5 h-5 shrink-0 text-accent" />
                  <span>081358965655</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Mail className="w-5 h-5 shrink-0 text-accent" />
                  <span>Pemdesgrenden@gmail.com</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white mb-4">Tautan Penting</h3>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-white/80 hover:text-accent transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Pemerintah Desa Grenden, Kabupaten Jember. Dibuat oleh Mahasiswa KKN Reguler ITS Mandala Jember.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
