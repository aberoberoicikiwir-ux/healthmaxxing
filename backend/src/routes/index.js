const express = require("express");
const authRoutes = require("./auth.js");

const routing = express.Router();

routing.get("/health", (_req, res) => res.json({ ok: true }));
routing.use("/auth", authRoutes);

module.exports = { routing };
