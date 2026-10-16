import "server-only";
import { panggilApi } from "./api";
import type { Pengguna, SesiMasuk } from "@/types";

export function daftarAkun(data: {
  nama: string;
  email: string;
  password: string;
}) {
  return panggilApi<SesiMasuk>("/auth/daftar", { method: "POST", body: data });
}

export function masukAkun(data: { email: string; password: string }) {
  return panggilApi<SesiMasuk>("/auth/masuk", { method: "POST", body: data });
}

export function ambilProfil() {
  return panggilApi<Pengguna>("/profil", { butuhLogin: true });
}

export function simpanDataKesehatan(data: {
  beratBadan: number;
  target: string;
  alergi: string;
}) {
  return panggilApi<Pengguna>("/profil", {
    method: "PUT",
    body: data,
    butuhLogin: true,
  });
}
