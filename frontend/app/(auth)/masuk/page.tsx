import type { Metadata } from "next";
import Link from "next/link";

import { FormMasuk } from "@/components/form-masuk";
import { Merek } from "@/components/merek";

export const metadata: Metadata = { title: "Masuk" };
export const dynamic = "force-static"; // SSG: tidak ada data dinamis

export default function MasukPage() {
  return (
    <main className="layar-auth">
      <div className="panel-auth">
        <Merek />
        <h1 className="panel-auth__judul">Welcome</h1>
        <FormMasuk />
        <p className="panel-auth__kaki">
          Don&apos;t have account?{" "}
          <Link href="/daftar" className="tautan">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
