const express = require("express");
const router = express.Router();
const { createDeposit } = require("../controllers/depositController");

router.post("/addDeposit", createDeposit);

module.exports = router;
