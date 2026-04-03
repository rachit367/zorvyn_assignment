const express = require("express");
const router = express.Router();
const { changeUserStatus, getAllUsers } = require("../controllers/adminController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { requireAdmin } = require("../middlewares/requireAdmin");

router.get("/users", authenticateToken, requireAdmin, getAllUsers);
router.patch("/users/:id/status", authenticateToken, requireAdmin, changeUserStatus);

module.exports = router;
