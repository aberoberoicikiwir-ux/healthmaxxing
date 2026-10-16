export type Pengguna = {
  id: number;
  nama: string;
  email: string;
  beratBadan: number | null;
  target: string | null;
  alergi: string | null;
};

export type SesiMasuk = {
  token: string;
  pengguna: Pengguna;
};

export type Latihan = {
  id: number;
  nama: string;
  jumlahSet: number;
  jumlahRepetisi: number;
  manfaat: string;
  selesai: boolean;
};

export type RiwayatLatihan = {
  id: number;
  tanggal: string; // "YYYY-MM-DD"
  nama: string;
  jumlahSet: number;
  jumlahRepetisi: number;
};

export type Makanan = {
  id: number;
  waktuMakan: string;
  nama: string;
  deskripsi: string;
};

/** Hasil Server Action untuk form: pesan umum, galat per field, dan isian yang dikirim. */
export type StatusForm = {
  pesan?: string;
  galat?: Record<string, string>;
  nilai?: Record<string, string>;
};

/** Hasil Server Action yang dipanggil dari tombol (bukan form). */
export type HasilAksi = {
  ok: boolean;
  pesan?: string;
};
