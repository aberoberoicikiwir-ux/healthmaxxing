/**
 * Tes koneksi database: `npm run db:test`.
 *
 * Membuka pool, menjalankan satu query ringan, lalu menutup pool supaya
 * proses Node bisa selesai (pool yang masih terbuka membuat proses menggantung).
 */

const { pool, cekKoneksi } = require("../src/lib/db.js");

async function main() {
  try {
    const { versi, db } = await cekKoneksi();
    console.log(`Koneksi OK — MariaDB ${versi}, database: ${db}`);
  } catch (error) {
    console.error("Koneksi GAGAL:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
