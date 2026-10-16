import "server-only";
import { panggilApi } from "./api";
import type { Makanan } from "@/types";

const DETIK_CACHE = 3600;

/** Rencana makan jarang berubah, jadi di-cache 1 jam (ISR). */
export function ambilDaftarMakanan() {
  return panggilApi<Makanan[]>("/makanan", { revalidate: DETIK_CACHE });
}
