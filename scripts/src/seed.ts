import { db, anggotaKknTable } from "@workspace/db";

const anggota = [
  {
    nama: "Rafi Afandi",
    jabatan: "Koordinator Desa",
    divisi: "Pengurus Inti",
    nim: "23020066",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: "/foto/rafi.png",
    bio: "Koordinator Desa KKN Reguler ITS Mandala Jember di Desa Grenden. Bertanggung jawab atas koordinasi seluruh program dan kegiatan KKN, memimpin tim, dan menjadi penghubung antara mahasiswa KKN dengan pemerintah desa.",
    bidangKeahlian: ["Koordinasi Tim", "Manajemen Program", "Kepemimpinan"],
    pengalaman: [],
    urutan: 1,
  },
  {
    nama: "Zulfa Aliyah Faurina",
    jabatan: "Sekretaris",
    divisi: "Pengurus Inti",
    nim: "23030021",
    programStudi: "Manajemen",
    fotoUrl: "/foto/zulfa.png",
    bio: "Sekretaris KKN Reguler ITS Mandala Jember di Desa Grenden. Mengelola administrasi, surat-menyurat, notulensi rapat, dan dokumentasi seluruh kegiatan KKN.",
    bidangKeahlian: ["Administrasi", "Pengelolaan Dokumen", "Pencatatan Notulensi"],
    pengalaman: [],
    urutan: 2,
  },
  {
    nama: "Afda Adinda Trias Cahya Neng Gelis",
    jabatan: "Bendahara",
    divisi: "Pengurus Inti",
    nim: "23040022",
    programStudi: "Akuntansi",
    fotoUrl: "/foto/adinda.jpg",
    bio: "Bendahara KKN Reguler ITS Mandala Jember di Desa Grenden. Mengelola keuangan, anggaran kegiatan, dan laporan keuangan seluruh program KKN.",
    bidangKeahlian: ["Manajemen Keuangan", "Pembukuan", "Laporan Keuangan"],
    pengalaman: [],
    urutan: 3,
  },
  {
    nama: "Syerli Amelia Putri",
    jabatan: "Divisi Acara",
    divisi: "Divisi Acara",
    nim: "23020065",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: "/foto/syerli.png",
    bio: "Anggota Divisi Acara KKN Reguler ITS Mandala Jember. Merencanakan, mengkoordinasikan, dan melaksanakan seluruh kegiatan dan acara KKN di Desa Grenden.",
    bidangKeahlian: ["Perencanaan Acara", "Koordinasi Kegiatan", "Event Organizer"],
    pengalaman: [],
    urutan: 4,
  },
  {
    nama: "Fita Dela Putri Sari Dewi",
    jabatan: "Divisi Acara",
    divisi: "Divisi Acara",
    nim: "23030065",
    programStudi: "Manajemen",
    fotoUrl: "/foto/fita.png",
    bio: "Anggota Divisi Acara KKN Reguler ITS Mandala Jember. Merencanakan dan melaksanakan seluruh kegiatan KKN serta bertugas dalam koordinasi teknis dan dekorasi.",
    bidangKeahlian: ["Perencanaan Acara", "Dekorasi", "Koordinasi Teknis"],
    pengalaman: [],
    urutan: 5,
  },
  {
    nama: "Rizki Habibi",
    jabatan: "Divisi Humas",
    divisi: "Divisi Humas",
    nim: "23060006",
    programStudi: "Sistem dan Teknologi Informasi",
    fotoUrl: "/foto/rizki.jpg",
    bio: "Anggota Divisi Humas KKN Reguler ITS Mandala Jember. Pernah magang di SMAN 2 Jember selama 4 bulan sebagai Staf Tata Usaha.",
    bidangKeahlian: ["Pembuatan Analisis Kebutuhan", "Pelaporan", "Koordinasi", "Teknologi Informasi"],
    pengalaman: [
      {
        institusi: "SMAN 2 Jember",
        posisi: "Staf Tata Usaha",
        durasi: "4 bulan",
        deskripsi: "Magang Berdampak sebagai pembantu melayani dan koordinasi administrasi sekolah.",
      },
    ],
    urutan: 6,
  },
  {
    nama: "Lu'lu' Indallah Sari",
    jabatan: "Divisi Humas",
    divisi: "Divisi Humas",
    nim: "23030030",
    programStudi: "Manajemen",
    fotoUrl: "/foto/lulu.png",
    bio: "Anggota Divisi Humas KKN Reguler ITS Mandala Jember. Mengelola hubungan masyarakat, komunikasi publik, dan publikasi kegiatan KKN di Desa Grenden.",
    bidangKeahlian: ["Hubungan Masyarakat", "Komunikasi Publik", "Media Sosial"],
    pengalaman: [],
    urutan: 7,
  },
  {
    nama: "Maliki Septa Pratama",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    nim: "23020010",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: "/foto/maliki.png",
    bio: "Anggota Divisi PDD KKN Reguler ITS Mandala Jember. Bertanggung jawab atas desain publikasi dan fotografi kegiatan KKN.",
    bidangKeahlian: ["Fotografi", "Desain Grafis", "Publikasi"],
    pengalaman: [],
    urutan: 8,
  },
  {
    nama: "Reyhan Saputra",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    nim: "22020068",
    programStudi: "Ekonomi Pembangunan",
    fotoUrl: "/foto/reyhan.png",
    bio: "Anggota Divisi PDD KKN Reguler ITS Mandala Jember. Bertanggung jawab atas dokumentasi foto dan video seluruh kegiatan KKN.",
    bidangKeahlian: ["Videografi", "Editing Video", "Dokumentasi"],
    pengalaman: [],
    urutan: 9,
  },
  {
    nama: "Anis Suntoni",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    nim: "23030075",
    programStudi: "Manajemen",
    fotoUrl: "/foto/anis.png",
    bio: "Anggota Divisi PDD KKN Reguler ITS Mandala Jember. Mengelola konten media sosial dan publikasi kegiatan KKN.",
    bidangKeahlian: ["Konten Kreatif", "Media Sosial", "Desain Publikasi"],
    pengalaman: [],
    urutan: 10,
  },
];

async function seed() {
  console.log("🌱 Memulai seed data anggota KKN...");
  console.log("🗑️  Menghapus data anggota yang ada...");
  await db.delete(anggotaKknTable);
  console.log("➕ Memasukkan data anggota baru...");
  const hasil = await db.insert(anggotaKknTable).values(anggota).returning();
  console.log(`✅ Berhasil memasukkan ${hasil.length} anggota:\n`);
  hasil.forEach((a) => {
    console.log(`   [${a.id}] ${a.nama} — ${(a as any).programStudi ?? "-"} (NIM: ${(a as any).nim ?? "-"})`);
  });
  console.log("\n🎉 Seed selesai!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed gagal:", err);
  process.exit(1);
});
