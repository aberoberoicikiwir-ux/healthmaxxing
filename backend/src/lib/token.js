/** Token login (JWT) — dibuat saat daftar/masuk, diperiksa oleh `wajibLogin`. */
const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET belum diisi di .env");
}

const MASA_BERLAKU = "7d";

function buatToken(penggunaId) {
  return jwt.sign({ sub: penggunaId }, process.env.JWT_SECRET, {
    expiresIn: MASA_BERLAKU,
  });
}

/** Balikannya id pengguna, atau null kalau token palsu / kedaluwarsa. */
function bacaToken(token) {
  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    return Number(sub);
  } catch {
    return null;
  }
}

module.exports = { buatToken, bacaToken };
