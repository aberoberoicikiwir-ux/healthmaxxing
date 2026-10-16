"use client";

import { TriangleAlert } from "lucide-react";

import { StatusKosong } from "@/components/status-kosong";

/** Menangkap error render di halaman di bawahnya (misalnya API Express mati). */
export default function GalatHalaman({ reset }: { reset: () => void }) {
  return (
    <main className="layar-auth">
      <StatusKosong
        judul="Data belum bisa dimuat"
        keterangan="Pastikan server API menyala, lalu coba lagi."
      >
        <TriangleAlert size={28} aria-hidden />
        <button type="button" className="tombol tombol--primer" onClick={reset}>
          Coba lagi
        </button>
      </StatusKosong>
    </main>
  );
}
