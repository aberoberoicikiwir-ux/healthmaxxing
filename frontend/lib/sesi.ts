import "server-only";
import { cookies } from "next/headers";

const NAMA_COOKIE = "token";
const MASA_BERLAKU_DETIK = 60 * 60 * 24 * 7;

export async function ambilToken() {
  return (await cookies()).get(NAMA_COOKIE)?.value;
}

/** httpOnly: token tidak bisa dibaca JavaScript di browser, jadi aman dari XSS. */
export async function simpanToken(token: string) {
  (await cookies()).set(NAMA_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MASA_BERLAKU_DETIK,
  });
}

export async function hapusToken() {
  (await cookies()).delete(NAMA_COOKIE);
}
