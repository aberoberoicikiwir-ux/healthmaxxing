import type { Metadata } from "next";
import Link from "next/link";

import { FormDaftar } from "@/components/form-daftar";
import { Merek } from "@/components/merek";

export const metadata: Metadata = { title: "Daftar" };
export const dynamic = "force-static"; // SSG: tidak ada data dinamis

export default function DaftarPage() {
  return (
    <main className="layar-auth">
      <div className="panel-auth">
        <Merek />
        <h1 className="panel-auth__judul">Register new Account</h1>
        <FormDaftar />
        <p className="panel-auth__kaki">
          Already have an account?{" "}
          <Link href="/masuk" className="tautan">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
