import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Star, ChevronDown, ChevronUp, GraduationCap, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { ANGGOTA_KKN, type AnggotaKkn } from "@/data/anggota";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const warnaBg = [
  "from-green-500 to-green-700",
  "from-blue-500 to-blue-700",
  "from-purple-500 to-purple-700",
  "from-pink-500 to-pink-700",
  "from-orange-500 to-orange-700",
  "from-teal-500 to-teal-700",
  "from-yellow-500 to-yellow-700",
  "from-red-500 to-red-700",
  "from-indigo-500 to-indigo-700",
];

function getGradient(nama: string) {
  let hash = 0;
  for (let i = 0; i < nama.length; i++) hash = nama.charCodeAt(i) + ((hash << 5) - hash);
  return warnaBg[Math.abs(hash) % warnaBg.length];
}

const DIVISI_ORDER = [
  "Pengurus Inti",
  "Divisi Acara",
  "Divisi Humas",
  "Divisi PDD",
  "Perkap & Konsumsi",
];

function KartuAnggota({ a }: { a: AnggotaKkn }) {
  const [buka, setBuka] = useState(false);
  const gradient = getGradient(a.nama);
  const adaDetail = a.bio || (a.bidangKeahlian ?? []).length > 0 || (a.pengalaman ?? []).length > 0;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col"
      data-testid={`card-anggota-${a.id}`}
    >
      {/* Foto / Avatar — full image, no crop */}
      <div className="relative bg-[#0a1628]">
        {a.fotoUrl ? (
          <img
            src={a.fotoUrl}
            alt={a.nama}
            className="w-full h-auto object-contain block"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.nextElementSibling as HTMLElement)?.style.setProperty("display", "flex");
            }}
          />
        ) : null}
        <div
          className={`w-full aspect-[3/4] bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-5xl font-serif ${a.fotoUrl ? "hidden" : "flex"}`}
        >
          {a.nama.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div>
          <h3 className="font-bold text-foreground text-base font-serif leading-tight">{a.nama}</h3>
          {(a.nim || a.programStudi) && (
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {a.nim && (
                <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{a.nim}</span>
              )}
              {a.programStudi && (
                <span className="text-xs text-primary font-medium">{a.programStudi}</span>
              )}
            </div>
          )}
          <Badge className="mt-2 text-xs">{a.jabatan}</Badge>
        </div>

        {/* Bidang Keahlian */}
        {(a.bidangKeahlian ?? []).length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
              <Star className="w-3 h-3" />
              Bidang Keahlian
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(a.bidangKeahlian ?? []).map((k) => (
                <span key={k} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{k}</span>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Detail */}
        {adaDetail && (
          <button
            onClick={() => setBuka(!buka)}
            className="mt-auto flex items-center gap-1 text-sm text-primary font-medium hover:underline self-start"
            data-testid={`button-detail-${a.id}`}
          >
            {buka ? "Sembunyikan" : "Lihat Detail"}
            {buka ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {/* Detail Lipat */}
        {buka && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 border-t border-border pt-3 mt-1"
          >
            {a.bio && <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>}
            {(a.pengalaman ?? []).length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  Pengalaman
                </p>
                {(a.pengalaman ?? []).map((p, i) => (
                  <div key={i} className="ml-2 border-l-2 border-primary/30 pl-3 pb-2">
                    <p className="font-semibold text-sm text-foreground">{p.posisi}</p>
                    <p className="text-xs text-muted-foreground">{p.institusi} &middot; {p.durasi}</p>
                    {p.deskripsi && <p className="text-xs text-muted-foreground mt-0.5 italic">{p.deskripsi}</p>}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function AnggotaKkn() {
  const anggota = ANGGOTA_KKN;

  const dikelompokkan = DIVISI_ORDER.map((div) => ({
    divisi: div,
    anggota: anggota.filter((a) => a.divisi === div),
  })).filter((g) => g.anggota.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              KKN Reguler ITS Mandala Jember — Desa Grenden 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Anggota KKN</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Tim mahasiswa KKN Reguler ITS Mandala Jember yang bertugas di Desa Grenden, Kecamatan Puger, Kabupaten Jember.
            </p>

            {/* Info KKN */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
              {anggota.length > 0 && (
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2 text-sm font-semibold">
                  <Users className="w-4 h-4" />
                  {anggota.length} Anggota Aktif
                </div>
              )}
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-xl px-5 py-2.5 text-sm">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <div className="text-left">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">Dosen Pembimbing Lapangan</p>
                  <p className="font-bold text-white text-sm">Faizal Abrolillah, S.Kom., M.Kom.</p>
                </div>
              </div>
            </div>

            {/* Lokasi */}
            <div className="mt-3 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs text-white/80">
              📍 Desa Grenden, Kecamatan Puger, Kabupaten Jember
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Konten */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-16">
          {dikelompokkan.map((grup, gi) => (
            <FadeIn key={grup.divisi} delay={gi * 0.08}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-border" />
                  <h2 className="text-xl font-bold font-serif text-foreground whitespace-nowrap">{grup.divisi}</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className={`grid gap-5 ${grup.anggota.length === 1 ? "grid-cols-1 max-w-[220px] mx-auto" :
                  grup.anggota.length === 2 ? "grid-cols-2 max-w-sm mx-auto" :
                    grup.anggota.length === 3 ? "grid-cols-3 max-w-2xl mx-auto" :
                      grup.anggota.length === 4 ? "grid-cols-2 sm:grid-cols-4" :
                        grup.anggota.length === 5 ? "grid-cols-2 sm:grid-cols-5" :
                          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                  }`}>
                  {grup.anggota.map((a) => <KartuAnggota key={a.id} a={a} />)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Info Tambahan */}
      <section className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Program</p>
              <p className="font-bold text-foreground mt-1">KKN Reguler</p>
              <p className="text-sm text-muted-foreground">ITS Mandala Jember</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
              <GraduationCap className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Dosen Pembimbing</p>
              <p className="font-bold text-foreground mt-1">Faizal Abrolillah</p>
              <p className="text-sm text-muted-foreground">S.Kom., M.Kom.</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Lokasi</p>
              <p className="font-bold text-foreground mt-1">Desa Grenden</p>
              <p className="text-sm text-muted-foreground">Kec. Puger, Kab. Jember</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
