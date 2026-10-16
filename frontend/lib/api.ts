import "server-only";
import { redirect } from "next/navigation";
import { ambilToken } from "./sesi";

const URL_API = process.env.API_URL ?? "http://localhost:4000";

/** Error dari API Express, membawa status HTTP-nya supaya pemanggil bisa memilah. */
export class GalatApi extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "GalatApi";
  }
}

type OpsiPanggil = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Kirim token dari cookie; tanpa token pengguna diarahkan ke /masuk. */
  butuhLogin?: boolean;
  /** Detik cache (ISR). Kosong = selalu ambil data baru. */
  revalidate?: number;
};

/**
 * Satu-satunya pintu keluar ke API Express.
 * `fetch` tidak throw untuk status 4xx/5xx, jadi `res.ok` dicek di sini.
 */
export async function panggilApi<T>(
  path: string,
  { method = "GET", body, butuhLogin = false, revalidate }: OpsiPanggil = {},
): Promise<T> {
  const headers: Record<string, string> = {};

  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (butuhLogin) {
    const token = await ambilToken();
    if (!token) redirect("/masuk");
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${URL_API}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    ...(revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401 && butuhLogin) redirect("/masuk");
    throw new GalatApi(
      json?.message ?? "Terjadi kesalahan pada server",
      res.status,
    );
  }

  return json.data as T;
}
