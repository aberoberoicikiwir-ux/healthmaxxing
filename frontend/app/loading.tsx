export default function Loading() {
  return (
    <main className="cangkang-app" aria-busy="true" aria-label="Memuat halaman">
      <div className="isi-app">
        <div className="skeleton skeleton--teks" />
        <div className="skeleton skeleton--kartu" />
        <div className="skeleton skeleton--kartu" />
        <div className="skeleton skeleton--kartu" />
      </div>
    </main>
  );
}
