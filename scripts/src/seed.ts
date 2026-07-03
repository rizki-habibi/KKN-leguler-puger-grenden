import { db, anggotaKknTable } from "@workspace/db";

const anggota = [
  {
    nama: "Rafi Afandi",
    jabatan: "Koordinator Desa",
    divisi: "Pengurus Inti",
    fotoUrl: "/foto/rafi.png",
    bio: "Koordinator Desa KKN Reguler ITS Mandala Jember di Desa Grenden. Bertanggung jawab atas koordinasi seluruh program dan kegiatan KKN, memimpin tim, dan menjadi penghubung antara mahasiswa KKN dengan pemerintah desa.",
    bidangKeahlian: ["Koordinasi Tim", "Manajemen Program", "Kepemimpinan", "Komunikasi Organisasi"],
    pengalaman: [],
    urutan: 1,
  },
  {
    nama: "Zulfa Aliyah Faurina",
    jabatan: "Sekretaris",
    divisi: "Pengurus Inti",
    fotoUrl: "/foto/zulfa.png",
    bio: "Sekretaris KKN Reguler ITS Mandala Jember di Desa Grenden. Mengelola administrasi, surat-menyurat, notulensi rapat, dan dokumentasi seluruh kegiatan KKN. Mahasiswi Manajemen angkatan 2023.",
    bidangKeahlian: ["Administrasi", "Pengelolaan Dokumen", "Pencatatan Notulensi", "Koordinasi Jadwal"],
    pengalaman: [],
    urutan: 2,
  },
  {
    nama: "Afda Adinda Trias Cahya Neng Gelis",
    jabatan: "Bendahara",
    divisi: "Pengurus Inti",
    fotoUrl: "/foto/adinda.jpg",
    bio: "Bendahara KKN Reguler ITS Mandala Jember di Desa Grenden. Mengelola keuangan, anggaran kegiatan, dan laporan keuangan seluruh program KKN. Mahasiswi Akuntansi angkatan 2023.",
    bidangKeahlian: ["Manajemen Keuangan", "Pembukuan", "Laporan Keuangan", "Perencanaan Anggaran"],
    pengalaman: [],
    urutan: 3,
  },
  {
    nama: "Syerli Amelia Putri",
    jabatan: "Divisi Acara",
    divisi: "Divisi Acara",
    fotoUrl: "/foto/syerli.png",
    bio: "Anggota Divisi Acara KKN Reguler ITS Mandala Jember. Merencanakan, mengkoordinasikan, dan melaksanakan seluruh kegiatan dan acara KKN di Desa Grenden. Mahasiswi Ekonomi Pembangunan angkatan 2023.",
    bidangKeahlian: ["Perencanaan Acara", "Koordinasi Kegiatan", "Manajemen Waktu", "Event Organizer"],
    pengalaman: [],
    urutan: 4,
  },
  {
    nama: "Fita Dela Putri Sari Dewi",
    jabatan: "Divisi Acara",
    divisi: "Divisi Acara",
    fotoUrl: "/foto/fita.png",
    bio: "Anggota Divisi Acara KKN Reguler ITS Mandala Jember. Merencanakan dan melaksanakan seluruh kegiatan KKN serta bertugas dalam koordinasi teknis dan dekorasi. Mahasiswi Manajemen angkatan 2023.",
    bidangKeahlian: ["Perencanaan Acara", "Dekorasi", "Koordinasi Teknis", "Kepanitiaan"],
    pengalaman: [],
    urutan: 5,
  },
  {
    nama: "Rizki Habibi",
    jabatan: "Divisi Humas",
    divisi: "Divisi Humas",
    fotoUrl: "/foto/rizki.jpg",
    bio: "Anggota Divisi Humas KKN Reguler ITS Mandala Jember. Berpengalaman dalam analisis kebutuhan, pelaporan, dan koordinasi administrasi. Pernah magang di SMAN 2 Jember selama 4 bulan sebagai Staf Tata Usaha. Mahasiswa Sistem dan Teknologi Informasi angkatan 2023.",
    bidangKeahlian: [
      "Pembuatan Analisis Kebutuhan",
      "Pelaporan",
      "Koordinasi",
      "Pelayanan Administrasi",
      "Teknologi Informasi",
    ],
    pengalaman: [
      {
        institusi: "SMAN 2 Jember",
        posisi: "Staf Tata Usaha",
        durasi: "4 bulan",
        deskripsi:
          "Magang Berdampak sebagai pembantu melayani dan koordinasi administrasi sekolah di bagian Tata Usaha SMAN 2 Jember.",
      },
    ],
    urutan: 6,
  },
  {
    nama: "Lu'lu' Iindallah Sari",
    jabatan: "Divisi Humas",
    divisi: "Divisi Humas",
    fotoUrl: "/foto/lulu.png",
    bio: "Anggota Divisi Humas KKN Reguler ITS Mandala Jember. Mengelola hubungan masyarakat, komunikasi publik, dan publikasi kegiatan KKN di Desa Grenden. Mahasiswi Manajemen angkatan 2023.",
    bidangKeahlian: ["Hubungan Masyarakat", "Komunikasi Publik", "Media Sosial", "Publikasi"],
    pengalaman: [],
    urutan: 7,
  },
  {
    nama: "Maliki Septa Pratama",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    fotoUrl: "/foto/maliki.png",
    bio: "Anggota Divisi Publikasi, Dekorasi, dan Dokumentasi (PDD) KKN Reguler ITS Mandala Jember. Bertanggung jawab atas desain publikasi dan fotografi kegiatan KKN. Mahasiswa Ekonomi Pembangunan angkatan 2023.",
    bidangKeahlian: ["Fotografi", "Desain Grafis", "Publikasi", "Dekorasi"],
    pengalaman: [],
    urutan: 8,
  },
  {
    nama: "Reyhan Saputra",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    fotoUrl: "/foto/reyhan.png",
    bio: "Anggota Divisi PDD KKN Reguler ITS Mandala Jember. Bertanggung jawab atas dokumentasi foto dan video seluruh kegiatan KKN. Mahasiswa Ekonomi Pembangunan angkatan 2022.",
    bidangKeahlian: ["Videografi", "Editing Video", "Dokumentasi", "Fotografi"],
    pengalaman: [],
    urutan: 9,
  },
  {
    nama: "Anis Suntoni",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    fotoUrl: "/foto/anis.png",
    bio: "Anggota Divisi PDD KKN Reguler ITS Mandala Jember. Mengelola konten media sosial dan publikasi kegiatan KKN. Mahasiswi Manajemen angkatan 2023.",
    bidangKeahlian: ["Konten Kreatif", "Media Sosial", "Desain Publikasi", "Fotografi"],
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
    console.log(`   [${a.id}] ${a.nama} — ${a.jabatan} (${a.divisi})`);
  });
  console.log("\n🎉 Seed selesai!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed gagal:", err);
  process.exit(1);
});
