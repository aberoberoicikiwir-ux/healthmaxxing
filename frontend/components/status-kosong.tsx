import type { ReactNode } from "react";

type Props = { judul: string; keterangan?: string; children?: ReactNode };

/** Tampilan saat tidak ada data — selalu beri tahu apa yang bisa dilakukan. */
export function StatusKosong({ judul, keterangan, children }: Props) {
  return (
    <div className="status-kosong">
      <p className="status-kosong__judul">{judul}</p>
      {keterangan && <p className="teks-redup">{keterangan}</p>}
      {children}
    </div>
  );
}
