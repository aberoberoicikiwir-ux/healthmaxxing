/** Model pengguna — satu-satunya tempat SQL untuk tabel `pengguna`. */
const { pool } = require("../lib/db.js");

const KOLOM_PUBLIK = `id, nama, email, berat_badan AS beratBadan, target, alergi`;

async function cariByEmail(email) {
  const [baris] = await pool.query(
    "SELECT id, password_hash AS passwordHash FROM pengguna WHERE email = ?",
    [email],
  );
  return baris ?? null;
}

async function cariById(id) {
  const [baris] = await pool.query(
    `SELECT ${KOLOM_PUBLIK} FROM pengguna WHERE id = ?`,
    [id],
  );
  return baris ?? null;
}

async function tambah({ nama, email, passwordHash }) {
  const hasil = await pool.query(
    "INSERT INTO pengguna (nama, email, password_hash) VALUES (?, ?, ?)",
    [nama, email, passwordHash],
  );
  return cariById(hasil.insertId);
}

async function ubahDataKesehatan(id, { beratBadan, target, alergi }) {
  await pool.query(
    "UPDATE pengguna SET berat_badan = ?, target = ?, alergi = ? WHERE id = ?",
    [beratBadan, target, alergi, id],
  );
  return cariById(id);
}

module.exports = { cariByEmail, cariById, tambah, ubahDataKesehatan };
