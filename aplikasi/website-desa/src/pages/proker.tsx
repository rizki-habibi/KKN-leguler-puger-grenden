import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import {
  ClipboardList,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react";

type StatusProker = "selesai" | "berjalan" | "rencana";

interface ProgramKerja {
  id: number;
  nama: string;
  deskripsi: string;
  bidang: string;
  sasaran: string;
  lokasi: string;
  waktu: string;
  status: StatusProker;
  output: string;
}

const STATUS_CONFIG: Record<StatusProker, { label: string; color: string; icon: React.ReactNode }> = {
  selesai: {
    label: "Selesai",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  berjalan: {
    label: "Sedang Berjalan",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
  },
  rencana: {
    label: "Rencana",
    color: "bg-gray-100 text-gray-600 border-gray-200",
    icon: <Circle className="w-4 h-4" />,
  },
};

const BIDANG_WARNA: Record<string, string> = {
  "Pendidikan": "bg-purple-100 text-purple-700",
  "Ekonomi": "bg-amber-100 text-amber-700",
  "Kesehatan": "bg-red-100 text-red-700",
  "Lingkungan": "bg-green-100 text-green-700",
  "Sosial Budaya": "bg-pink-100 text-pink-700",
  "Infrastruktur": "bg-orange-100 text-orange-700",
  "Teknologi": "bg-cyan-100 text-cyan-700",
};

// ── DATA PROKER — ISI SESUAI PROGRAM KERJA NYATA ──────────────
const DAFTAR_PROKER: ProgramKerja[] = [
  {
    id: 1,
    nama: "Inovasi Produk Olahan Jagung",
    deskripsi:
      "Pelatihan pengolahan jagung menjadi produk bernilai ekonomi bersama ibu-ibu PKK Desa Grenden.",
    bidang: "Ekonomi",
    sasaran: "Ibu-ibu PKK Desa Grenden",
    lokasi: "Balai Desa Grenden",
    waktu: "Juli 2026",
    status: "selesai",
    output: "Produk olahan jagung siap jual dengan kemasan menarik",
  },
  {
    id: 2,
    nama: "Gotong Royong Bersih Desa",
    deskripsi:
      "Kegiatan pembersihan lingkungan desa bersama seluruh warga dan perangkat desa.",
    bidang: "Lingkungan",
    sasaran: "Seluruh warga Desa Grenden",
    lokasi: "Seluruh wilayah Desa Grenden",
    waktu: "Juli 2026",
    status: "selesai",
    output: "Lingkungan desa lebih bersih dan tertata",
  },
  {
    id: 3,
    nama: "Program Kerja 3",
    deskripsi: "Deskripsi program kerja akan segera diisi.",
    bidang: "Pendidikan",
    sasaran: "—",
    lokasi: "—",
    waktu: "—",
    status: "rencana",
    output: "—",
  },
  {
    id: 4,
    nama: "Program Kerja 4",
    deskripsi: "Deskripsi program kerja akan segera diisi.",
    bidang: "Kesehatan",
    sasaran: "—",
    lokasi: "—",
    waktu: "—",
    status: "rencana",
    output: "—",
  },
  {
    id: 5,
    nama: "Program Kerja 5",
    deskripsi: "Deskripsi program kerja akan segera diisi.",
    bidang: "Sosial Budaya",
    sasaran: "—",
    lokasi: "—",
    waktu: "—",
    status: "rencana",
    output: "—",
  },
  {
    id: 6,
    nama: "Program Kerja 6",
    deskripsi: "Deskripsi program kerja akan segera diisi.",
    bidang: "Teknologi",
    sasaran: "—",
    lokasi: "—",
    waktu: "—",
    status: "rencana",
    output: "—",
  },
];

const jumlahSelesai = DAFTAR_PROKER.filter((p) => p.status === "selesai").length;
const jumlahBerjalan = DAFTAR_PROKER.filter((p) => p.status === "berjalan").length;
const jumlahRencana = DAFTAR_PROKER.filter((p) => p.status === "rencana").length;

export default function ProkerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <FadeIn>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Program Kerja KKN</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Daftar program kerja Tim KKN Reguler ITS Mandala Jember di Desa Grenden, Kecamatan Puger,
              Kabupaten Jember Tahun 2026.
            </p>
          </FadeIn>

          {/* Statistik */}
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <div className="text-left">
                  <p className="text-2xl font-bold">{jumlahSelesai}</p>
                  <p className="text-white/70 text-xs font-medium">Program Selesai</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3">
                <Loader2 className="w-6 h-6 text-blue-300" />
                <div className="text-left">
                  <p className="text-2xl font-bold">{jumlahBerjalan}</p>
                  <p className="text-white/70 text-xs font-medium">Sedang Berjalan</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3">
                <Circle className="w-6 h-6 text-gray-300" />
                <div className="text-left">
                  <p className="text-2xl font-bold">{jumlahRencana}</p>
                  <p className="text-white/70 text-xs font-medium">Rencana</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-2xl font-bold">{DAFTAR_PROKER.length}</p>
                  <p className="text-white/70 text-xs font-medium">Total Program</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Daftar Proker */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAFTAR_PROKER.map((proker) => {
              const statusCfg = STATUS_CONFIG[proker.status];
              const bidangWarna = BIDANG_WARNA[proker.bidang] ?? "bg-gray-100 text-gray-600";
              const isPlaceholder = proker.sasaran === "—";

              return (
                <StaggerItem key={proker.id}>
                  <div
                    className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4 h-full transition-shadow hover:shadow-md ${isPlaceholder ? "opacity-70" : ""}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusCfg.color}`}>
                            {statusCfg.icon}
                            {statusCfg.label}
                          </span>
                          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${bidangWarna}`}>
                            {proker.bidang}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-foreground font-serif leading-tight">
                          {proker.nama}
                        </h3>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-serif text-lg">
                        {proker.id}
                      </div>
                    </div>

                    {/* Deskripsi */}
                    <p className="text-muted-foreground text-sm leading-relaxed">{proker.deskripsi}</p>

                    {/* Detail */}
                    {!isPlaceholder && (
                      <div className="grid grid-cols-1 gap-2 mt-auto pt-4 border-t text-sm">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Users className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
                          <span><span className="font-medium text-foreground">Sasaran:</span> {proker.sasaran}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
                          <span><span className="font-medium text-foreground">Lokasi:</span> {proker.lokasi}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
                          <span><span className="font-medium text-foreground">Waktu:</span> {proker.waktu}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
                          <span><span className="font-medium text-foreground">Output:</span> {proker.output}</span>
                        </div>
                      </div>
                    )}

                    {isPlaceholder && (
                      <div className="mt-auto pt-4 border-t border-dashed text-center text-xs text-muted-foreground italic">
                        Data program kerja akan segera diperbarui
                      </div>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-8 px-4 bg-muted/30 border-t">
        <div className="container mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          Data program kerja dikelola oleh tim KKN.{" "}
          <a href="/admin" className="text-primary hover:underline font-medium">Login ke panel admin</a>{" "}
          untuk memperbarui data.
        </div>
      </section>
    </div>
  );
}
