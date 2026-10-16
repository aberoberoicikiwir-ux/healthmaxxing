"use server";

import { redirect } from "next/navigation";

import { GalatApi } from "@/lib/api";
import { daftarAkun, masukAkun } from "@/lib/pengguna";
import { simpanToken } from "@/lib/sesi";
import type { StatusForm } from "@/types";

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 6;

function bacaTeks(formData: FormData, nama: string) {
  return String(formData.get(nama) ?? "").trim();
}

export async function masukAction(
  _sebelumnya: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const email = bacaTeks(formData, "email");
  const password = String(formData.get("password") ?? "");

  const galat: Record<string, string> = {};
  if (!email) galat.email = "Email wajib diisi";
  if (!password) galat.password = "Password wajib diisi";
  if (Object.keys(galat).length > 0) return { galat, nilai: { email } };

  try {
    const sesi = await masukAkun({ email, password });
    await simpanToken(sesi.token);
  } catch (error) {
    if (error instanceof GalatApi) {
      return { pesan: error.message, nilai: { email } };
    }
    throw error;
  }

  redirect("/");
}

export async function daftarAction(
  _sebelumnya: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const nama = bacaTeks(formData, "nama");
  const email = bacaTeks(formData, "email");
  const password = String(formData.get("password") ?? "");
  const konfirmasi = String(formData.get("konfirmasi") ?? "");
  const nilai = { nama, email };

  const galat: Record<string, string> = {};
  if (nama.length < 2) galat.nama = "Nama lengkap minimal 2 karakter";
  if (!POLA_EMAIL.test(email)) galat.email = "Format email tidak valid";
  if (password.length < PASSWORD_MIN) {
    galat.password = `Password minimal ${PASSWORD_MIN} karakter`;
  }
  if (konfirmasi !== password) galat.konfirmasi = "Konfirmasi password tidak sama";
  if (Object.keys(galat).length > 0) return { galat, nilai };

  try {
    const sesi = await daftarAkun({ nama, email, password });
    await simpanToken(sesi.token);
  } catch (error) {
    if (error instanceof GalatApi) {
      return error.status === 409
        ? { galat: { email: error.message }, nilai }
        : { pesan: error.message, nilai };
    }
    throw error;
  }

  redirect("/data-kesehatan");
}
