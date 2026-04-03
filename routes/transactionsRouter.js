const express = require("express");
const router = express.Router();
const {
  getAllRecords,
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/transactionsController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { requireAdmin } = require("../middlewares/requireAdmin");
const { requireAnalystOrAdmin } = require("../middlewares/requireAnalystOrAdmin");

router.get("/", authenticateToken, requireAnalystOrAdmin, getAllRecords);
router.get("/:record_id", authenticateToken, requireAnalystOrAdmin, getRecord);
router.post("/", authenticateToken, requireAdmin, addRecord);
router.patch("/:record_id", authenticateToken, requireAdmin, updateRecord);
router.delete("/:record_id", authenticateToken, requireAdmin, deleteRecord);

module.exports = router;
