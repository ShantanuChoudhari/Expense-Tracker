const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteAllIncome,
  deleteIncomeWithID,
  downloadIncomeExcel,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/all", protect, deleteAllIncome);
router.delete("/:id", protect, deleteIncomeWithID);

module.exports = router;
