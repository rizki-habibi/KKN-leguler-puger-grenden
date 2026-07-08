-- Setup database KKN Grenden
CREATE DATABASE IF NOT EXISTS kkn_grenden CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kkn_grenden;

CREATE TABLE IF NOT EXISTS `anggota_kkn` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `divisi` varchar(255) NOT NULL,
  `nim` varchar(50) DEFAULT NULL,
  `program_studi` varchar(255) DEFAULT NULL,
  `foto_url` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `bidang_keahlian` json DEFAULT NULL,
  `pengalaman` json DEFAULT NULL,
  `urutan` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data anggota KKN
INSERT INTO `anggota_kkn` (`nama`, `jabatan`, `divisi`, `nim`, `program_studi`, `foto_url`, `bio`, `bidang_keahlian`, `urutan`) VALUES
('Rafi Afandi', 'Koordinator Desa', 'Pengurus Inti', '23020066', 'Ekonomi Pembangunan', '/gambar/foto-anggota/rafi-afandi-kordes.png', 'Koordinator Desa KKN Reguler ITS Mandala Jember di Desa Grenden, Kecamatan Puger, Kabupaten Jember tahun 2026.', '["Manajemen", "Kepemimpinan", "Ekonomi"]', 1),
('Zulfa Aliyah Faurina', 'Sekretaris', 'Pengurus Inti', '23030021', 'Manajemen', '/gambar/foto-anggota/zulfa-aliyah-sekretaris.png', 'Sekretaris KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Administrasi", "Manajemen", "Komunikasi"]', 2),
('Afda Adinda Trias Cahya Neng Gelis', 'Bendahara', 'Pengurus Inti', '23040022', 'Akuntansi', '/gambar/foto-anggota/afda-adinda-bendahara.jpg', 'Bendahara KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Akuntansi", "Keuangan", "Manajemen"]', 3),
('Fita Dela Putri Sari Dewi', 'Anggota Divisi Acara', 'Divisi Acara', '23030065', 'Manajemen', '/gambar/foto-anggota/fitadela-divisi-acara.png', 'Anggota Divisi Acara KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Event Organizer", "Manajemen Acara", "Kreativitas"]', 4),
('Syerli Amelia Putri', 'Anggota Divisi Acara', 'Divisi Acara', '23020065', 'Ekonomi Pembangunan', '/gambar/foto-anggota/syerli-amelia-divisi-acara.png', 'Anggota Divisi Acara KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Event Organizer", "Ekonomi", "Komunikasi Publik"]', 5),
('Rizki Habibi', 'Anggota Divisi Humas', 'Divisi Humas', '23060006', 'Sistem dan Teknologi Informasi', '/gambar/foto-anggota/rizki-habibi-divisi-humas.jpg', 'Anggota Divisi Humas KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026. Bertanggung jawab atas pengelolaan website dan media digital.', '["Teknologi Informasi", "Web Development", "Media Sosial"]', 6),
('Lu''lu'' Indallah Sari', 'Anggota Divisi Humas', 'Divisi Humas', '23030030', 'Manajemen', '/gambar/foto-anggota/lulu-indallah-divisi-humas.png', 'Anggota Divisi Humas KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Komunikasi", "Hubungan Masyarakat", "Media Sosial"]', 7),
('Anis Suntoni', 'Anggota Divisi PDD', 'Divisi PDD', '23030075', 'Manajemen', '/gambar/foto-anggota/anis-suntoni-divisi-pdd.png', 'Anggota Divisi Publikasi, Dekorasi dan Dokumentasi KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Fotografi", "Desain Grafis", "Dokumentasi"]', 8),
('Maliki Septa Pratama', 'Anggota Divisi PDD', 'Divisi PDD', '23020010', 'Ekonomi Pembangunan', '/gambar/foto-anggota/maliki-septa-divisi-pdd.png', 'Anggota Divisi Publikasi, Dekorasi dan Dokumentasi KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Videografi", "Fotografi", "Editing"]', 9),
('Reyhan Saputra', 'Anggota Divisi PDD', 'Divisi PDD', '22020068', 'Ekonomi Pembangunan', '/gambar/foto-anggota/reyhan-saputra-divisi-pdd.png', 'Anggota Divisi Publikasi, Dekorasi dan Dokumentasi KKN Reguler ITS Mandala Jember di Desa Grenden tahun 2026.', '["Desain", "Dekorasi", "Dokumentasi"]', 10);

SELECT COUNT(*) as total_anggota FROM anggota_kkn;

-- ─── Tabel Berita ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `berita` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL UNIQUE,
  `ringkasan` text DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `gambar_url` text DEFAULT NULL,
  `kategori` varchar(100) DEFAULT 'Umum',
  `diterbitkan` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Tabel Galeri ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `galeri` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar_url` text NOT NULL,
  `kategori` varchar(100) DEFAULT 'Kegiatan',
  `urutan` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Tabel Konten Sosmed ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS `konten_sosmed` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `platform` varchar(50) NOT NULL DEFAULT 'Instagram',
  `url` text NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal` varchar(20) DEFAULT NULL,
  `urutan` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Konten Sosmed
INSERT INTO `konten_sosmed` (`judul`, `platform`, `url`, `deskripsi`, `tanggal`, `urutan`) VALUES
('Observasi Awal dan Penentuan Perlengkapan KKN', 'Instagram', 'https://www.instagram.com/kkn_desagrendenpuger', 'Tim melakukan observasi awal Desa Grenden dan menentukan perlengkapan yang dibawa.', '2026-07-01', 1),
('Perkenalan Tim KKN Reguler di Desa Grenden', 'Instagram', 'https://www.instagram.com/kkn_desagrendenpuger', 'Tim KKN Reguler ITS Mandala Jember resmi memperkenalkan diri kepada perangkat dan warga Desa Grenden.', '2026-07-01', 2),
('Penyerahan Mahasiswa KKN ke Desa Grenden', 'TikTok', 'https://www.tiktok.com/@kkn_desagrendenpuger', 'Momen penyerahan resmi mahasiswa KKN kepada pemerintah Desa Grenden oleh DPL.', '2026-07-01', 3),
('Inovasi Produk Olahan Jagung Bersama PKK', 'Instagram', 'https://www.instagram.com/kkn_desagrendenpuger', 'Dokumentasi kegiatan inovasi produk olahan jagung bersama ibu-ibu PKK Desa Grenden.', '2026-07-03', 4),
('Vlog Penyaluran Bantuan Beras kepada Warga', 'TikTok', 'https://www.tiktok.com/@kkn_desagrendenpuger', 'Video dokumentasi mahasiswa KKN ikut serta dalam penyaluran bantuan beras.', '2026-07-02', 5);

-- Seed Galeri
INSERT INTO `galeri` (`judul`, `deskripsi`, `gambar_url`, `kategori`, `urutan`) VALUES
('Gotong Royong Bersama Warga', 'Kegiatan gotong royong membersihkan lingkungan desa bersama warga Grenden.', '/gambar/kegiatan/gotong-royong.png', 'Kegiatan', 1),
('Tanam Pohon di Desa Grenden', 'Program penghijauan dengan menanam pohon di area desa.', '/gambar/kegiatan/tanam-pohon.png', 'Program', 2),
('Kegiatan KKN Bersama Masyarakat', 'Dokumentasi kegiatan KKN bersama masyarakat Desa Grenden.', '/gambar/kegiatan/kegiatan-kkn-1.png', 'Kegiatan', 3),
('Presentasi Program Kerja', 'Presentasi program kerja KKN kepada perangkat desa.', '/gambar/kegiatan/kkn-presentasi.png', 'Program', 4),
('Panen Jagung Bersama Petani', 'Kegiatan pendampingan panen jagung bersama petani lokal.', '/gambar/kegiatan/kkn-jagung.png', 'Pertanian', 5),
('Bantuan Beras untuk Warga', 'Penyaluran bantuan beras kepada warga yang membutuhkan.', '/gambar/kegiatan/bantuan-beras.png', 'Sosial', 6),
('Tari Tradisional Perang Sadeng', 'Pertunjukan tari tradisional khas Desa Grenden.', '/gambar/kegiatan/tari-tradisional.png', 'Budaya', 7),
('Dokumentasi Kegiatan KKN', 'Momen-momen kegiatan KKN di Desa Grenden 2026.', '/gambar/kegiatan/kegiatan-kkn-2.png', 'Kegiatan', 8);

-- Seed Berita
INSERT INTO `berita` (`judul`, `slug`, `ringkasan`, `isi`, `kategori`, `diterbitkan`) VALUES
('KKN ITS Mandala Jember Resmi Bertugas di Desa Grenden', 'kkn-its-resmi-bertugas-grenden', 'Tim KKN Reguler ITS Mandala Jember 2026 resmi diserahkan dan mulai bertugas di Desa Grenden, Kecamatan Puger, Kabupaten Jember.', 'Tim KKN Reguler ITS Mandala Jember 2026 yang terdiri dari 10 mahasiswa dari berbagai program studi resmi diserahkan kepada pemerintah Desa Grenden. Penyerahan dilakukan oleh Dosen Pembimbing Lapangan, Bapak Faizal Abrolillah, S.Kom., M.Kom. Tim ini akan bertugas selama periode KKN untuk melaksanakan berbagai program pengabdian masyarakat.', 'KKN', 1),
('Inovasi Produk Olahan Jagung Tingkatkan Nilai Ekonomi Warga', 'inovasi-olahan-jagung-grenden', 'Mahasiswa KKN berkolaborasi dengan ibu-ibu PKK Desa Grenden untuk mengembangkan inovasi produk olahan jagung bernilai ekonomi tinggi.', 'Dalam rangka meningkatkan nilai ekonomi hasil pertanian lokal, tim KKN ITS bersama ibu-ibu PKK Desa Grenden mengadakan pelatihan pengolahan jagung menjadi berbagai produk pangan. Kegiatan ini merupakan bagian dari program pemberdayaan masyarakat berbasis Technopreneurship.', 'Pertanian', 1),
('Gotong Royong Pembersihan Lingkungan Desa Grenden', 'gotong-royong-grenden-2026', 'Mahasiswa KKN bersama warga Desa Grenden menggelar kegiatan gotong royong membersihkan lingkungan desa.', 'Kegiatan gotong royong dilaksanakan di seluruh dusun Desa Grenden dengan melibatkan mahasiswa KKN dan warga setempat. Kegiatan ini bertujuan untuk menjaga kebersihan dan keindahan desa sesuai dengan visi Grenden Bersih.', 'Sosial', 1);

-- ─── Tabel Buku Tamu ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `buku_tamu` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `jabatan_instansi` varchar(255) DEFAULT NULL,
  `no_telepon` varchar(50) DEFAULT NULL,
  `keperluan` text DEFAULT NULL,
  `tanggal_kunjungan` date NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
