/**
 * Koneksi database — satu pool MariaDB dipakai bersama seluruh aplikasi.
 * Setelan dibaca dari .env (lihat .env.example), bukan ditulis di kode.
 */
require("dotenv/config");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
  // Tanpa tiga opsi ini driver mengembalikan BigInt / string untuk insertId,
  // COUNT(), dan DECIMAL — dan res.json() gagal men-serialize BigInt.
  insertIdAsNumber: true,
  bigIntAsNumber: true,
  decimalAsNumber: true,
});

async function cekKoneksi() {
  const [row] = await pool.query("SELECT VERSION() AS versi, DATABASE() AS db");
  return row;
}

module.exports = { pool, cekKoneksi };
