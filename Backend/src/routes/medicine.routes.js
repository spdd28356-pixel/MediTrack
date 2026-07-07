const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { createMedicine, getMedicines, getMedicine,updateMedicineController, deleteMedicineController } = require("../controllers/medicine.controller");

router.post("/", protect, createMedicine);
router.get("/",protect, getMedicines);
router.get( "/:id", protect, getMedicine);
router.put("/:id",protect, updateMedicineController);
router.delete("/:id", protect, deleteMedicineController);

module.exports = router;