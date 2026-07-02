import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, Users, Map, Clock, Building, MapPin,
  Phone, Mail, Globe, BookOpen, Eye, Camera, Newspaper,
  Link as LinkIcon, ShieldCheck, ChevronRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { api, type AnggotaKkn } from "@/lib/api";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/images/hero-banner.png";
import kknJagung from "@/assets/images/kkn-jagung.png";
import bantuanBeras from "@/assets/images/bantuan-beras.png";
import tanamPohon from "@/assets/images/tanam-pohon.png";
import gotongRoyong from "@/assets/images/gotong-royong.png";
import sawahHijau from "@/assets/images/sawah-hijau.png";
import kknPresentasi from "@/assets/images/kkn-presentasi.png";
import balaiDesa from "@/assets/images/balai-desa.png";
import tariTradisional from "@/assets/images/tari-tradisional.png";

const BERITA = [
  { id: 1, judul: "Mahasiswa KKN Kolaboratif Kelompok 018 Inovasikan Produk Olahan Jagung di Desa Grenden", tanggal: "20 Agustus 2025", dibaca: 298, gambar: kknJagung },
  { id: 2, judul: "Produk Hasil Pangan Lokal KKN Kolaboratif 018 Grenden Hadirkan Camilan dan Sirup Bergizi", tanggal: "13 Agustus 2025", dibaca: 381, gambar: bantuanBeras },
  { id: 3, judul: "KATALOG POTENSI KOMODITAS PANGAN DI DESA GRENDEN OLEH KKN KOLABORATIF KELOMPOK 018 TAHUN 2025", tanggal: "4 Agustus 2025", dibaca: 565, gambar: tanamPohon },
];

const GALERI_PREVIEW = [
  { src: sawahHijau, alt: "Pemandangan sawah hijau Desa Grenden", size: "col-span-2 row-span-2" },
  { src: kknJagung, alt: "KKN mengolah jagung", size: "" },
  { src: balaiDesa, alt: "Balai Desa Grenden", size: "" },
  { src: tariTradisional, alt: "Tari tradisional Jawa Timur", size: "col-span-2" },
  { src: kknPresentasi, alt: "KKN penyuluhan warga", size: "" },
  { src: gotongRoyong, alt: "Gotong royong warga", size: "" },
];

const warnaBg = [
  "from-green-500 to-green-700", "from-blue-500 to-blue-700",
  "from-purple-500 to-purple-700", "from-pink-500 to-pink-700",
  "from-orange-500 to-orange-700", "from-teal-500 to-teal-700",
];
function getGradient(nama: string) {
  let hash = 0;
  for (let i = 0; i < nama.length; i++) hash = nama.charCodeAt(i) + ((hash << 5) - hash);
  return warnaBg[Math.abs(hash) % warnaBg.length];
}

function SectionTitle({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <FadeIn>
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">{label}</span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">{title}</h2>
        {desc && <p className="text-muted-foreground mt-3 leading-relaxed">{desc}</p>}
      </div>
    </FadeIn>
  );
}

export default function Beranda() {
  const [anggota, setAnggota] = useState<AnggotaKkn[]>([]);

  useEffect(() => {
    api.anggota.list().then(setAnggota).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Desa Grenden" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Situs Resmi Desa Grenden
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-white leading-tight">
                Grenden Baru,<br />
                <span className="text-accent">Grenden Bersatu.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p className="mt-6 text-white/80 text-lg md:text-xl max-w-xl leading-relaxed">
                Membangun masyarakat yang Bersih, Religius, Sejahtera, Rapi, dan Indah melalui akselerasi pembangunan berbasis keagamaan dan budaya.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full font-semibold">
                  <a href="#profil">Profil Desa <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Link href="/berita">Lihat Berita</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/50">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── STATISTIK ─────────────────────────────────────────────── */}
      <section className="bg-primary text-white py-10">
        <div className="container mx-auto px-4 md:px-6">
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: <Users className="w-7 h-7" />, nilai: "15.105", satuan: "Jiwa", label: "Total Penduduk" },
                { icon: <Map className="w-7 h-7" />, nilai: "1.111.690", satuan: "m²", label: "Luas Wilayah" },
                { icon: <Clock className="w-7 h-7" />, nilai: "1917", satuan: "", label: "Tahun Berdiri" },
                { icon: <Building className="w-7 h-7" />, nilai: "11", satuan: "Kepala Desa", label: "Sepanjang Sejarah" },
              ].map((s) => (
                <StaggerItem key={s.label}>
                  <div className="flex flex-col items-center gap-2" data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
                    <div className="bg-white/15 rounded-full p-3">{s.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold font-serif">{s.nilai}</div>
                    {s.satuan && <div className="text-xs text-white/70 font-medium">{s.satuan}</div>}
                    <div className="text-sm text-white/80">{s.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── PROFIL DESA ───────────────────────────────────────────── */}
      <section id="profil" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle label="Profil" title="Mengenal Desa Grenden" desc="Desa Grenden terletak di Kecamatan Puger, Kabupaten Jember, Jawa Timur — kaya sejarah dan budaya sejak berdiri tahun 1917." />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div className="space-y-4">
                {[
                  { icon: <MapPin className="w-5 h-5 text-primary" />, label: "Alamat", val: "Jalan Raya Puger No. 01, Dusun Krajan 1, RT 001/RW 015, Desa Grenden, Kec. Puger, Jember 68164" },
                  { icon: <Phone className="w-5 h-5 text-primary" />, label: "Telepon", val: "081358965655" },
                  { icon: <Mail className="w-5 h-5 text-primary" />, label: "Email", val: "Pemdesgrenden@gmail.com" },
                  { icon: <Globe className="w-5 h-5 text-primary" />, label: "Website", val: "https://Grenden.desa.id" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 p-4 bg-muted/50 rounded-xl">
                    <div className="shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                      <p className="text-foreground text-sm mt-0.5">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-foreground">Batas Wilayah</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { arah: "Utara", desa: "Desa Kasiyan Timur & Kasiyan" },
                    { arah: "Selatan", desa: "Desa Puger Kulon & Mojosari" },
                    { arah: "Timur", desa: "Desa Wonosari & Puger Wetan" },
                    { arah: "Barat", desa: "Desa Karangrejo, Kec. Gumukmas" },
                  ].map((b) => (
                    <div key={b.arah} className="bg-primary/5 border border-primary/15 rounded-xl p-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">{b.arah}</p>
                      <p className="text-sm text-foreground mt-1">{b.desa}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Ketinggian:</span> 7 m dari permukaan laut</p>
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Ke Kecamatan:</span> 5 km (~7 menit)</p>
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Ke Kabupaten:</span> 37 km (~90 menit)</p>
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Kepala Desa:</span> SUYONO</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SEJARAH ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle label="Sejarah" title="Jejak Sejarah Desa Grenden" />
          <FadeIn>
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-4 text-muted-foreground leading-relaxed">
              <p>Desa Grenden berdiri sejak tahun <strong className="text-foreground">1917</strong> di wilayah Kecamatan Puger, Kabupaten Jember. Secara historis, wilayah Puger merupakan pusat <strong className="text-foreground">Kerajaan Sadeng</strong> yang menjadi lumbung pangan Kerajaan Majapahit — salah satu kerajaan terbesar di Nusantara.</p>
              <p>Kerajaan Sadeng memiliki wilayah kekuasaan di sekitar Kabupaten Jember dan Bondowoso, dengan ibu kota kerajaan di wilayah Puger. Kerajaan ini berperan vital dalam mensuplai kebutuhan pangan Majapahit sehingga dijuluki sebagai lumbung pangan kerajaan.</p>
              <p>Untuk memperkaya warisan budaya tersebut, lahirlah <strong className="text-foreground">Tari Perang Sadeng</strong> — tarian yang menggambarkan pertempuran sengit antara Kerajaan Sadeng dan Majapahit sebagai wujud pelestarian khasanah budaya bangsa. Kostum yang megah dan irama yang padu menjadikan tarian ini kebanggaan masyarakat Grenden.</p>
              <p>Masyarakat Grenden terdiri dari etnis <strong className="text-foreground">Jawa dan Madura</strong> yang hidup berdampingan secara harmonis, membangun desa bersama dengan semangat gotong royong sejak lebih dari satu abad yang lalu.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8">
              <h3 className="text-center font-bold font-serif text-xl text-foreground mb-6">Kepala Desa dari Masa ke Masa</h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">No.</th>
                      <th className="px-4 py-3 text-left font-semibold">Nama Kepala Desa</th>
                      <th className="px-4 py-3 text-left font-semibold">Dari</th>
                      <th className="px-4 py-3 text-left font-semibold">Sampai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1","MOERADI","1917","1919"],["2","R. SOENYONO","1919","1920"],
                      ["3","ABDULLAH OLEH","1920","1965"],["4","YARKUS","1965","1968"],
                      ["5","PARJAN","1968","1972"],["6","SOEPARDI","1972","1985"],
                      ["7","REDISON ARNOLD","1985","1994"],["8","USREK INDAYATI","1994","2002"],
                      ["9","REDI ISTI PRIYONO","2002","2013"],["10","TITIS PUSPANINGRUM","2013","2019"],
                      ["11","SUYONO","2019","2025"],
                    ].map(([no, nama, dari, sampai]) => (
                      <tr key={no} className={parseInt(no) % 2 === 0 ? "bg-muted/30" : "bg-white"}>
                        <td className="px-4 py-2.5 text-muted-foreground">{no}</td>
                        <td className="px-4 py-2.5 font-medium text-foreground">{nama}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{dari}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{sampai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── VISI MISI ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle label="Arah Desa" title="Visi & Misi" />
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="bg-primary text-white rounded-2xl p-8 h-full">
                <BookOpen className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="text-xl font-bold font-serif mb-2">Visi</h3>
                <p className="text-2xl font-bold font-serif text-accent mb-4">"Grenden Baru, Grenden Bersatu"</p>
                <p className="text-white/80 text-sm italic mb-3">(Bersih, Religius, Sejahtera, Rapi, dan Indah)</p>
                <p className="text-white/80 text-sm leading-relaxed">Terwujudnya masyarakat Desa Grenden yang Bersih, Religius, Sejahtera, Rapi dan Indah melalui Akselerasi Pembangunan yang berbasis Keagamaan, Budaya Hukum dan Berwawasan Lingkungan.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-white border border-border rounded-2xl p-8 h-full shadow-sm">
                <h3 className="text-xl font-bold font-serif text-foreground mb-5">Misi Utama</h3>
                <div className="space-y-4">
                  {[
                    "Melanjutkan pembangunan desa yang belum terlaksana",
                    "Meningkatkan kerjasama pemerintah desa dengan lembaga desa",
                    "Meningkatkan kesejahteraan masyarakat melalui sarana ekonomi",
                    "Melestarikan adat istiadat dan budaya desa",
                    "Meningkatkan pelayanan pemerintahan kepada warga",
                    "Meningkatkan sarana pendidikan dan SDM Desa Grenden",
                  ].map((m, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── BERITA TERBARU ────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle label="Berita" title="Berita & Kegiatan Terbaru" />
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-6">
              {BERITA.map((b) => (
                <StaggerItem key={b.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                    data-testid={`card-berita-${b.id}`}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={b.gambar} alt={b.judul} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-xs text-muted-foreground">{b.tanggal}</span>
                      <h4 className="font-bold text-foreground line-clamp-3 leading-snug text-sm">{b.judul}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3.5 h-3.5" />
                        {b.dibaca.toLocaleString("id-ID")} kali dibaca
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/berita">Lihat Semua Berita <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── GALERI ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle label="Galeri" title="Potret Kegiatan Desa" desc="Dokumentasi visual kegiatan KKN dan kehidupan masyarakat Desa Grenden." />
          <FadeIn>
            <div className="grid grid-cols-3 gap-3 rounded-2xl overflow-hidden">
              {GALERI_PREVIEW.map((g, i) => (
                <div key={i} className={`${g.size} overflow-hidden rounded-xl aspect-square`}>
                  <img src={g.src} alt={g.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/galeri"><Camera className="mr-2 w-4 h-4" />Buka Galeri Lengkap</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ANGGOTA KKN ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle label="Tim KKN" title="Anggota KKN Kolaboratif 018" desc="Mahasiswa yang bertugas melaksanakan program pengabdian di Desa Grenden tahun 2025." />
          {anggota.length === 0 ? (
            <FadeIn>
              <div className="text-center py-10 bg-white rounded-2xl border border-border">
                <Users className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground text-sm">Data anggota belum tersedia.</p>
                <Link href="/admin" className="text-primary hover:underline text-sm mt-2 inline-block">Isi data melalui panel admin</Link>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {anggota.slice(0, 10).map((a) => {
                  const gradient = getGradient(a.nama);
                  return (
                    <StaggerItem key={a.id}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden text-center"
                      >
                        {a.fotoUrl ? (
                          <img src={a.fotoUrl} alt={a.nama} className="w-full aspect-square object-cover object-top" />
                        ) : (
                          <div className={`w-full aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-3xl font-serif`}>
                            {a.nama.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="p-3">
                          <p className="font-bold text-foreground text-sm truncate">{a.nama}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{a.jabatan}</p>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>
          )}
          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/anggota-kkn"><Users className="mr-2 w-4 h-4" />Lihat Semua Anggota</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── KONTEN SOSMED ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle label="Media Sosial" title="Konten Kegiatan KKN" desc="Dokumentasi kegiatan kami di Instagram, TikTok, YouTube, dan platform sosial lainnya." />
          <FadeIn>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { platform: "Instagram", warna: "from-purple-500 to-pink-500", link: "/konten-sosmed", desc: "Foto & cerita harian kegiatan KKN" },
                { platform: "TikTok", warna: "from-gray-900 to-gray-700", link: "/konten-sosmed", desc: "Video singkat kegiatan & inovasi" },
                { platform: "YouTube", warna: "from-red-600 to-red-500", link: "/konten-sosmed", desc: "Video dokumentasi lengkap kegiatan" },
              ].map((s) => (
                <Link key={s.platform} href={s.link}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`bg-gradient-to-br ${s.warna} text-white rounded-2xl p-6 cursor-pointer`}
                  >
                    <LinkIcon className="w-8 h-8 mb-4 opacity-80" />
                    <h4 className="font-bold text-lg">{s.platform}</h4>
                    <p className="text-white/80 text-sm mt-1">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold bg-white/20 rounded-full px-3 py-1">
                      Lihat Konten <ChevronRight className="w-3 h-3" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PPID & KONTAK ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle label="PPID" title="Informasi Publik Desa" desc="Layanan informasi publik sesuai ketentuan perundang-undangan yang berlaku." />
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">Visi PPID Desa</h3>
                </div>
                <p className="text-sm text-muted-foreground italic">"Grenden Baru, Grenden Bersatu" — Mudah, Cepat, Tepat dan Transparan</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Terwujudnya media penghubung masyarakat untuk dapat mengenal, memahami dan berpartisipasi dalam kegiatan Pemerintah Desa Grenden.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="font-bold text-foreground">Kontak PPID</h3>
                {[
                  { label: "PPID Kabupaten", val: "Dinas Komunikasi dan Informatika Kab. Jember", sub: "Jl. Nusantara No.02, Kaliwates, Jember" },
                  { label: "PPID Desa", val: "Dinas PMD Kabupaten Jember", sub: "Jl. Jawa No.26, Sumbersari, Jember | (0331) 322870" },
                ].map((k) => (
                  <div key={k.label} className="border-l-2 border-primary pl-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">{k.label}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{k.val}</p>
                    <p className="text-xs text-muted-foreground">{k.sub}</p>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                  <Link href="/ppid"><Newspaper className="w-4 h-4 mr-2" />Selengkapnya</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
