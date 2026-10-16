"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

import { FieldInput, type PropsFieldInput } from "./field-input";

type Props = Omit<PropsFieldInput, "type" | "ikon" | "aksi">;

/** Input password dengan tombol mata untuk menampilkan / menyembunyikan isinya. */
export function FieldPassword(props: Props) {
  const [tampil, setTampil] = useState(false);

  return (
    <FieldInput
      {...props}
      type={tampil ? "text" : "password"}
      ikon={<Lock size={18} aria-hidden />}
      aksi={
        <button
          type="button"
          className="tombol-ikon"
          onClick={() => setTampil((nilai) => !nilai)}
          aria-label={tampil ? "Sembunyikan password" : "Tampilkan password"}
        >
          {tampil ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
        </button>
      }
    />
  );
}
