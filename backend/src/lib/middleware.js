/**
 * Middleware — fungsi `(req, res, next)` yang jalan sebelum route.
 * Aturan utamanya: WAJIB memanggil `next()`, kalau tidak request menggantung.
 */
const { bacaToken } = require("./token.js");

/** Catat tiap request. Dicatat di `finish` karena status baru diketahui di sana. */
function catatRequest(req, res, next) {
  const mulai = Date.now();
  console.log(`-> ${req.method} ${req.url}`);

  res.on("finish", () => {
    console.log(
      `<- ${req.method} ${req.url} ${res.statusCode} (${Date.now() - mulai}ms)`,
    );
  });

  next();
}

/**
 * Penjaga route privat. Membaca header `Authorization: Bearer <token>`,
 * lalu menaruh id pengguna di `req.penggunaId` untuk dipakai controller.
 */
function wajibLogin(req, res, next) {
  const header = req.headers.authorization || "";
  const [skema, token] = header.split(" ");
  const penggunaId = skema === "Bearer" && token ? bacaToken(token) : null;

  if (!penggunaId) {
    return res.setError("Silakan login terlebih dahulu", 401);
  }

  req.penggunaId = penggunaId;
  next();
}

/** Route tak dikenal -> JSON (bukan HTML default Express). Dipasang sesudah semua route. */
function routeTidakAda(req, res) {
  res.setError(`Route ${req.method} ${req.url} tidak ada`, 404);
}

/**
 * Error handler terakhir. WAJIB 4 parameter — itu yang dipakai Express untuk
 * mengenalinya. Error tak terduga dibalas 500 tanpa membocorkan detailnya.
 */
function tanganiError(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err);
    return res.setError("Terjadi kesalahan di server", statusCode);
  }

  res.setError(err.message, statusCode);
}

module.exports = { catatRequest, wajibLogin, routeTidakAda, tanganiError };
