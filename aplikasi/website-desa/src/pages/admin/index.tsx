import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import {
  Plus, Pencil, Trash2, LogOut, Users, X,
  ChevronDown, ChevronUp, Link as LinkIcon,
  Instagram, Youtube, Image, Newspaper, Eye, EyeOff,
} from "lucide-react";
import {
  api,
  type AnggotaKkn, type AnggotaPayload, type Pengalaman,
  type Berita, type BeritaPayload,
  type Galeri, type GaleriPayload,
  type KontenSosmed, type KontenSosmedPayload,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/* ── Konstanta ─────────────────────────────────────────────── */
const DIVISI_OPTIONS = ["Pengurus Inti", "Divisi Acara", "Divisi Humas", "Divisi PDD", "Perkap & Konsumsi"];
const JABATAN_OPTIONS = ["Koordinator Desa", "Sekretaris", "Bendahara", "Divisi Acara", "Divisi Humas", "Divisi PDD", "Anggota"];
const PLATFORM_OPTIONS = ["Instagram", "TikTok", "YouTube", "Facebook", "Twitter/X", "Lainnya"];
const KATEGORI_GALERI = ["Kegiatan", "Program", "Pertanian", "Sosial", "Budaya", "Lainnya"];
const KATEGORI_BERITA = ["KKN", "Pertanian", "Sosial", "Program", "Budaya", "Umum"];

const PLATFORM_ICON: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="w-4 h-4" />,
  TikTok: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z" /></svg>,
  YouTube: <Youtube className="w-4 h-4" />,
  Facebook: <LinkIcon className="w-4 h-4" />,
  "Twitter/X": <LinkIcon className="w-4 h-4" />,
  Lainnya: <LinkIcon className="w-4 h-4" />,
};

const ANGGOTA_FORM_AWAL: AnggotaPayload = {
  nama: "", jabatan: "Anggota", divisi: "Pengurus Inti",
  nim: null, programStudi: null, fotoUrl: null, bio: null,
  bidangKeahlian: [], pengalaman: [], urutan: 0,
};

const BERITA_FORM_AWAL: BeritaPayload = {
  judul: "", slug: "", ringkasan: null, isi: null,
  gambarUrl: null, kategori: "Umum", diterbitkan: false,
};

const GALERI_FORM_AWAL: GaleriPayload = {
  judul: "", deskripsi: null, gambarUrl: "", kategori: "Kegiatan", urutan: 0,
};

const KONTEN_FORM_AWAL: KontenSosmedPayload = {
  judul: "", platform: "Instagram", url: "", deskripsi: null,
  tanggal: new Date().toISOString().slice(0, 10), urutan: 0,
};

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

/* ── Komponen Utama ─────────────────────────────────────────── */
export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  type Tab = "anggota" | "berita" | "galeri" | "konten";
  const [tab, setTab] = useState<Tab>("anggota");

  /* ── Anggota ── */
  const [anggota, setAnggota] = useState<AnggotaKkn[]>([]);
  const [anggotaLoading, setAnggotaLoading] = useState(true);
  const [anggotaError, setAnggotaError] = useState("");
  const [anggotaModal, setAnggotaModal] = useState(false);
  const [anggotaEditId, setAnggotaEditId] = useState<number | null>(null);
  const [anggotaForm, setAnggotaForm] = useState<AnggotaPayload>(ANGGOTA_FORM_AWAL);
  const [anggotaSaving, setAnggotaSaving] = useState(false);
  const [anggotaSaveErr, setAnggotaSaveErr] = useState("");
  const [anggotaHapusId, setAnggotaHapusId] = useState<number | null>(null);
  const [keahlianInput, setKeahlianInput] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  /* ── Berita ── */
  const [berita, setBerita] = useState<Berita[]>([]);
  const [beritaLoading, setBeritaLoading] = useState(true);
  const [beritaModal, setBeritaModal] = useState(false);
  const [beritaEditId, setBeritaEditId] = useState<number | null>(null);
  const [beritaForm, setBeritaForm] = useState<BeritaPayload>(BERITA_FORM_AWAL);
  const [beritaSaving, setBeritaSaving] = useState(false);
  const [beritaSaveErr, setBeritaSaveErr] = useState("");
  const [beritaHapusId, setBeritaHapusId] = useState<number | null>(null);

  /* ── Galeri ── */
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [galeriLoading, setGaleriLoading] = useState(true);
  const [galeriModal, setGaleriModal] = useState(false);
  const [galeriEditId, setGaleriEditId] = useState<number | null>(null);
  const [galeriForm, setGaleriForm] = useState<GaleriPayload>(GALERI_FORM_AWAL);
  const [galeriSaving, setGaleriSaving] = useState(false);
  const [galeriSaveErr, setGaleriSaveErr] = useState("");
  const [galeriHapusId, setGaleriHapusId] = useState<number | null>(null);

  /* ── Konten Sosmed ── */
  const [konten, setKonten] = useState<KontenSosmed[]>([]);
  const [kontenLoading, setKontenLoading] = useState(true);
  const [kontenModal, setKontenModal] = useState(false);
  const [kontenEditId, setKontenEditId] = useState<number | null>(null);
  const [kontenForm, setKontenForm] = useState<KontenSosmedPayload>(KONTEN_FORM_AWAL);
  const [kontenSaving, setKontenSaving] = useState(false);
  const [kontenSaveErr, setKontenSaveErr] = useState("");
  const [kontenHapusId, setKontenHapusId] = useState<number | null>(null);

  /* ── Data fetchers ── */
  const muatAnggota = useCallback(async () => {
    setAnggotaLoading(true);
    try { setAnggota(await api.anggota.list()); }
    catch { setAnggotaError("Gagal memuat data anggota"); }
    finally { setAnggotaLoading(false); }
  }, []);

  const muatBerita = useCallback(async () => {
    setBeritaLoading(true);
    try { setBerita(await api.berita.list(true)); }
    catch { /* silent */ }
    finally { setBeritaLoading(false); }
  }, []);

  const muatGaleri = useCallback(async () => {
    setGaleriLoading(true);
    try { setGaleri(await api.galeri.list()); }
    catch { /* silent */ }
    finally { setGaleriLoading(false); }
  }, []);

  const muatKonten = useCallback(async () => {
    setKontenLoading(true);
    try { setKonten(await api.kontenSosmed.list()); }
    catch { /* silent */ }
    finally { setKontenLoading(false); }
  }, []);

  useEffect(() => {
    if (!api.auth.isLoggedIn()) { setLocation("/admin/login"); return; }
    muatAnggota(); muatBerita(); muatGaleri(); muatKonten();
  }, [muatAnggota, muatBerita, muatGaleri, muatKonten, setLocation]);

  function keluar() { api.auth.logout(); setLocation("/admin/login"); }

  /* ── Anggota handlers ── */
  function bukaAnggotaForm(a?: AnggotaKkn) {
    if (a) {
      setAnggotaEditId(a.id);
      setAnggotaForm({ nama: a.nama, jabatan: a.jabatan, divisi: a.divisi, nim: a.nim, programStudi: a.programStudi, fotoUrl: a.fotoUrl, bio: a.bio, bidangKeahlian: a.bidangKeahlian ?? [], pengalaman: a.pengalaman ?? [], urutan: a.urutan });
    } else { setAnggotaEditId(null); setAnggotaForm(ANGGOTA_FORM_AWAL); }
    setKeahlianInput(""); setAnggotaSaveErr(""); setAnggotaModal(true);
  }

  async function simpanAnggota() {
    if (!anggotaForm.nama.trim()) return;
    setAnggotaSaving(true); setAnggotaSaveErr("");
    try {
      if (anggotaEditId !== null) await api.anggota.update(anggotaEditId, anggotaForm);
      else await api.anggota.create(anggotaForm);
      await muatAnggota(); setAnggotaModal(false);
    } catch (e) { setAnggotaSaveErr(e instanceof Error ? e.message : "Gagal menyimpan"); }
    finally { setAnggotaSaving(false); }
  }

  async function hapusAnggota() {
    if (!anggotaHapusId) return;
    try { await api.anggota.delete(anggotaHapusId); await muatAnggota(); }
    catch { setAnggotaError("Gagal menghapus anggota"); }
    finally { setAnggotaHapusId(null); }
  }

  function tambahKeahlian() {
    const k = keahlianInput.trim();
    if (!k || anggotaForm.bidangKeahlian.includes(k)) return;
    setAnggotaForm((f) => ({ ...f, bidangKeahlian: [...f.bidangKeahlian, k] }));
    setKeahlianInput("");
  }

  function updatePengalaman(i: number, field: keyof Pengalaman, val: string) {
    setAnggotaForm((f) => ({ ...f, pengalaman: f.pengalaman.map((p, idx) => idx === i ? { ...p, [field]: val } : p) }));
  }

  /* ── Berita handlers ── */
  function bukaBeritaForm(b?: Berita) {
    if (b) {
      setBeritaEditId(b.id);
      setBeritaForm({ judul: b.judul, slug: b.slug, ringkasan: b.ringkasan, isi: b.isi, gambarUrl: b.gambarUrl, kategori: b.kategori, diterbitkan: b.diterbitkan });
    } else { setBeritaEditId(null); setBeritaForm(BERITA_FORM_AWAL); }
    setBeritaSaveErr(""); setBeritaModal(true);
  }

  async function simpanBerita() {
    if (!beritaForm.judul.trim()) return;
    setBeritaSaving(true); setBeritaSaveErr("");
    try {
      const data = { ...beritaForm, slug: beritaForm.slug || slugify(beritaForm.judul) };
      if (beritaEditId !== null) await api.berita.update(beritaEditId, data);
      else await api.berita.create(data);
      await muatBerita(); setBeritaModal(false);
    } catch (e) { setBeritaSaveErr(e instanceof Error ? e.message : "Gagal menyimpan"); }
    finally { setBeritaSaving(false); }
  }

  async function hapusBerita() {
    if (!beritaHapusId) return;
    try { await api.berita.delete(beritaHapusId); await muatBerita(); }
    catch { /* silent */ }
    finally { setBeritaHapusId(null); }
  }

  /* ── Galeri handlers ── */
  function bukaGaleriForm(g?: Galeri) {
    if (g) {
      setGaleriEditId(g.id);
      setGaleriForm({ judul: g.judul, deskripsi: g.deskripsi, gambarUrl: g.gambarUrl, kategori: g.kategori, urutan: g.urutan ?? 0 });
    } else { setGaleriEditId(null); setGaleriForm(GALERI_FORM_AWAL); }
    setGaleriSaveErr(""); setGaleriModal(true);
  }

  async function simpanGaleri() {
    if (!galeriForm.judul.trim() || !galeriForm.gambarUrl.trim()) return;
    setGaleriSaving(true); setGaleriSaveErr("");
    try {
      if (galeriEditId !== null) await api.galeri.update(galeriEditId, galeriForm);
      else await api.galeri.create(galeriForm);
      await muatGaleri(); setGaleriModal(false);
    } catch (e) { setGaleriSaveErr(e instanceof Error ? e.message : "Gagal menyimpan"); }
    finally { setGaleriSaving(false); }
  }

  async function hapusGaleri() {
    if (!galeriHapusId) return;
    try { await api.galeri.delete(galeriHapusId); await muatGaleri(); }
    catch { /* silent */ }
    finally { setGaleriHapusId(null); }
  }

  /* ── Konten Sosmed handlers ── */
  function bukaKontenForm(k?: KontenSosmed) {
    if (k) {
      setKontenEditId(k.id);
      setKontenForm({ judul: k.judul, platform: k.platform, url: k.url, deskripsi: k.deskripsi, tanggal: k.tanggal, urutan: k.urutan ?? 0 });
    } else { setKontenEditId(null); setKontenForm(KONTEN_FORM_AWAL); }
    setKontenSaveErr(""); setKontenModal(true);
  }

  async function simpanKonten() {
    if (!kontenForm.judul.trim() || !kontenForm.url.trim()) return;
    setKontenSaving(true); setKontenSaveErr("");
    try {
      if (kontenEditId !== null) await api.kontenSosmed.update(kontenEditId, kontenForm);
      else await api.kontenSosmed.create(kontenForm);
      await muatKonten(); setKontenModal(false);
    } catch (e) { setKontenSaveErr(e instanceof Error ? e.message : "Gagal menyimpan"); }
    finally { setKontenSaving(false); }
  }

  async function hapusKonten() {
    if (!kontenHapusId) return;
    try { await api.kontenSosmed.delete(kontenHapusId); await muatKonten(); }
    catch { /* silent */ }
    finally { setKontenHapusId(null); }
  }

  const dikelompokkan = DIVISI_OPTIONS.map((div) => ({
    divisi: div,
    anggota: anggota.filter((a) => a.divisi === div),
  })).filter((g) => g.anggota.length > 0);

  const formatTgl = (d: string) => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  /* ── Render: Layout ── */
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold font-serif text-lg">G</div>
            <div>
              <h1 className="font-bold text-base leading-tight">Panel Admin</h1>
              <p className="text-white/70 text-xs">KKN Reguler — Desa Grenden</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="text-white/80 hover:text-white hover:bg-white/10">
              Lihat Website
            </Button>
            <Button variant="ghost" size="sm" onClick={keluar} className="text-white/80 hover:text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-1.5" />Keluar
            </Button>
          </div>
        </div>
        {/* Tabs */}
        <div className="container mx-auto px-4 md:px-6 flex gap-1 pb-3 overflow-x-auto">
          {([
            { id: "anggota", label: "Anggota KKN", icon: <Users className="w-3.5 h-3.5" /> },
            { id: "berita", label: "Berita", icon: <Newspaper className="w-3.5 h-3.5" /> },
            { id: "galeri", label: "Galeri", icon: <Image className="w-3.5 h-3.5" /> },
            { id: "konten", label: "Konten Sosmed", icon: <LinkIcon className="w-3.5 h-3.5" /> },
          ] as { id: Tab; label: string; icon: React.ReactNode }[]).map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? "bg-white text-primary" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">

        {/* ── TAB ANGGOTA ── */}
        {tab === "anggota" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-serif flex items-center gap-2"><Users className="w-6 h-6 text-primary" />Manajemen Anggota KKN</h2>
                <p className="text-muted-foreground mt-1">{anggota.length} anggota terdaftar</p>
              </div>
              <Button onClick={() => bukaAnggotaForm()}><Plus className="w-4 h-4 mr-2" />Tambah Anggota</Button>
            </div>
            {anggotaError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{anggotaError}</div>}
            {anggotaLoading ? (
              <div className="text-center py-16 text-muted-foreground">Memuat data...</div>
            ) : anggota.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground"><Users className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Belum ada anggota.</p></div>
            ) : (
              <div className="space-y-8">
                {dikelompokkan.map((grup) => (
                  <div key={grup.divisi}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 border-b pb-2">{grup.divisi}</h3>
                    <div className="space-y-3">
                      {grup.anggota.map((a) => (
                        <div key={a.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                          <div className="flex items-center gap-4 p-4">
                            {a.fotoUrl ? (
                              <img src={a.fotoUrl} alt={a.nama} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">{a.nama.charAt(0)}</div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold">{a.nama}</span>
                                <Badge variant="outline" className="text-xs">{a.jabatan}</Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {(a.bidangKeahlian ?? []).slice(0, 3).map((k) => (
                                  <span key={k} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{k}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button onClick={() => setExpandedId(expandedId === a.id ? null : a.id)} className="p-1.5 text-muted-foreground hover:text-foreground">
                                {expandedId === a.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                              <Button variant="outline" size="sm" onClick={() => bukaAnggotaForm(a)}><Pencil className="w-3.5 h-3.5 mr-1" />Ubah</Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setAnggotaHapusId(a.id)}><Trash2 className="w-3.5 h-3.5 mr-1" />Hapus</Button>
                            </div>
                          </div>
                          {expandedId === a.id && (
                            <div className="border-t px-4 py-3 bg-muted/30 text-sm space-y-1">
                              {a.bio && <p className="text-muted-foreground">{a.bio}</p>}
                              {a.nim && <p className="text-xs text-muted-foreground">NIM: {a.nim} · {a.programStudi}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB BERITA ── */}
        {tab === "berita" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-serif flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" />Manajemen Berita</h2>
                <p className="text-muted-foreground mt-1">{berita.length} berita · {berita.filter(b => b.diterbitkan).length} diterbitkan</p>
              </div>
              <Button onClick={() => bukaBeritaForm()}><Plus className="w-4 h-4 mr-2" />Tambah Berita</Button>
            </div>
            {beritaLoading ? (
              <div className="text-center py-16 text-muted-foreground">Memuat data...</div>
            ) : berita.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground"><Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Belum ada berita.</p></div>
            ) : (
              <div className="space-y-3">
                {berita.map((b) => (
                  <div key={b.id} className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-start gap-4">
                    {b.gambarUrl && (
                      <img src={b.gambarUrl} alt={b.judul} className="w-16 h-16 rounded-lg object-cover shrink-0 bg-muted" onError={(e) => (e.currentTarget.style.display = "none")} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-sm line-clamp-1">{b.judul}</span>
                        <Badge variant={b.diterbitkan ? "default" : "outline"} className="text-xs shrink-0">
                          {b.diterbitkan ? "Terbit" : "Draft"}
                        </Badge>
                        {b.kategori && <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{b.kategori}</span>}
                      </div>
                      {b.ringkasan && <p className="text-muted-foreground text-xs line-clamp-1">{b.ringkasan}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{formatTgl(b.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => bukaBeritaForm(b)}><Pencil className="w-3.5 h-3.5 mr-1" />Ubah</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setBeritaHapusId(b.id)}><Trash2 className="w-3.5 h-3.5 mr-1" />Hapus</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB GALERI ── */}
        {tab === "galeri" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-serif flex items-center gap-2"><Image className="w-6 h-6 text-primary" />Manajemen Galeri</h2>
                <p className="text-muted-foreground mt-1">{galeri.length} foto</p>
              </div>
              <Button onClick={() => bukaGaleriForm()}><Plus className="w-4 h-4 mr-2" />Tambah Foto</Button>
            </div>
            {galeriLoading ? (
              <div className="text-center py-16 text-muted-foreground">Memuat data...</div>
            ) : galeri.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground"><Image className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Belum ada foto.</p></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galeri.map((g) => (
                  <div key={g.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden group">
                    <div className="aspect-video relative bg-muted overflow-hidden">
                      <img src={g.gambarUrl} alt={g.judul} className="w-full h-full object-cover transition-transform group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      {g.kategori && <span className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-0.5 rounded-full">{g.kategori}</span>}
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm line-clamp-1">{g.judul}</p>
                      {g.deskripsi && <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{g.deskripsi}</p>}
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-7" onClick={() => bukaGaleriForm(g)}><Pencil className="w-3 h-3 mr-1" />Ubah</Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-7 text-destructive hover:bg-destructive/10" onClick={() => setGaleriHapusId(g.id)}><Trash2 className="w-3 h-3 mr-1" />Hapus</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB KONTEN SOSMED ── */}
        {tab === "konten" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold font-serif flex items-center gap-2"><LinkIcon className="w-6 h-6 text-primary" />Manajemen Konten Sosmed</h2>
                <p className="text-muted-foreground mt-1">{konten.length} konten</p>
              </div>
              <Button onClick={() => bukaKontenForm()}><Plus className="w-4 h-4 mr-2" />Tambah Konten</Button>
            </div>
            {kontenLoading ? (
              <div className="text-center py-16 text-muted-foreground">Memuat data...</div>
            ) : konten.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground"><LinkIcon className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Belum ada konten.</p></div>
            ) : (
              <div className="space-y-3">
                {konten.map((k) => (
                  <div key={k.id} className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {PLATFORM_ICON[k.platform] ?? <LinkIcon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm">{k.judul}</span>
                        <Badge variant="outline" className="text-xs">{k.platform}</Badge>
                        {k.tanggal && <span className="text-xs text-muted-foreground">{formatTgl(k.tanggal)}</span>}
                      </div>
                      {k.deskripsi && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{k.deskripsi}</p>}
                      <a href={k.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block mt-0.5">{k.url}</a>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => bukaKontenForm(k)}><Pencil className="w-3.5 h-3.5 mr-1" />Ubah</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setKontenHapusId(k.id)}><Trash2 className="w-3.5 h-3.5 mr-1" />Hapus</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Modal Anggota ── */}
      <Dialog open={anggotaModal} onOpenChange={(o) => !o && setAnggotaModal(false)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{anggotaEditId ? "Ubah Anggota" : "Tambah Anggota"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-1">
            <div><Label>URL Foto</Label><Input placeholder="https://..." value={anggotaForm.fotoUrl ?? ""} onChange={(e) => setAnggotaForm(f => ({ ...f, fotoUrl: e.target.value || null }))} /></div>
            <div><Label>Nama Lengkap *</Label><Input value={anggotaForm.nama} onChange={(e) => setAnggotaForm(f => ({ ...f, nama: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>NIM</Label><Input value={anggotaForm.nim ?? ""} onChange={(e) => setAnggotaForm(f => ({ ...f, nim: e.target.value || null }))} /></div>
              <div><Label>Program Studi</Label><Input value={anggotaForm.programStudi ?? ""} onChange={(e) => setAnggotaForm(f => ({ ...f, programStudi: e.target.value || null }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Jabatan</Label>
                <select value={anggotaForm.jabatan} onChange={(e) => setAnggotaForm(f => ({ ...f, jabatan: e.target.value }))} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                  {JABATAN_OPTIONS.map(j => <option key={j}>{j}</option>)}
                </select>
              </div>
              <div><Label>Divisi</Label>
                <select value={anggotaForm.divisi} onChange={(e) => setAnggotaForm(f => ({ ...f, divisi: e.target.value }))} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                  {DIVISI_OPTIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div><Label>Bio</Label><textarea value={anggotaForm.bio ?? ""} onChange={(e) => setAnggotaForm(f => ({ ...f, bio: e.target.value || null }))} rows={3} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background resize-none" /></div>
            <div>
              <Label>Bidang Keahlian</Label>
              <div className="flex gap-2 mt-1"><Input placeholder="Tambah keahlian..." value={keahlianInput} onChange={(e) => setKeahlianInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), tambahKeahlian())} /><Button type="button" variant="outline" onClick={tambahKeahlian}>+</Button></div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {anggotaForm.bidangKeahlian.map(k => (
                  <span key={k} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full">{k}<button onClick={() => setAnggotaForm(f => ({ ...f, bidangKeahlian: f.bidangKeahlian.filter(x => x !== k) }))}><X className="w-3 h-3" /></button></span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between"><Label>Pengalaman</Label><Button type="button" variant="outline" size="sm" onClick={() => setAnggotaForm(f => ({ ...f, pengalaman: [...f.pengalaman, { institusi: "", posisi: "", durasi: "", deskripsi: "" }] }))}><Plus className="w-3.5 h-3.5 mr-1" />Tambah</Button></div>
              {anggotaForm.pengalaman.map((p, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2 mt-2 relative">
                  <button onClick={() => setAnggotaForm(f => ({ ...f, pengalaman: f.pengalaman.filter((_, idx) => idx !== i) }))} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                  <Input placeholder="Institusi" value={p.institusi} onChange={(e) => updatePengalaman(i, "institusi", e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Posisi" value={p.posisi} onChange={(e) => updatePengalaman(i, "posisi", e.target.value)} />
                    <Input placeholder="Durasi" value={p.durasi} onChange={(e) => updatePengalaman(i, "durasi", e.target.value)} />
                  </div>
                  <Input placeholder="Deskripsi" value={p.deskripsi} onChange={(e) => updatePengalaman(i, "deskripsi", e.target.value)} />
                </div>
              ))}
            </div>
            <div><Label>Urutan</Label><Input type="number" min={0} value={anggotaForm.urutan} onChange={(e) => setAnggotaForm(f => ({ ...f, urutan: parseInt(e.target.value) || 0 }))} /></div>
            {anggotaSaveErr && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{anggotaSaveErr}</p>}
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setAnggotaModal(false)}>Batal</Button><Button onClick={simpanAnggota} disabled={anggotaSaving || !anggotaForm.nama.trim()}>{anggotaSaving ? "Menyimpan..." : anggotaEditId ? "Simpan" : "Tambah"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Modal Berita ── */}
      <Dialog open={beritaModal} onOpenChange={(o) => !o && setBeritaModal(false)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{beritaEditId ? "Ubah Berita" : "Tambah Berita"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-1">
            <div><Label>Judul *</Label><Input value={beritaForm.judul} onChange={(e) => setBeritaForm(f => ({ ...f, judul: e.target.value, slug: f.slug || slugify(e.target.value) }))} /></div>
            <div><Label>Slug (URL)</Label><Input value={beritaForm.slug ?? ""} onChange={(e) => setBeritaForm(f => ({ ...f, slug: e.target.value }))} placeholder="otomatis-dari-judul" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Kategori</Label>
                <select value={beritaForm.kategori ?? "Umum"} onChange={(e) => setBeritaForm(f => ({ ...f, kategori: e.target.value }))} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                  {KATEGORI_BERITA.map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2">
                  <input type="checkbox" checked={beritaForm.diterbitkan ?? false} onChange={(e) => setBeritaForm(f => ({ ...f, diterbitkan: e.target.checked }))} className="w-4 h-4" />
                  <span className="text-sm font-medium flex items-center gap-1">{beritaForm.diterbitkan ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}Terbitkan</span>
                </label>
              </div>
            </div>
            <div><Label>URL Gambar</Label><Input placeholder="https://..." value={beritaForm.gambarUrl ?? ""} onChange={(e) => setBeritaForm(f => ({ ...f, gambarUrl: e.target.value || null }))} /></div>
            <div><Label>Ringkasan</Label><textarea value={beritaForm.ringkasan ?? ""} onChange={(e) => setBeritaForm(f => ({ ...f, ringkasan: e.target.value || null }))} rows={2} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background resize-none" /></div>
            <div><Label>Isi Berita</Label><textarea value={beritaForm.isi ?? ""} onChange={(e) => setBeritaForm(f => ({ ...f, isi: e.target.value || null }))} rows={6} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background resize-none" placeholder="Tulis isi berita di sini..." /></div>
            {beritaSaveErr && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{beritaSaveErr}</p>}
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setBeritaModal(false)}>Batal</Button><Button onClick={simpanBerita} disabled={beritaSaving || !beritaForm.judul.trim()}>{beritaSaving ? "Menyimpan..." : beritaEditId ? "Simpan" : "Tambah"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Modal Galeri ── */}
      <Dialog open={galeriModal} onOpenChange={(o) => !o && setGaleriModal(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{galeriEditId ? "Ubah Foto" : "Tambah Foto"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-1">
            <div><Label>Judul *</Label><Input value={galeriForm.judul} onChange={(e) => setGaleriForm(f => ({ ...f, judul: e.target.value }))} /></div>
            <div><Label>URL Gambar *</Label><Input placeholder="https:// atau /gambar/..." value={galeriForm.gambarUrl} onChange={(e) => setGaleriForm(f => ({ ...f, gambarUrl: e.target.value }))} /></div>
            {galeriForm.gambarUrl && <img src={galeriForm.gambarUrl} alt="preview" className="w-full h-32 object-cover rounded-lg border" onError={(e) => (e.currentTarget.style.display = "none")} />}
            <div><Label>Deskripsi</Label><Input value={galeriForm.deskripsi ?? ""} onChange={(e) => setGaleriForm(f => ({ ...f, deskripsi: e.target.value || null }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Kategori</Label>
                <select value={galeriForm.kategori ?? "Kegiatan"} onChange={(e) => setGaleriForm(f => ({ ...f, kategori: e.target.value }))} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                  {KATEGORI_GALERI.map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div><Label>Urutan</Label><Input type="number" min={0} value={galeriForm.urutan ?? 0} onChange={(e) => setGaleriForm(f => ({ ...f, urutan: parseInt(e.target.value) || 0 }))} /></div>
            </div>
            {galeriSaveErr && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{galeriSaveErr}</p>}
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setGaleriModal(false)}>Batal</Button><Button onClick={simpanGaleri} disabled={galeriSaving || !galeriForm.judul.trim() || !galeriForm.gambarUrl.trim()}>{galeriSaving ? "Menyimpan..." : galeriEditId ? "Simpan" : "Tambah"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Modal Konten ── */}
      <Dialog open={kontenModal} onOpenChange={(o) => !o && setKontenModal(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{kontenEditId ? "Ubah Konten" : "Tambah Konten"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-1">
            <div><Label>Judul *</Label><Input value={kontenForm.judul} onChange={(e) => setKontenForm(f => ({ ...f, judul: e.target.value }))} /></div>
            <div><Label>Platform</Label>
              <select value={kontenForm.platform} onChange={(e) => setKontenForm(f => ({ ...f, platform: e.target.value }))} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                {PLATFORM_OPTIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div><Label>URL *</Label><Input type="url" placeholder="https://..." value={kontenForm.url} onChange={(e) => setKontenForm(f => ({ ...f, url: e.target.value }))} /></div>
            <div><Label>Deskripsi</Label><Input value={kontenForm.deskripsi ?? ""} onChange={(e) => setKontenForm(f => ({ ...f, deskripsi: e.target.value || null }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Tanggal</Label><Input type="date" value={kontenForm.tanggal ?? ""} onChange={(e) => setKontenForm(f => ({ ...f, tanggal: e.target.value }))} /></div>
              <div><Label>Urutan</Label><Input type="number" min={0} value={kontenForm.urutan ?? 0} onChange={(e) => setKontenForm(f => ({ ...f, urutan: parseInt(e.target.value) || 0 }))} /></div>
            </div>
            {kontenSaveErr && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{kontenSaveErr}</p>}
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setKontenModal(false)}>Batal</Button><Button onClick={simpanKonten} disabled={kontenSaving || !kontenForm.judul.trim() || !kontenForm.url.trim()}>{kontenSaving ? "Menyimpan..." : kontenEditId ? "Simpan" : "Tambah"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Konfirmasi Hapus ── */}
      {([
        { open: !!anggotaHapusId, onClose: () => setAnggotaHapusId(null), onConfirm: hapusAnggota, label: "anggota ini" },
        { open: !!beritaHapusId, onClose: () => setBeritaHapusId(null), onConfirm: hapusBerita, label: "berita ini" },
        { open: !!galeriHapusId, onClose: () => setGaleriHapusId(null), onConfirm: hapusGaleri, label: "foto ini" },
        { open: !!kontenHapusId, onClose: () => setKontenHapusId(null), onConfirm: hapusKonten, label: "konten ini" },
      ]).map((d, i) => (
        <AlertDialog key={i} open={d.open} onOpenChange={(o) => !o && d.onClose()}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus {d.label}?</AlertDialogTitle>
              <AlertDialogDescription>Data akan dihapus permanen dan tidak bisa dikembalikan.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={d.onConfirm} className="bg-destructive hover:bg-destructive/90">Ya, Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  );
}
