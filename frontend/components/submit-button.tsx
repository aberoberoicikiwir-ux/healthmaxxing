"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  labelProses: string;
  varian?: "masuk" | "primer" | "bahaya";
};

/** Tombol kirim: otomatis nonaktif dan berganti teks selama form diproses. */
export function SubmitButton({ label, labelProses, varian = "primer" }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={`tombol tombol--${varian}`} disabled={pending}>
      {pending ? labelProses : label}
    </button>
  );
}
