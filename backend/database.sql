-- Jalankan sekali:  mysql -u root -p < database.sql
CREATE DATABASE IF NOT EXISTS healthmaxxing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE healthmaxxing;

DROP TABLE IF EXISTS riwayat_latihan;
DROP TABLE IF EXISTS latihan;
DROP TABLE IF EXISTS makanan;
DROP TABLE IF EXISTS pengguna;

CREATE TABLE pengguna (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  berat_badan   DECIMAL(5,2)  NULL,
  target        VARCHAR(100)  NULL,
  alergi        VARCHAR(150)  NULL,
  dibuat_pada   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE latihan (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama             VARCHAR(100) NOT NULL,
  jumlah_set       TINYINT UNSIGNED NOT NULL,
  jumlah_repetisi  TINYINT UNSIGNED NOT NULL,
  manfaat          TEXT NOT NULL
);

-- Satu baris = satu latihan yang diselesaikan seorang pengguna pada satu hari.
-- UNIQUE mencegah latihan yang sama ditandai selesai dua kali di hari yang sama.
CREATE TABLE riwayat_latihan (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  pengguna_id  INT UNSIGNED NOT NULL,
  latihan_id   INT UNSIGNED NOT NULL,
  tanggal      DATE NOT NULL,
  UNIQUE KEY uniq_pengguna_latihan_tanggal (pengguna_id, latihan_id, tanggal),
  FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
  FOREIGN KEY (latihan_id)  REFERENCES latihan(id)   ON DELETE CASCADE
);

CREATE TABLE makanan (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  waktu_makan VARCHAR(30)  NOT NULL,
  nama        VARCHAR(100) NOT NULL,
  deskripsi   VARCHAR(255) NOT NULL
);

INSERT INTO latihan (nama, jumlah_set, jumlah_repetisi, manfaat) VALUES
  ('Push Up', 3, 15, 'Melatih otot dada, bahu, dan trisep. Jaga tubuh tetap lurus dari kepala sampai tumit selama gerakan.'),
  ('Squat',   3, 20, 'Melatih otot paha, bokong, dan inti tubuh. Turunkan pinggul seperti duduk, punggung tetap tegak.'),
  ('Plank',   3, 15, 'Melatih otot perut, punggung, dan bahu. Tahan posisi tubuh lurus tanpa menurunkan pinggul.');

INSERT INTO makanan (waktu_makan, nama, deskripsi) VALUES
  ('Sarapan',      'Break Fast', 'Oatmeal dengan pisang dan sepotong telur rebus, sekitar 350 kkal.'),
  ('Makan siang',  'Lunch',      'Dada ayam panggang, nasi merah, dan sayur kukus, sekitar 550 kkal.'),
  ('Makan malam',  'Dinner',     'Ikan bakar dengan salad sayur dan kentang rebus, sekitar 450 kkal.');
