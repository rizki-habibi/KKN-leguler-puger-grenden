import { motion } from "framer-motion";
import { Users, Crown, BookOpen, Wallet, Megaphone, Radio, Camera, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";

const jabatanWarna: Record<string, string> = {
  "Koordinator Desa": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Sekretaris": "bg-blue-100 text-blue-800 border-blue-300",
  "Bendahara": "bg-green-100 text-green-800 border-green-300",
  "Divisi Acara": "bg-purple-100 text-purple-800 border-purple-300",
  "Divisi Humas": "bg-pink-100 text-pink-800 border-pink-300",
  "Divisi PDD": "bg-orange-100 text-orange-800 border-orange-300",
  "Perkap & Konsumsi": "bg-teal-100 text-teal-800 border-teal-300",
};

const jabatanIcon: Record<string, React.ReactNode> = {
  "Koordinator Desa": <Crown className="w-5 h-5" />,
  "Sekretaris": <BookOpen className="w-5 h-5" />,
  "Bendahara": <Wallet className="w-5 h-5" />,
  "Divisi Acara": <Megaphone className="w-5 h-5" />,
  "Divisi Humas": <Radio className="w-5 h-5" />,
  "Divisi PDD": <Camera className="w-5 h-5" />,
  "Perkap & Konsumsi": <Package className="w-5 h-5" />,
};

const divisi = [
  {
    nama: "Pengurus Inti",
    anggota: [
      { nama: "Rafi", jabatan: "Koordinator Desa", inisial: "R" },
      { nama: "Zulfa", jabatan: "Sekretaris", inisial: "Z" },
      { nama: "Dinda", jabatan: "Bendahara", inisial: "D" },
    ],
  },
  {
    nama: "Divisi Acara",
    anggota: [
      { nama: "Anisa", jabatan: "Divisi Acara", inisial: "A" },
      { nama: "Fita", jabatan: "Divisi Acara", inisial: "F" },
    ],
  },
  {
    nama: "Divisi Humas",
    anggota: [
      { nama: "Rizky", jabatan: "Divisi Humas", inisial: "R" },
      { nama: "Lulu", jabatan: "Divisi Humas", inisial: "L" },
    ],
  },
  {
    nama: "Divisi PDD",
    anggota: [
      { nama: "Maliki", jabatan: "Divisi PDD", inisial: "M" },
      { nama: "Rehan", jabatan: "Divisi PDD", inisial: "R" },
      { nama: "Syerli", jabatan: "Divisi PDD", inisial: "S" },
    ],
  },
  {
    nama: "Perkap & Konsumsi",
    catatan: "Dikerjakan bersama oleh seluruh anggota",
    anggota: [],
  },
];

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

function KartuAnggota({ nama, jabatan, inisial }: { nama: string; jabatan: string; inisial: string }) {
  const warna = jabatanWarna[jabatan] ?? "bg-gray-100 text-gray-800 border-gray-300";
  const gradient = getGradient(nama);
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl shadow-sm border border-border flex flex-col items-center p-6 gap-4 text-center"
      data-testid={`card-anggota-${nama.toLowerCase()}`}
    >
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-3xl font-serif shadow-md`}>
        {inisial}
      </div>
      <div>
        <h3 className="font-bold text-foreground text-lg font-serif">{nama}</h3>
        <span className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${warna}`}>
          {jabatanIcon[jabatan]}
          {jabatan}
        </span>
      </div>
    </motion.div>
  );
}

export default function AnggotaKkn() {
  const totalAnggota = divisi.reduce((acc, d) => acc + d.anggota.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              KKN Kolaboratif 018 — Desa Grenden 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Anggota KKN</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Tim mahasiswa KKN Kolaboratif Kelompok 018 yang bertugas di Desa Grenden, Kecamatan Puger, Kabupaten Jember.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2 text-sm font-semibold">
              Total {totalAnggota} Anggota Aktif
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divisi */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-16">
          {divisi.map((div, i) => (
            <FadeIn key={div.nama} delay={i * 0.1}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-border" />
                  <h2 className="text-xl font-bold font-serif text-foreground whitespace-nowrap">{div.nama}</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                {div.catatan && (
                  <div className="mb-6 text-center">
                    <span className="inline-block bg-muted text-muted-foreground rounded-xl px-6 py-3 text-sm italic">
                      {div.catatan}
                    </span>
                  </div>
                )}
                {div.anggota.length > 0 && (
                  <div className={`grid gap-6 ${div.anggota.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"}`}>
                    {div.anggota.map((anggota) => (
                      <KartuAnggota
                        key={`${div.nama}-${anggota.nama}`}
                        nama={anggota.nama}
                        jabatan={anggota.jabatan}
                        inisial={anggota.inisial}
                      />
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Catatan Bawah */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            KKN Kolaboratif Kelompok 018 — Desa Grenden, Kecamatan Puger, Kabupaten Jember
            <br />Tahun Akademik 2024/2025
          </p>
        </div>
      </section>
    </div>
  );
}
