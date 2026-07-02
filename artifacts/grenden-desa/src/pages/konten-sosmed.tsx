import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Instagram, Youtube, X, Link as LinkIcon } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "grenden-kkn-konten";

type Platform = "Instagram" | "TikTok" | "YouTube" | "Facebook" | "Twitter/X" | "Lainnya";

interface Konten {
  id: string;
  judul: string;
  platform: Platform;
  url: string;
  deskripsi: string;
  tanggal: string;
}

const PLATFORM_STYLE: Record<Platform, { color: string; icon: React.ReactNode }> = {
  Instagram: {
    color: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
    icon: <Instagram className="w-5 h-5" />,
  },
  TikTok: {
    color: "bg-black text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
      </svg>
    ),
  },
  YouTube: {
    color: "bg-red-600 text-white",
    icon: <Youtube className="w-5 h-5" />,
  },
  Facebook: {
    color: "bg-blue-600 text-white",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  "Twitter/X": {
    color: "bg-black text-white",
    icon: <X className="w-5 h-5" />,
  },
  Lainnya: {
    color: "bg-gray-500 text-white",
    icon: <LinkIcon className="w-5 h-5" />,
  },
};

const PLATFORM_OPTIONS: Platform[] = ["Instagram", "TikTok", "YouTube", "Facebook", "Twitter/X", "Lainnya"];

const DATA_AWAL: Konten[] = [
  {
    id: "1",
    judul: "Observasi Awal dan Penentuan Perlengkapan KKN 018",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Surya bersama tim melakukan observasi awal Desa Grenden dan menentukan perlengkapan yang akan dibawa selama kegiatan KKN berlangsung.",
    tanggal: "2026-07-01",
  },
  {
    id: "2",
    judul: "Perkenalan Tim KKN Kolaboratif 018 di Desa Grenden",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Tim KKN Kolaboratif Kelompok 018 resmi memperkenalkan diri kepada perangkat dan warga Desa Grenden. Semangat mengabdi!",
    tanggal: "2026-07-01",
  },
  {
    id: "3",
    judul: "Penyerahan Mahasiswa KKN 018 ke Desa Grenden",
    platform: "TikTok",
    url: "https://www.tiktok.com",
    deskripsi: "Momen penyerahan resmi mahasiswa KKN Kolaboratif 018 kepada pemerintah Desa Grenden oleh Dosen Pembimbing Lapangan.",
    tanggal: "2026-07-01",
  },
  {
    id: "4",
    judul: "Inovasi Produk Olahan Jagung - KKN 018",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Dokumentasi kegiatan inovasi produk olahan jagung bersama ibu-ibu PKK Desa Grenden. Mengolah komoditas lokal menjadi produk bernilai tinggi.",
    tanggal: "2025-08-20",
  },
  {
    id: "5",
    judul: "Vlog Penyaluran Bantuan Beras kepada Warga",
    platform: "TikTok",
    url: "https://www.tiktok.com",
    deskripsi: "Video dokumentasi mahasiswa KKN 018 ikut serta dalam penyaluran bantuan beras kepada warga Desa Grenden.",
    tanggal: "2025-07-28",
  },
  {
    id: "6",
    judul: "Katalog Potensi Komoditas Pangan Desa Grenden",
    platform: "YouTube",
    url: "https://www.youtube.com",
    deskripsi: "Video lengkap katalog potensi komoditas pangan di Desa Grenden yang disusun oleh KKN Kolaboratif 018 tahun 2025.",
    tanggal: "2025-08-04",
  },
  {
    id: "7",
    judul: "Produk Camilan dan Sirup Bergizi dari Pangan Lokal",
    platform: "Instagram",
    url: "https://www.instagram.com",
    deskripsi: "Produk hasil pangan lokal Desa Grenden: camilan dan sirup bergizi buah tangan KKN Kolaboratif 018 untuk warga setempat.",
    tanggal: "2025-08-13",
  },
  {
    id: "8",
    judul: "Gotong Royong Bersama Warga Desa Grenden",
    platform: "TikTok",
    url: "https://www.tiktok.com",
    deskripsi: "Tim KKN 018 bersama warga bergotong royong membersihkan lingkungan desa. Semangat kebersamaan yang luar biasa!",
    tanggal: "2025-07-20",
  },
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const FORM_KOSONG: Omit<Konten, "id"> = {
  judul: "",
  platform: "Instagram",
  url: "",
  deskripsi: "",
  tanggal: new Date().toISOString().slice(0, 10),
};

export default function KontenSosmed() {
  const [daftarKonten, setDaftarKonten] = useState<Konten[]>([]);
  const [modalBuka, setModalBuka] = useState(false);
  const [formData, setFormData] = useState<Omit<Konten, "id">>(FORM_KOSONG);
  const [editId, setEditId] = useState<string | null>(null);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<Platform | "Semua">("Semua");

  useEffect(() => {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (tersimpan) {
      setDaftarKonten(JSON.parse(tersimpan));
    } else {
      setDaftarKonten(DATA_AWAL);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA_AWAL));
    }
  }, []);

  function simpan(data: Konten[]) {
    setDaftarKonten(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function bukaForm(konten?: Konten) {
    if (konten) {
      setEditId(konten.id);
      setFormData({ judul: konten.judul, platform: konten.platform, url: konten.url, deskripsi: konten.deskripsi, tanggal: konten.tanggal });
    } else {
      setEditId(null);
      setFormData(FORM_KOSONG);
    }
    setModalBuka(true);
  }

  function tutupForm() {
    setModalBuka(false);
    setEditId(null);
    setFormData(FORM_KOSONG);
  }

  function simpanKonten() {
    if (!formData.judul.trim() || !formData.url.trim()) return;
    if (editId) {
      simpan(daftarKonten.map((k) => (k.id === editId ? { ...formData, id: editId } : k)));
    } else {
      simpan([{ ...formData, id: generateId() }, ...daftarKonten]);
    }
    tutupForm();
  }

  function hapusKonten() {
    if (!hapusId) return;
    simpan(daftarKonten.filter((k) => k.id !== hapusId));
    setHapusId(null);
  }

  const kontenTampil = filterPlatform === "Semua"
    ? daftarKonten
    : daftarKonten.filter((k) => k.platform === filterPlatform);

  const platformAda = Array.from(new Set(daftarKonten.map((k) => k.platform)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <LinkIcon className="w-4 h-4" />
              KKN Kolaboratif 018 — Konten Media Sosial
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Konten Sosial Media</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Kumpulan tautan konten dokumentasi kegiatan KKN di Instagram, TikTok, YouTube, dan platform lainnya.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(["Semua", ...platformAda] as (Platform | "Semua")[]).map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlatform(p)}
                data-testid={`filter-${p.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  filterPlatform === p
                    ? "bg-primary text-white border-primary"
                    : "bg-muted text-muted-foreground border-transparent hover:border-border"
                }`}
              >
                {p} {p !== "Semua" ? `(${daftarKonten.filter((k) => k.platform === p).length})` : `(${daftarKonten.length})`}
              </button>
            ))}
          </div>
          <Button onClick={() => bukaForm()} data-testid="button-tambah-konten" className="shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Konten
          </Button>
        </div>
      </section>

      {/* Daftar Konten */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          {kontenTampil.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <LinkIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Belum ada konten</p>
              <p className="text-sm mt-1">Klik tombol "Tambah Konten" untuk menambahkan tautan baru</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {kontenTampil.map((konten) => {
                  const style = PLATFORM_STYLE[konten.platform];
                  return (
                    <motion.div
                      key={konten.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col"
                      data-testid={`card-konten-${konten.id}`}
                    >
                      {/* Platform Header */}
                      <div className={`px-5 py-3 flex items-center gap-2 ${style.color}`}>
                        {style.icon}
                        <span className="font-semibold text-sm">{konten.platform}</span>
                        <span className="ml-auto text-xs opacity-75">
                          {new Date(konten.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      {/* Konten */}
                      <div className="p-5 flex-1 flex flex-col gap-2">
                        <h3 className="font-bold text-foreground leading-snug line-clamp-2">{konten.judul}</h3>
                        {konten.deskripsi && (
                          <p className="text-muted-foreground text-sm line-clamp-2">{konten.deskripsi}</p>
                        )}
                        <a
                          href={konten.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                          data-testid={`link-konten-${konten.id}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Buka Konten
                        </a>
                      </div>

                      {/* Aksi */}
                      <div className="px-5 pb-4 flex gap-2 border-t border-border pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => bukaForm(konten)}
                          data-testid={`button-edit-${konten.id}`}
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1.5" />
                          Ubah
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-destructive hover:bg-destructive/10 hover:border-destructive"
                          onClick={() => setHapusId(konten.id)}
                          data-testid={`button-hapus-${konten.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                          Hapus
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Modal Form */}
      <Dialog open={modalBuka} onOpenChange={(open) => !open && tutupForm()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "Ubah Konten" : "Tambah Konten Baru"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="judul">Judul Konten</Label>
              <Input
                id="judul"
                placeholder="Misal: Inovasi Produk Jagung KKN 018"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                data-testid="input-judul"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="select-platform"
              >
                {PLATFORM_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="url">URL / Tautan</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://www.instagram.com/p/..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                data-testid="input-url"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deskripsi">Deskripsi (opsional)</Label>
              <Input
                id="deskripsi"
                placeholder="Deskripsi singkat konten..."
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                data-testid="input-deskripsi"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                data-testid="input-tanggal"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={tutupForm} data-testid="button-batal">
              Batal
            </Button>
            <Button
              onClick={simpanKonten}
              disabled={!formData.judul.trim() || !formData.url.trim()}
              data-testid="button-simpan"
            >
              {editId ? "Simpan Perubahan" : "Tambah Konten"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Konfirmasi Hapus */}
      <AlertDialog open={!!hapusId} onOpenChange={(open) => !open && setHapusId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Konten?</AlertDialogTitle>
            <AlertDialogDescription>
              Konten ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-batal-hapus">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={hapusKonten}
              className="bg-destructive hover:bg-destructive/90"
              data-testid="button-konfirmasi-hapus"
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
