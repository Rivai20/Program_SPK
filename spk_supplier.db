CREATE DATABASE spk_supplier;
USE spk_supplier;

CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kode VARCHAR(10) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  harga DECIMAL(12,2) NOT NULL,
  cacat DECIMAL(5,2) NOT NULL,
  waktu DECIMAL(5,2) NOT NULL,
  jarak DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kriteria (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kode VARCHAR(10) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  sifat ENUM('cost', 'benefit') NOT NULL,
  bobot_saw INT DEFAULT 0,
  bobot_smart INT DEFAULT 0
);

INSERT INTO kriteria (kode, nama, sifat, bobot_saw, bobot_smart) VALUES
('C1', 'Harga (Rp/unit)', 'cost', 25, 40),
('C2', 'Tingkat Cacat (%)', 'cost', 30, 30),
('C3', 'Ketepatan Waktu (%)', 'benefit', 25, 20),
('C4', 'Jarak Distribusi (km)', 'cost', 20, 10);

INSERT INTO suppliers (kode, nama, harga, cacat, waktu, jarak) VALUES
('S1', 'PT Maju Jaya', 50000, 1.5, 98, 30),
('S2', 'CV Sejahtera', 45000, 2.5, 92, 45),
('S3', 'UD Makmur', 55000, 1.0, 96, 25),
('S4', 'PT Cepat Kirim', 48000, 2.0, 97, 50),
('S5', 'CV Sumber Rejeki', 52000, 1.8, 94, 35);
