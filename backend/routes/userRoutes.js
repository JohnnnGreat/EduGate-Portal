const express = require("express");
const {
   checkIfAdmitted,
   registerNewStudent,
   loginUserDashboard,
   changePassword,
   getUserInformation,
} = require("../controllers/User");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Route to check if the user is admitted
router.post("/check-admission", checkIfAdmitted);
router.post("/register-user", registerNewStudent);
router.post("/login-user-dashboard", loginUserDashboard);
router.post("/change-password", verifyToken, changePassword);
router.get("/get-user-information", verifyToken, getUserInformation);

// You can add other routes here, such as profile management, update password, etc.

module.exports = router;
