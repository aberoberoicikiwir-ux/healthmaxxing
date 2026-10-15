// Muat .env paling atas, sebelum modul lain membacanya.
require("dotenv/config");
const express = require("express");
const cors = require("cors");

const {
  catatRequest,
  routeTidakAda,
  tanganiError,
} = require("./src/lib/middleware.js");
const { pasangSetError } = require("./src/lib/error.js");
const { routing } = require("./src/routes/index.js");

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/* ---------------- Middleware (urutan penting) ---------------- */

// Jeda buatan untuk melihat loading/skeleton: `npm run dev:slow`.
const LATENCY_MS = Number(process.env.LATENCY_MS) || 0;
if (LATENCY_MS > 0) {
  app.use((_req, _res, next) => setTimeout(next, LATENCY_MS));
}

app.use(cors({ origin: FRONTEND_URL }));
app.use(pasangSetError); // sebelum express.json() agar body rusak tetap bisa dibalas JSON
app.use(express.json());
app.use(catatRequest);

/* ---------------- Routes ---------------- */

app.use(routing);

// Dua penutup ini harus urut: 404 dulu, error handler paling akhir.
app.use(routeTidakAda);
app.use(tanganiError);

app.listen(PORT, () => {
  console.log(`API jalan di http://localhost:${PORT}`);
});
