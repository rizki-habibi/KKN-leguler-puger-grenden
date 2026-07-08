import { Link, useLocation } from "wouter";
import {
  Menu, X, MapPin, Phone, Mail, ChevronDown,
  Newspaper, Camera, Calendar, BookOpen, Share2, ClipboardList,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ── Tipe navigasi ────────────────────────────────────────── */
interface NavItem {
  name: string;
  path: string;
}

interface NavGroup {
  name: string;
  icon?: React.ReactNode;
  children: (NavItem & { icon: React.ReactNode })[];
}

type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

/* ── Konfigurasi nav ──────────────────────────────────────── */
const NAV: NavEntry[] = [
  { name: "Beranda", path: "/" },
  { name: "Profil Desa", path: "/profil" },
  { name: "Visi Misi", path: "/visi-misi" },
  { name: "Anggota KKN", path: "/anggota-kkn" },
  {
    name: "Konten",
    children: [
      { name: "Berita", path: "/berita", icon: <Newspaper className="w-4 h-4" /> },
      { name: "Kegiatan", path: "/kegiatan", icon: <Calendar className="w-4 h-4" /> },
      { name: "Galeri", path: "/galeri", icon: <Camera className="w-4 h-4" /> },
      { name: "Proker", path: "/proker", icon: <ClipboardList className="w-4 h-4" /> },
      { name: "Konten Sosmed", path: "/konten-sosmed", icon: <Share2 className="w-4 h-4" /> },
      { name: "Buku Tamu", path: "/buku-tamu", icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  { name: "PPID", path: "/ppid" },
];

/* ── Footer links flat (untuk footer) ──────────────────────── */
const FOOTER_LINKS: NavItem[] = [
  { name: "Beranda", path: "/" },
  { name: "Profil Desa", path: "/profil" },
  { name: "Visi Misi", path: "/visi-misi" },
  { name: "Anggota KKN", path: "/anggota-kkn" },
  { name: "Berita", path: "/berita" },
  { name: "Kegiatan", path: "/kegiatan" },
  { name: "Galeri", path: "/galeri" },
  { name: "Proker", path: "/proker" },
  { name: "Konten Sosmed", path: "/konten-sosmed" },
  { name: "Buku Tamu", path: "/buku-tamu" },
  { name: "PPID", path: "/ppid" },
];

/* ── Komponen dropdown desktop ────────────────────────────── */
function DesktopDropdown({ group, location }: { group: NavGroup; location: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = group.children.some((c) => c.path === location);

  // Tutup saat klik di luar
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
          isActive || open
            ? "bg-primary/10 text-primary"
            : "text-foreground/80 hover:bg-muted"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {group.name}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Panel dropdown */}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl border border-border shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {group.children.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors mx-1 rounded-xl",
                location === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-muted hover:text-primary"
              )}
            >
              <span className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                location === item.path ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Komponen accordion mobile ────────────────────────────── */
function MobileAccordion({
  group,
  location,
  onNavigate,
}: {
  group: NavGroup;
  location: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = group.children.some((c) => c.path === location);

  return (
    <div className="rounded-xl overflow-hidden border border-border/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors",
          isActive || open ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"
        )}
      >
        <span>{group.name}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="bg-muted/40 px-2 pb-2 pt-1 flex flex-col gap-1">
          {group.children.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-primary"
              )}
            >
              <span className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center shrink-0",
                location === item.path ? "bg-primary/20 text-primary" : "bg-background text-muted-foreground"
              )}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Layout utama ─────────────────────────────────────────── */
export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/logo-kkn.jpeg"
              alt="Logo KKN Desa Grenden"
              className="w-10 h-10 rounded-full object-cover group-hover:scale-105 transition-transform shadow-sm border border-border"
            />
            <div>
              <h1 className="font-serif font-bold text-xl text-primary leading-tight">Desa Grenden</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Kabupaten Jember
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((entry) =>
              isGroup(entry) ? (
                <DesktopDropdown key={entry.name} group={entry} location={location} />
              ) : (
                <Link
                  key={entry.path}
                  href={entry.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
                    location === entry.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  {entry.name}
                </Link>
              )
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
            {NAV.map((entry) =>
              isGroup(entry) ? (
                <MobileAccordion
                  key={entry.name}
                  group={entry}
                  location={location}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              ) : (
                <Link
                  key={entry.path}
                  href={entry.path}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    location === entry.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted hover:text-primary"
                  )}
                >
                  {entry.name}
                </Link>
              )
            )}
          </div>
        )}
      </header>

      <main className="flex-grow pt-[88px]">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo-kkn.jpeg"
                  alt="Logo KKN Desa Grenden"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <h2 className="font-serif font-bold text-2xl text-white">Desa Grenden</h2>
                  <p className="text-xs uppercase tracking-wider text-white/70">Kec. Puger, Kab. Jember</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed max-w-sm mt-4">
                Situs resmi Desa Grenden, media informasi publik dan dokumentasi kegiatan masyarakat
                serta inovasi pembangunan desa.
              </p>
            </div>

            {/* Kontak */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white mb-4">Kontak Resmi</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/80">
                  <MapPin className="w-5 h-5 shrink-0 text-accent" />
                  <span>
                    Jalan Raya Puger No. 01 Dusun Krajan 1 RT 001 RW 015 Desa Grenden, Kec. Puger,
                    Jember 68164
                  </span>
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

            {/* Tautan */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white mb-4">Tautan Penting</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-white/80 hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Pemerintah Desa Grenden, Kabupaten Jember. Dibuat
              oleh Mahasiswa KKN Reguler ITS Mandala Jember.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
