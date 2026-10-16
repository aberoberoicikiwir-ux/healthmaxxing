import { Logo } from "./logo";

/** Logo + nama + slogan, dipakai di layar masuk dan daftar. */
export function Merek() {
  return (
    <div className="merek">
      <Logo />
      <p className="merek__nama">HEALTHMAXXING</p>
      <p className="merek__slogan">EVOLVE. TRANSFORM. ASCEND.</p>
    </div>
  );
}
