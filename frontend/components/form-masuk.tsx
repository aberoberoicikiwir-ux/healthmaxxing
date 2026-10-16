"use client";

import { Mail } from "lucide-react";
import { useActionState } from "react";

import { masukAction } from "@/app/actions";
import type { StatusForm } from "@/types";

import { FieldInput } from "./field-input";
import { FieldPassword } from "./field-password";
import { SubmitButton } from "./submit-button";

const STATUS_AWAL: StatusForm = {};

export function FormMasuk() {
  const [status, aksi] = useActionState(masukAction, STATUS_AWAL);
  // Login ditolak server: kedua input ditandai merah seperti desain "login error".
  const ditolak = Boolean(status.pesan);

  return (
    <form action={aksi} className="form" noValidate>
      <FieldInput
        name="email"
        label="Email"
        type="email"
        placeholder="Email..."
        autoComplete="email"
        ikon={<Mail size={18} aria-hidden />}
        defaultValue={status.nilai?.email}
        galat={status.galat?.email}
        tandaiGalat={ditolak}
        labelTersembunyi
      />
      <FieldPassword
        name="password"
        label="Password"
        placeholder="Password..."
        autoComplete="current-password"
        galat={status.galat?.password}
        tandaiGalat={ditolak}
        labelTersembunyi
      />
      {status.pesan && (
        <p role="alert" className="pesan-galat pesan-galat--form">
          {status.pesan}
        </p>
      )}
      <SubmitButton label="LOG IN" labelProses="Memproses…" varian="masuk" />
    </form>
  );
}
