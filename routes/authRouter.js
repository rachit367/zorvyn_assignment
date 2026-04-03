const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { requireAdmin } = require("../middlewares/requireAdmin");

router.post("/register", authenticateToken, requireAdmin, register);
router.post("/login", login);

module.exports = router;
