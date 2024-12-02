const express = require("express");
const { loginAdmin, loginAdminEmail, getAdminInformation } = require("../controllers/Admin");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Route to check if the user is admitted

router.post("/login", loginAdmin);
router.post("/login-email", loginAdminEmail);
router.get("/get-admin-info", verifyToken, getAdminInformation);
// You can add other routes here, such as profile management, update password, etc.

module.exports = router;
