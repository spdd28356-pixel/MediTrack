const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { getDashboard, getToday, getHistory} = require("../controllers/dashboard.controller");

router.get("/", protect, getDashboard);
router.get("/today", protect, getToday);
router.get("/history", protect, getHistory);


module.exports = router;