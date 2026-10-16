import type { HTMLInputTypeAttribute, ReactNode } from "react";

export type PropsFieldInput = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: "text" | "decimal" | "email";
  ikon?: ReactNode;
  /** Elemen di sisi kanan input, misalnya tombol lihat password. */
  aksi?: ReactNode;
  varian?: "kaca" | "gelap" | "putih";
  /** Pesan error di bawah input. */
  galat?: string;
  /** Tandai merah tanpa pesan (dipakai saat login gagal). */
  tandaiGalat?: boolean;
  /** Label hanya untuk pembaca layar; placeholder yang terlihat. */
  labelTersembunyi?: boolean;
};

export function FieldInput({
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  autoComplete,
  inputMode,
  ikon,
  aksi,
  varian = "kaca",
  galat,
  tandaiGalat = false,
  labelTersembunyi = false,
}: PropsFieldInput) {
  const bermasalah = Boolean(galat) || tandaiGalat;

  return (
    <div className="field">
      <label htmlFor={name} className={labelTersembunyi ? "sr-only" : "field__label"}>
        {label}
      </label>
      <div
        className={`input-grup input-grup--${varian}`}
        data-galat={bermasalah ? "" : undefined}
      >
        {ikon}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={bermasalah}
          aria-describedby={galat ? `${name}-galat` : undefined}
        />
        {aksi}
      </div>
      {galat && (
        <p id={`${name}-galat`} className="pesan-galat">
          {galat}
        </p>
      )}
    </div>
  );
}
