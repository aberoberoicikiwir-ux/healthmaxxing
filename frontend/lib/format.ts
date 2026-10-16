/** "2026-10-15" -> "15 Oktober 2026". Diparse sebagai UTC agar tanggal tidak bergeser. */
export function formatTanggal(tanggalIso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(tanggalIso));
}
