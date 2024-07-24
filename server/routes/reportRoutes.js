const express = require("express");
const { getWeeklyData } = require("../controllers/reportController");
const router = express.Router();

router.get("/weekly-data", getWeeklyData);

module.exports = router;
