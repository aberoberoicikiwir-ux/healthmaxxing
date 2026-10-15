/** Controller auth — daftar akun dan masuk. */
const bcrypt = require("bcryptjs");

const Pengguna = require("../model/pengguna.js");
const { buatToken } = require("../lib/token.js");
const { bacaTeks, POLA_EMAIL } = require("../lib/validasi.js");

const PANJANG_PASSWORD_MIN = 6;

/** POST /auth/daftar — body: { nama, email, password } */
async function daftar(req, res, next) {
  const nama = bacaTeks(req.body?.nama);
  const email = bacaTeks(req.body?.email)?.toLowerCase();
  const password = req.body?.password;

  if (!nama || nama.length < 2) {
    return res.setError("Nama lengkap minimal 2 karakter", 400);
  }
  if (!email || !POLA_EMAIL.test(email)) {
    return res.setError("Format email tidak valid", 400);
  }
  if (typeof password !== "string" || password.length < PANJANG_PASSWORD_MIN) {
    return res.setError(
      `Password minimal ${PANJANG_PASSWORD_MIN} karakter`,
      400,
    );
  }

  try {
    if (await Pengguna.cariByEmail(email)) {
      return res.setError("Email sudah terdaftar", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const pengguna = await Pengguna.tambah({ nama, email, passwordHash });

    res
      .status(201)
      .json({ data: { token: buatToken(pengguna.id), pengguna } });
  } catch (error) {
    // Dua request daftar bersamaan bisa lolos pengecekan di atas.
    if (error.code === "ER_DUP_ENTRY") {
      return res.setError("Email sudah terdaftar", 409);
    }
    next(error);
  }
}

/** POST /auth/masuk — body: { email, password } */
async function masuk(req, res, next) {
  const email = bacaTeks(req.body?.email)?.toLowerCase();
  const password = req.body?.password;

  if (!email || typeof password !== "string" || !password) {
    return res.setError("Email dan password wajib diisi", 400);
  }

  try {
    const akun = await Pengguna.cariByEmail(email);
    const cocok = akun && (await bcrypt.compare(password, akun.passwordHash));

    // Pesan sengaja sama untuk "email tak ada" dan "password salah",
    // supaya orang luar tidak bisa menebak email mana yang terdaftar.
    if (!cocok) {
      return res.setError("Email atau password salah", 401);
    }

    const pengguna = await Pengguna.cariById(akun.id);
    res.json({ data: { token: buatToken(akun.id), pengguna } });
  } catch (error) {
    next(error);
  }
}

module.exports = { daftar, masuk };
