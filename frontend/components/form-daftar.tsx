"use client";

import { Mail, User } from "lucide-react";
import { useActionState } from "react";

import { daftarAction } from "@/app/actions";
import type { StatusForm } from "@/types";

import { FieldInput } from "./field-input";
import { FieldPassword } from "./field-password";
import { SubmitButton } from "./submit-button";

const STATUS_AWAL: StatusForm = {};

export function FormDaftar() {
  const [status, aksi] = useActionState(daftarAction, STATUS_AWAL);

  return (
    <form action={aksi} className="form" noValidate>
      <FieldInput
        name="nama"
        label="Full Name"
        placeholder="Full Name"
        autoComplete="name"
        varian="gelap"
        ikon={<User size={18} aria-hidden />}
        defaultValue={status.nilai?.nama}
        galat={status.galat?.nama}
        labelTersembunyi
      />
      <FieldInput
        name="email"
        label="Email Address"
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        varian="gelap"
        ikon={<Mail size={18} aria-hidden />}
        defaultValue={status.nilai?.email}
        galat={status.galat?.email}
        labelTersembunyi
      />
      <FieldPassword
        name="password"
        label="Password"
        placeholder="Password"
        autoComplete="new-password"
        varian="gelap"
        galat={status.galat?.password}
        labelTersembunyi
      />
      <FieldPassword
        name="konfirmasi"
        label="Confirm Password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        varian="gelap"
        galat={status.galat?.konfirmasi}
        labelTersembunyi
      />
      {status.pesan && (
        <p role="alert" className="pesan-galat pesan-galat--form">
          {status.pesan}
        </p>
      )}
      <SubmitButton label="Sign Up" labelProses="Mendaftarkan…" />
    </form>
  );
}
