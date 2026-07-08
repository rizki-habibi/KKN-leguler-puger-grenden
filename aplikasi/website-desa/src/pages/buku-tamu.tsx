import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/fade-in";
import {
  BookOpen, Plus, X, Lock, Unlock, Trash2, Phone, Building2, Calendar, User, FileText,
} from "lucide-react";
import { api, type BukuTamu } from "@/lib/api";

const HUMAS_PIN = "humas2026";

// Format tanggal Indonesia
function formatTgl(d: string) {
  try {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return d;
  }
}

// Tanggal hari ini YYYY-MM-DD
function hariIni() {
  return new Date().toISOString().split("T")[0];
}

interface FormData {
  nama: string;
  jabatanInstansi: string;
  noTelepon: string;
  keperluan: string;
  tanggalKunjungan: string;
}

const FORM_KOSONG: FormData = {
  nama: "",
  jabatanInstansi: "",
  noTelepon: "",
  keperluan: "",
  tanggalKunjungan: hariIni(),
};

export default function BukuTamuPage() {
  const [daftarTamu, setDaftarTamu] = useState<BukuTamu[]>([]);
  const [loading, setLoading] = useState(true);
  const [humasMode, setHumasMode] = useState(false);
  const [humasPin, setHumasPin] = useState(""); // PIN tersimpan setelah verified
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(FORM_KOSONG);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitOk, setSubmitOk] = useState(false);
  const [hapusId, setHapusId] = useState<number | null>(null);

  // Ambil data tamu dari API
  const muatData = () => {
    setLoading(true);
    api.bukuTamu
      .list()
      .then((data) => setDaftarTamu(data))
      .catch(() => setDaftarTamu([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    muatData();
  }, []);

  // ── PIN unlock ──────────────────────────────────────────────
  function bukaPinModal() {
    setPin("");
    setPinError("");
    setShowPinModal(true);
  }

  function verifikasiPin() {
    if (pin === HUMAS_PIN) {
      setHumasMode(true);
      setHumasPin(pin); // simpan PIN untuk request berikutnya
      setShowPinModal(false);
      setPinError("");
    } else {
      setPinError("PIN salah. Coba lagi.");
    }
  }

  function keluarHumas() {
    setHumasMode(false);
    setHumasPin("");
    setShowForm(false);
    setForm(FORM_KOSONG);
    setSubmitOk(false);
    setSubmitError("");
  }

  // ── Submit form ─────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nama.trim()) { setSubmitError("Nama wajib diisi."); return; }
    if (!form.tanggalKunjungan) { setSubmitError("Tanggal kunjungan wajib diisi."); return; }

    setSubmitting(true);
    setSubmitError("");

    try {
      await api.bukuTamu.create({
        nama: form.nama.trim(),
        jabatanInstansi: form.jabatanInstansi.trim() || null,
        noTelepon: form.noTelepon.trim() || null,
        keperluan: form.keperluan.trim() || null,
        tanggalKunjungan: form.tanggalKunjungan,
      }, humasPin);
      setSubmitOk(true);
      setForm(FORM_KOSONG);
      setShowForm(false);
      muatData();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Gagal menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Hapus tamu ───────────────────────────────────────────────
  async function hapusTamu(id: number) {
    try {
      await api.bukuTamu.delete(id, humasPin);
      setDaftarTamu((prev) => prev.filter((t) => t.id !== id));
    } catch {
      // silent
    } finally {
      setHapusId(null);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Buku Tamu</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Catatan kunjungan tamu dan mitra KKN di Desa Grenden.
            </p>
          </FadeIn>

          {/* Stat */}
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4 text-accent" />
                {loading ? "..." : daftarTamu.length} Tamu Tercatat
              </div>

              {/* Tombol humas — kecil, tidak mencolok di publik */}
              {!humasMode ? (
                <button
                  onClick={bukaPinModal}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors border border-white/20"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Humas
                </button>
              ) : (
                <button
                  onClick={keluarHumas}
                  className="bg-accent/20 hover:bg-accent/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-1.5 text-xs font-medium text-white transition-colors border border-accent/40"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Mode Humas Aktif — Keluar
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tombol Tambah Tamu (hanya muncul saat mode humas) */}
      <AnimatePresence>
        {humasMode && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-accent/5 border-b border-accent/20 px-4 py-4"
          >
            <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <Unlock className="w-4 h-4" />
                Mode Humas — Anda dapat menambah dan menghapus data tamu
              </div>
              <button
                onClick={() => { setShowForm(true); setSubmitOk(false); setSubmitError(""); }}
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Tambah Tamu Baru
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Notifikasi sukses */}
      <AnimatePresence>
        {submitOk && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 border-b border-green-200 px-4 py-3 text-center text-sm text-green-700 font-medium"
          >
            Data tamu berhasil disimpan.
            <button onClick={() => setSubmitOk(false)} className="ml-3 underline text-xs">Tutup</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabel tamu */}
      <section className="py-12 px-4 flex-1">
        <div className="container mx-auto max-w-5xl">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : daftarTamu.length === 0 ? (
            <FadeIn>
              <div className="text-center py-24 text-muted-foreground">
                <BookOpen className="w-14 h-14 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Belum ada data tamu</p>
                {humasMode && (
                  <p className="text-sm mt-1">Klik "Tambah Tamu Baru" untuk mulai mengisi buku tamu.</p>
                )}
              </div>
            </FadeIn>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border shadow-sm bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-8">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Nama</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Jabatan / Instansi</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">No. Telepon</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Keperluan</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Tanggal</th>
                    {humasMode && <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Aksi</th>}
                  </tr>
                </thead>
                <tbody>
                  {daftarTamu.map((tamu, idx) => (
                    <motion.tr
                      key={tamu.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{tamu.nama}</td>
                      <td className="px-4 py-3 text-muted-foreground">{tamu.jabatanInstansi || <span className="text-muted-foreground/40 italic">—</span>}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {tamu.noTelepon ? (
                          <a href={`tel:${tamu.noTelepon}`} className="hover:text-primary hover:underline transition-colors">
                            {tamu.noTelepon}
                          </a>
                        ) : (
                          <span className="text-muted-foreground/40 italic">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[200px]">
                        <span className="line-clamp-2">{tamu.keperluan || <span className="italic opacity-40">—</span>}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {formatTgl(tamu.tanggalKunjungan)}
                      </td>
                      {humasMode && (
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => setHapusId(tamu.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL PIN ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setShowPinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold font-serif text-foreground">Masuk Mode Humas</h2>
                <p className="text-sm text-muted-foreground mt-1">Masukkan PIN untuk mengakses fitur input data</p>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Masukkan PIN"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setPinError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && verifikasiPin()}
                  className="w-full border border-border rounded-xl px-4 py-3 text-center text-lg tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoFocus
                />
                {pinError && (
                  <p className="text-sm text-red-500 text-center font-medium">{pinError}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPinModal(false)}
                    className="flex-1 border border-border rounded-xl py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={verifikasiPin}
                    className="flex-1 bg-primary text-white rounded-xl py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    Masuk
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL FORM TAMBAH TAMU ───────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif text-foreground">Tambah Data Tamu</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Isi data kunjungan tamu</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary/70" />
                    Nama Tamu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama lengkap tamu"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    required
                  />
                </div>

                {/* Jabatan / Instansi */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-primary/70" />
                    Jabatan / Instansi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Kepala Dinas Pertanian / Mahasiswa UJ"
                    value={form.jabatanInstansi}
                    onChange={(e) => setForm({ ...form, jabatanInstansi: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* No Telepon */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary/70" />
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    value={form.noTelepon}
                    onChange={(e) => setForm({ ...form, noTelepon: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* Keperluan */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary/70" />
                    Keperluan / Keterangan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tujuan kunjungan, kerjasama, atau keterangan lain"
                    value={form.keperluan}
                    onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  />
                </div>

                {/* Tanggal */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary/70" />
                    Tanggal Kunjungan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.tanggalKunjungan}
                    onChange={(e) => setForm({ ...form, tanggalKunjungan: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    required
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-500 font-medium">{submitError}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-border rounded-xl py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary text-white rounded-xl py-2.5 text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Simpan Data
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL KONFIRMASI HAPUS ────────────────────────────────── */}
      <AnimatePresence>
        {hapusId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setHapusId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h2 className="text-lg font-bold font-serif text-foreground mb-2">Hapus Data Tamu?</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Data tamu ini akan dihapus permanen dan tidak bisa dikembalikan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHapusId(null)}
                  className="flex-1 border border-border rounded-xl py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => hapusTamu(hapusId)}
                  className="flex-1 bg-red-500 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-red-600 transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
