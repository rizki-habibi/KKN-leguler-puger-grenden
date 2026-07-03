import rafiAfandi from "@/assets/gambar/foto-anggota/rafi-afandi-kordes.png";
import zulfaAliyah from "@/assets/gambar/foto-anggota/zulfa-aliyah-sekretaris.png";
import afdaAdinda from "@/assets/gambar/foto-anggota/afda-adinda-bendahara.jpg";
import fitaDela from "@/assets/gambar/foto-anggota/fitadela-divisi-acara.png";
import syerliAmelia from "@/assets/gambar/foto-anggota/syerli-amelia-divisi-acara.png";
import rizkiHabibi from "@/assets/gambar/foto-anggota/rizki-habibi-divisi-humas.jpg";
import luluIndallah from "@/assets/gambar/foto-anggota/lulu-indallah-divisi-humas.png";
import anisSuntoni from "@/assets/gambar/foto-anggota/anis-suntoni-divisi-pdd.png";
import malikiSepta from "@/assets/gambar/foto-anggota/maliki-septa-divisi-pdd.png";
import reyhanSaputra from "@/assets/gambar/foto-anggota/reyhan-saputra-divisi-pdd.png";

/* ── Types ─────────────────────────────────────────────────── */
export interface DPL {
  nama: string;
  gelar: string;
  nidn: string;
  prodi: string;
  institusi: string;
  email: string;
  fotoUrl: string | null;
  bidangKeahlian: string[];
}

export interface AnggotaKkn {
  id: number;
  nama: string;
  jabatan: string;
  divisi: string;
  nim: string | null;
  programStudi: string | null;
  fotoUrl: string | null;
  bio: string | null;
  bidangKeahlian: string[];
  pengalaman: Array<{
    institusi: string;
    posisi: string;
    durasi: string;
    deskripsi: string;
  }>;
  urutan: number;
}

/* ── Data DPL ───────────────────────────────────────────────── */
export const DATA_DPL: DPL[] = [
  {
    nama: "Faizal Abrolillah",
    gelar: "S.Kom., M.Kom.",
    nidn: "-",
    prodi: "Sistem & Teknologi Informasi",
    institusi: "Institut Teknologi Sepuluh Nopember (ITS)",
    email: "-",
    fotoUrl: null, // TODO: tambahkan foto DPL saat tersedia
    bidangKeahlian: ["Sistem Informasi", "Teknologi Informasi", "Pengabdian Masyarakat"],
  },
];

/* ── Data Anggota KKN ───────────────────────────────────────── */
export const ANGGOTA_KKN: AnggotaKkn[] = [
  {
    id: 1,
    nama: "Rafi Afandi",
    jabatan: "Koordinator Desa",
    divisi: "Pengurus Inti",
    nim: "23020066",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: rafiAfandi,
    bio: "Koordinator Desa KKN Reguler ITS Mandala Jember 2026 di Desa Grenden. Bertanggung jawab dalam koordinasi kegiatan KKN dan komunikasi dengan pemerintah desa.",
    bidangKeahlian: ["Kepemimpinan", "Manajemen Proyek", "Pembangunan Ekonomi"],
    pengalaman: [],
    urutan: 1,
  },
  {
    id: 2,
    nama: "Zulfa Aliyah Faurina",
    jabatan: "Sekretaris",
    divisi: "Pengurus Inti",
    nim: "23030021",
    programStudi: "Manajemen",
    fotoUrl: zulfaAliyah,
    bio: "Sekretaris KKN bertanggung jawab dalam administrasi dan dokumentasi kegiatan KKN di Desa Grenden.",
    bidangKeahlian: ["Administrasi", "Dokumentasi", "Manajemen Organisasi"],
    pengalaman: [],
    urutan: 2,
  },
  {
    id: 3,
    nama: "Afda Adinda Trias C.N.G.",
    jabatan: "Bendahara",
    divisi: "Pengurus Inti",
    nim: "23040012",
    programStudi: "Akuntansi",
    fotoUrl: afdaAdinda,
    bio: "Bendahara KKN yang mengelola keuangan dan pelaporan anggaran kegiatan KKN di Desa Grenden.",
    bidangKeahlian: ["Keuangan", "Akuntansi", "Pelaporan"],
    pengalaman: [],
    urutan: 3,
  },
  {
    id: 4,
    nama: "Fita Dela Putri Sari Dewi",
    jabatan: "Anggota Divisi Acara",
    divisi: "Divisi Acara",
    nim: "23030065",
    programStudi: "Manajemen",
    fotoUrl: fitaDela,
    bio: "Anggota Divisi Acara yang bertugas merencanakan dan mengkoordinasikan berbagai kegiatan KKN.",
    bidangKeahlian: ["Event Planning", "Koordinasi Acara"],
    pengalaman: [],
    urutan: 4,
  },
  {
    id: 5,
    nama: "Syerli Amelia Putri",
    jabatan: "Anggota Divisi Acara",
    divisi: "Divisi Acara",
    nim: "23020085",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: syerliAmelia,
    bio: "Anggota Divisi Acara yang membantu persiapan dan pelaksanaan kegiatan kemasyarakatan.",
    bidangKeahlian: ["Event Management", "Koordinasi Tim"],
    pengalaman: [],
    urutan: 5,
  },
  {
    id: 6,
    nama: "Rizki Habibi",
    jabatan: "Anggota Divisi Humas",
    divisi: "Divisi Humas",
    nim: "23060006",
    programStudi: "Sistem & Teknologi Informasi",
    fotoUrl: rizkiHabibi,
    bio: "Anggota Divisi Humas yang mengelola media sosial dan publikasi kegiatan KKN, serta pengembangan website desa.",
    bidangKeahlian: ["Web Development", "Social Media", "IT"],
    pengalaman: [],
    urutan: 6,
  },
  {
    id: 7,
    nama: "Lu'lu' Indallah Sari",
    jabatan: "Anggota Divisi Humas",
    divisi: "Divisi Humas",
    nim: "23030043",
    programStudi: "Manajemen",
    fotoUrl: luluIndallah,
    bio: "Anggota Divisi Humas yang bertugas dalam komunikasi eksternal dan publikasi kegiatan KKN.",
    bidangKeahlian: ["Public Relations", "Komunikasi", "Content Creation"],
    pengalaman: [],
    urutan: 7,
  },
  {
    id: 8,
    nama: "Anis Suntoni",
    jabatan: "Anggota Divisi PDD",
    divisi: "Divisi PDD",
    nim: "23030075",
    programStudi: "Manajemen",
    fotoUrl: anisSuntoni,
    bio: "Anggota Divisi Publikasi, Dekorasi & Dokumentasi yang bertugas mendokumentasikan kegiatan KKN.",
    bidangKeahlian: ["Fotografi", "Videografi", "Desain Grafis"],
    pengalaman: [],
    urutan: 8,
  },
  {
    id: 9,
    nama: "Maliki Septa Pratama",
    jabatan: "Anggota Divisi PDD",
    divisi: "Divisi PDD",
    nim: "23020010",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: malikiSepta,
    bio: "Anggota Divisi PDD yang bertugas dalam dokumentasi visual dan publikasi konten media sosial.",
    bidangKeahlian: ["Konten Creator", "Dokumentasi", "Desain"],
    pengalaman: [],
    urutan: 9,
  },
  {
    id: 10,
    nama: "Reyhan Saputra",
    jabatan: "Anggota Divisi PDD",
    divisi: "Divisi PDD",
    nim: "23020055",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: reyhanSaputra,
    bio: "Anggota Divisi PDD yang membantu dokumentasi foto dan video kegiatan KKN.",
    bidangKeahlian: ["Fotografi", "Editing Video", "Desain Publikasi"],
    pengalaman: [],
    urutan: 10,
  },
];
