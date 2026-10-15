/**
 * Helper error — menambahkan `res.setError(pesan, statusCode)` ke setiap response.
 *
 * Dengan ini semua balasan error punya bentuk yang sama, `{ message }`,
 * tanpa harus menulis `res.status(...).json({ message: ... })` berulang kali:
 *
 *   return res.setError("Nama user wajib diisi", 400);
 *
 * Caranya: middleware di bawah ini menempelkan fungsi `setError` ke objek
 * `res` sebelum request sampai ke route. Karena `res` yang sama diteruskan
 * sampai ujung, controller dan error handler bisa langsung memakainya.
 *
 * Pakai `return` di depannya, supaya kode setelahnya tidak ikut jalan dan
 * mencoba mengirim response kedua kali.
 */
function pasangSetError(_req, res, next) {
  res.setError = (message, statusCode = 500) =>
    res.status(statusCode).json({ message });

  next();
}

module.exports = {
  pasangSetError,
};
