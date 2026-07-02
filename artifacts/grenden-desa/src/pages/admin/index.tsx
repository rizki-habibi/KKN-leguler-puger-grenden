import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2, LogOut, Users, X, ChevronDown, ChevronUp } from "lucide-react";
import { api, type AnggotaKkn, type AnggotaPayload, type Pengalaman } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const DIVISI_OPTIONS = [
  "Pengurus Inti",
  "Divisi Acara",
  "Divisi Humas",
  "Divisi PDD",
  "Perkap & Konsumsi",
];

const JABATAN_OPTIONS = [
  "Koordinator Desa",
  "Sekretaris",
  "Bendahara",
  "Divisi Acara",
  "Divisi Humas",
  "Divisi PDD",
  "Anggota",
];

const FORM_AWAL: AnggotaPayload = {
  nama: "",
  jabatan: "Anggota",
  divisi: "Pengurus Inti",
  fotoUrl: null,
  bio: null,
  bidangKeahlian: [],
  pengalaman: [],
  urutan: 0,
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [anggota, setAnggota] = useState<AnggotaKkn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalBuka, setModalBuka] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<AnggotaPayload>(FORM_AWAL);
  const [simpanLoading, setSimpanLoading] = useState(false);
  const [simpanError, setSimpanError] = useState("");

  const [hapusId, setHapusId] = useState<number | null>(null);

  const [keahlianInput, setKeahlianInput] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const muat = useCallback(async () => {
    try {
      const data = await api.anggota.list();
      setAnggota(data);
    } catch {
      setError("Gagal memuat data anggota");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!api.auth.isLoggedIn()) {
      setLocation("/admin/login");
      return;
    }
    muat();
  }, [muat, setLocation]);

  function keluar() {
    api.auth.logout();
    setLocation("/admin/login");
  }

  function bukaForm(a?: AnggotaKkn) {
    if (a) {
      setEditId(a.id);
      setFormData({
        nama: a.nama,
        jabatan: a.jabatan,
        divisi: a.divisi,
        fotoUrl: a.fotoUrl,
        bio: a.bio,
        bidangKeahlian: a.bidangKeahlian ?? [],
        pengalaman: a.pengalaman ?? [],
        urutan: a.urutan,
      });
    } else {
      setEditId(null);
      setFormData(FORM_AWAL);
    }
    setKeahlianInput("");
    setSimpanError("");
    setModalBuka(true);
  }

  function tutupForm() {
    setModalBuka(false);
    setEditId(null);
    setSimpanError("");
  }

  async function simpan() {
    if (!formData.nama.trim()) return;
    setSimpanLoading(true);
    setSimpanError("");
    try {
      if (editId !== null) {
        await api.anggota.update(editId, formData);
      } else {
        await api.anggota.create(formData);
      }
      await muat();
      tutupForm();
    } catch (err) {
      setSimpanError(err instanceof Error ? err.message : "Gagal menyimpan data");
    } finally {
      setSimpanLoading(false);
    }
  }

  async function hapus() {
    if (!hapusId) return;
    try {
      await api.anggota.delete(hapusId);
      await muat();
    } catch {
      setError("Gagal menghapus anggota");
    } finally {
      setHapusId(null);
    }
  }

  function tambahKeahlian() {
    const k = keahlianInput.trim();
    if (!k || formData.bidangKeahlian.includes(k)) return;
    setFormData((f) => ({ ...f, bidangKeahlian: [...f.bidangKeahlian, k] }));
    setKeahlianInput("");
  }

  function hapusKeahlian(k: string) {
    setFormData((f) => ({ ...f, bidangKeahlian: f.bidangKeahlian.filter((x) => x !== k) }));
  }

  function tambahPengalaman() {
    setFormData((f) => ({
      ...f,
      pengalaman: [...f.pengalaman, { institusi: "", posisi: "", durasi: "", deskripsi: "" }],
    }));
  }

  function updatePengalaman(i: number, field: keyof Pengalaman, val: string) {
    setFormData((f) => ({
      ...f,
      pengalaman: f.pengalaman.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)),
    }));
  }

  function hapusPengalaman(i: number) {
    setFormData((f) => ({ ...f, pengalaman: f.pengalaman.filter((_, idx) => idx !== i) }));
  }

  const dikelompokkan = DIVISI_OPTIONS.map((div) => ({
    divisi: div,
    anggota: anggota.filter((a) => a.divisi === div),
  })).filter((g) => g.anggota.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold font-serif text-lg">G</div>
            <div>
              <h1 className="font-bold text-base leading-tight">Panel Admin</h1>
              <p className="text-white/70 text-xs">KKN Kolaboratif 018 — Desa Grenden</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Lihat Website
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={keluar}
              className="text-white/80 hover:text-white hover:bg-white/10"
              data-testid="button-keluar"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        {/* Title + Add Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold font-serif text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Manajemen Anggota KKN
            </h2>
            <p className="text-muted-foreground mt-1">{anggota.length} anggota terdaftar</p>
          </div>
          <Button onClick={() => bukaForm()} data-testid="button-tambah">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Anggota
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Memuat data...</div>
        ) : anggota.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Belum ada anggota. Klik "Tambah Anggota" untuk mulai.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {dikelompokkan.map((grup) => (
              <div key={grup.divisi}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 border-b pb-2">
                  {grup.divisi}
                </h3>
                <div className="space-y-3">
                  {grup.anggota.map((a) => (
                    <div
                      key={a.id}
                      className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
                      data-testid={`row-anggota-${a.id}`}
                    >
                      <div className="flex items-center gap-4 p-4">
                        {a.fotoUrl ? (
                          <img
                            src={a.fotoUrl}
                            alt={a.nama}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                            {a.nama.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-foreground">{a.nama}</span>
                            <Badge variant="outline" className="text-xs">{a.jabatan}</Badge>
                          </div>
                          {(a.bidangKeahlian ?? []).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(a.bidangKeahlian ?? []).slice(0, 3).map((k) => (
                                <span key={k} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{k}</span>
                              ))}
                              {(a.bidangKeahlian ?? []).length > 3 && (
                                <span className="text-xs text-muted-foreground">+{(a.bidangKeahlian ?? []).length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                            className="p-1.5 text-muted-foreground hover:text-foreground"
                          >
                            {expandedId === a.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <Button variant="outline" size="sm" onClick={() => bukaForm(a)} data-testid={`button-edit-${a.id}`}>
                            <Pencil className="w-3.5 h-3.5 mr-1" />
                            Ubah
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:border-destructive"
                            onClick={() => setHapusId(a.id)}
                            data-testid={`button-hapus-${a.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                      {expandedId === a.id && (
                        <div className="border-t border-border px-4 py-3 bg-muted/30 space-y-2 text-sm">
                          {a.bio && <p className="text-muted-foreground">{a.bio}</p>}
                          {(a.pengalaman ?? []).length > 0 && (
                            <div>
                              <p className="font-semibold text-foreground mb-1">Pengalaman:</p>
                              {(a.pengalaman ?? []).map((p, i) => (
                                <div key={i} className="ml-3 text-muted-foreground">
                                  <span className="font-medium text-foreground">{p.posisi}</span> di {p.institusi} ({p.durasi}) — {p.deskripsi}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      <Dialog open={modalBuka} onOpenChange={(open) => !open && tutupForm()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId !== null ? "Ubah Data Anggota" : "Tambah Anggota Baru"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-1">
            {/* Foto */}
            <div className="space-y-1.5">
              <Label>URL Foto (opsional)</Label>
              <Input
                placeholder="https://drive.google.com/... atau link foto"
                value={formData.fotoUrl ?? ""}
                onChange={(e) => setFormData((f) => ({ ...f, fotoUrl: e.target.value || null }))}
                data-testid="input-foto"
              />
              {formData.fotoUrl && (
                <img src={formData.fotoUrl} alt="preview" className="w-16 h-16 rounded-full object-cover border" onError={(e) => (e.currentTarget.style.display = "none")} />
              )}
            </div>

            {/* Nama */}
            <div className="space-y-1.5">
              <Label>Nama Lengkap *</Label>
              <Input
                placeholder="Nama anggota"
                value={formData.nama}
                onChange={(e) => setFormData((f) => ({ ...f, nama: e.target.value }))}
                data-testid="input-nama"
              />
            </div>

            {/* Jabatan & Divisi */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Jabatan *</Label>
                <select
                  value={formData.jabatan}
                  onChange={(e) => setFormData((f) => ({ ...f, jabatan: e.target.value }))}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                  data-testid="select-jabatan"
                >
                  {JABATAN_OPTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Divisi *</Label>
                <select
                  value={formData.divisi}
                  onChange={(e) => setFormData((f) => ({ ...f, divisi: e.target.value }))}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                  data-testid="select-divisi"
                >
                  {DIVISI_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <Label>Bio / Deskripsi Singkat</Label>
              <textarea
                placeholder="Deskripsi singkat tentang anggota..."
                value={formData.bio ?? ""}
                onChange={(e) => setFormData((f) => ({ ...f, bio: e.target.value || null }))}
                rows={3}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="textarea-bio"
              />
            </div>

            {/* Bidang Keahlian */}
            <div className="space-y-2">
              <Label>Bidang Keahlian</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Misal: Analisis Kebutuhan"
                  value={keahlianInput}
                  onChange={(e) => setKeahlianInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), tambahKeahlian())}
                  data-testid="input-keahlian"
                />
                <Button type="button" variant="outline" onClick={tambahKeahlian}>Tambah</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.bidangKeahlian.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full">
                    {k}
                    <button onClick={() => hapusKeahlian(k)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Pengalaman */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Pengalaman / Magang</Label>
                <Button type="button" variant="outline" size="sm" onClick={tambahPengalaman}>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Tambah
                </Button>
              </div>
              {formData.pengalaman.map((p, i) => (
                <div key={i} className="border border-border rounded-lg p-3 space-y-2 relative">
                  <button
                    onClick={() => hapusPengalaman(i)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Input placeholder="Nama institusi" value={p.institusi} onChange={(e) => updatePengalaman(i, "institusi", e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Posisi/jabatan" value={p.posisi} onChange={(e) => updatePengalaman(i, "posisi", e.target.value)} />
                    <Input placeholder="Durasi (misal: 4 bulan)" value={p.durasi} onChange={(e) => updatePengalaman(i, "durasi", e.target.value)} />
                  </div>
                  <Input placeholder="Deskripsi tugas" value={p.deskripsi} onChange={(e) => updatePengalaman(i, "deskripsi", e.target.value)} />
                </div>
              ))}
            </div>

            {/* Urutan */}
            <div className="space-y-1.5">
              <Label>Urutan Tampil</Label>
              <Input
                type="number"
                min={0}
                value={formData.urutan}
                onChange={(e) => setFormData((f) => ({ ...f, urutan: parseInt(e.target.value) || 0 }))}
                data-testid="input-urutan"
              />
            </div>

            {simpanError && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{simpanError}</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={tutupForm}>Batal</Button>
            <Button onClick={simpan} disabled={simpanLoading || !formData.nama.trim()} data-testid="button-simpan">
              {simpanLoading ? "Menyimpan..." : editId !== null ? "Simpan Perubahan" : "Tambah Anggota"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Konfirmasi Hapus */}
      <AlertDialog open={!!hapusId} onOpenChange={(o) => !o && setHapusId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
            <AlertDialogDescription>
              Data anggota ini akan dihapus permanen dan tidak bisa dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={hapus} className="bg-destructive hover:bg-destructive/90">
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
