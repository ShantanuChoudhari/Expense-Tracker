const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteAllExpenses,
  deleteExpenseWithID,
  downloadExpenseExcel,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/all", protect, deleteAllExpenses);
router.delete("/:id", protect, deleteExpenseWithID);

module.exports = router;
