const express = require("express");
const { daftar, masuk } = require("../controller/auth.js");

const router = express.Router();

router.post("/daftar", daftar);
router.post("/masuk", masuk);

module.exports = router;
