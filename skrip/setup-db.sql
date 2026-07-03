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
