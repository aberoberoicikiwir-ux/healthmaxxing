import Image from "next/image";

type Props = { ukuran?: "besar" | "kecil" };

/** Ganti public/logo.svg dengan logo asli dari Figma (export sebagai SVG). */
export function Logo({ ukuran = "besar" }: Props) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo HealthMaxxing"
      width={120}
      height={140}
      className={`logo logo--${ukuran}`}
      priority
    />
  );
}
