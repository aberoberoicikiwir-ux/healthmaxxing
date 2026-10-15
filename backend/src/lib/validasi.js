/** Helper pembaca input — balikannya null kalau nilainya tidak layak dipakai. */

function bacaTeks(nilai) {
  if (typeof nilai !== "string") return null;
  return nilai.trim() || null;
}

function bacaAngka(nilai) {
  const angka = typeof nilai === "string" ? Number(nilai) : nilai;
  return typeof angka === "number" && Number.isFinite(angka) ? angka : null;
}

function bacaIdParam(nilai) {
  const id = Number(nilai);
  return Number.isInteger(id) && id > 0 ? id : null;
}

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = { bacaTeks, bacaAngka, bacaIdParam, POLA_EMAIL };
