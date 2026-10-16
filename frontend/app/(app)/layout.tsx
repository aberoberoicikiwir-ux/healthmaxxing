import type { ReactNode } from "react";

import { BottomNav } from "@/components/bottom-nav";

/**
 * Kerangka halaman setelah login. Layout ini sengaja TIDAK memeriksa login:
 * layout tidak dirender ulang saat pindah halaman, jadi pemeriksaan ada di
 * tiap page lewat `panggilApi({ butuhLogin: true })`.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cangkang-app">
      <BottomNav />
      <main className="isi-app">{children}</main>
    </div>
  );
}
