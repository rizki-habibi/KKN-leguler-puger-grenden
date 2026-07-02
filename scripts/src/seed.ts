import { db, anggotaKknTable } from "@workspace/db";

const anggota = [
  {
    nama: "Rafi",
    jabatan: "Koordinator Desa",
    divisi: "Pengurus Inti",
    fotoUrl: null,
    bio: "Koordinator Desa KKN Kolaboratif 018 Desa Grenden. Bertanggung jawab atas koordinasi seluruh program dan kegiatan KKN.",
    bidangKeahlian: ["Koordinasi Tim", "Manajemen Program", "Kepemimpinan"],
    pengalaman: [],
    urutan: 1,
  },
  {
    nama: "Zulfa",
    jabatan: "Sekretaris",
    divisi: "Pengurus Inti",
    fotoUrl: null,
    bio: "Sekretaris KKN Kolaboratif 018. Mengelola administrasi, surat-menyurat, dan dokumentasi seluruh kegiatan KKN.",
    bidangKeahlian: ["Administrasi", "Pengelolaan Dokumen", "Pencatatan Notulensi"],
    pengalaman: [],
    urutan: 2,
  },
  {
    nama: "Dinda",
    jabatan: "Bendahara",
    divisi: "Pengurus Inti",
    fotoUrl: null,
    bio: "Bendahara KKN Kolaboratif 018. Mengelola keuangan, anggaran, dan laporan keuangan seluruh kegiatan KKN.",
    bidangKeahlian: ["Manajemen Keuangan", "Pembukuan", "Laporan Keuangan"],
    pengalaman: [],
    urutan: 3,
  },
  {
    nama: "Anisa",
    jabatan: "Divisi Acara",
    divisi: "Divisi Acara",
    fotoUrl: null,
    bio: "Anggota Divisi Acara KKN Kolaboratif 018. Merencanakan dan melaksanakan seluruh kegiatan dan acara KKN.",
    bidangKeahlian: ["Perencanaan Acara", "Koordinasi Kegiatan", "Manajemen Waktu"],
    pengalaman: [],
    urutan: 4,
  },
  {
    nama: "Fita",
    jabatan: "Divisi Acara",
    divisi: "Divisi Acara",
    fotoUrl: null,
    bio: "Anggota Divisi Acara KKN Kolaboratif 018. Merencanakan dan melaksanakan seluruh kegiatan dan acara KKN.",
    bidangKeahlian: ["Perencanaan Acara", "Dekorasi", "Koordinasi Teknis"],
    pengalaman: [],
    urutan: 5,
  },
  {
    nama: "Rizky",
    jabatan: "Divisi Humas",
    divisi: "Divisi Humas",
    fotoUrl: null,
    bio: "Anggota Divisi Humas KKN Kolaboratif 018. Berpengalaman dalam analisis kebutuhan, pelaporan, dan koordinasi. Pernah magang di SMAN 2 Jember selama 4 bulan sebagai staf Tata Usaha.",
    bidangKeahlian: [
      "Pembuatan Analisis Kebutuhan",
      "Pelaporan",
      "Koordinasi",
      "Pelayanan Administrasi",
    ],
    pengalaman: [
      {
        institusi: "SMAN 2 Jember",
        posisi: "Staf Tata Usaha",
        durasi: "4 bulan",
        deskripsi:
          "Magang Berdampak sebagai pembantu melayani dan koordinasi administrasi sekolah di bagian Tata Usaha.",
      },
    ],
    urutan: 6,
  },
  {
    nama: "Lulu",
    jabatan: "Divisi Humas",
    divisi: "Divisi Humas",
    fotoUrl: null,
    bio: "Anggota Divisi Humas KKN Kolaboratif 018. Mengelola hubungan masyarakat dan komunikasi publik kegiatan KKN.",
    bidangKeahlian: ["Hubungan Masyarakat", "Komunikasi Publik", "Media Sosial"],
    pengalaman: [],
    urutan: 7,
  },
  {
    nama: "Maliki",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    fotoUrl: null,
    bio: "Anggota Divisi Publikasi, Dekorasi, dan Dokumentasi (PDD) KKN Kolaboratif 018.",
    bidangKeahlian: ["Fotografi", "Desain Grafis", "Publikasi"],
    pengalaman: [],
    urutan: 8,
  },
  {
    nama: "Rehan",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    fotoUrl: null,
    bio: "Anggota Divisi PDD KKN Kolaboratif 018. Bertanggung jawab atas dokumentasi foto dan video kegiatan.",
    bidangKeahlian: ["Videografi", "Editing Video", "Dokumentasi"],
    pengalaman: [],
    urutan: 9,
  },
  {
    nama: "Syerli",
    jabatan: "Divisi PDD",
    divisi: "Divisi PDD",
    fotoUrl: null,
    bio: "Anggota Divisi PDD KKN Kolaboratif 018. Mengelola konten media sosial dan publikasi kegiatan KKN.",
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
    console.log(`   [${a.id}] ${a.nama} — ${a.jabatan} (${a.divisi})`);
  });

  console.log("\n🎉 Seed selesai!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed gagal:", err);
  process.exit(1);
});
