import Link from "next/link";

import { StatusKosong } from "@/components/status-kosong";

export default function NotFound() {
  return (
    <main className="layar-auth">
      <StatusKosong
        judul="Halaman tidak ditemukan"
        keterangan="Alamatnya mungkin salah, atau datanya sudah tidak ada."
      >
        <Link href="/" className="tombol tombol--primer">
          Kembali ke beranda
        </Link>
      </StatusKosong>
    </main>
  );
}
