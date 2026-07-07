const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const {
    markMedicineAsTaken,
    markMedicineAsMissed,
} = require("../controllers/medicineLog.controller");
console.log("Medicine Log Routes Loaded");


router.patch("/:id/taken", protect, markMedicineAsTaken);
router.patch("/:id/missed", protect, markMedicineAsMissed);

module.exports = router;