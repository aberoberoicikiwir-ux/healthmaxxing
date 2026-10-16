import "server-only";
import { cache } from "react";
import { GalatApi, panggilApi } from "./api";
import type { Latihan, RiwayatLatihan } from "@/types";

export function ambilDaftarLatihan() {
  return panggilApi<Latihan[]>("/latihan", { butuhLogin: true });
}

/**
 * Balikannya null kalau latihan tidak ada, supaya halaman bisa memanggil
 * `notFound()`. `cache()` membuat page dan generateMetadata berbagi satu hasil.
 */
export const ambilLatihan = cache(async (id: string): Promise<Latihan | null> => {
  try {
    return await panggilApi<Latihan>(`/latihan/${id}`, { butuhLogin: true });
  } catch (error) {
    if (error instanceof GalatApi && [400, 404].includes(error.status)) {
      return null;
    }
    throw error;
  }
});

export function tandaiSelesai(id: number) {
  return panggilApi(`/latihan/${id}/selesai`, {
    method: "POST",
    butuhLogin: true,
  });
}

export function batalkanSelesai(id: number) {
  return panggilApi(`/latihan/${id}/selesai`, {
    method: "DELETE",
    butuhLogin: true,
  });
}

export function ambilRiwayatLatihan() {
  return panggilApi<RiwayatLatihan[]>("/progres", { butuhLogin: true });
}
