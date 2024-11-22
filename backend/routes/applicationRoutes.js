const express = require("express");
const {
   createAdmission,
   updateAdmission,
   getAllAdmissions,
   getAdmissionByNumber,
} = require("../controllers/Admission");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Route to check if the user is admitted
router.post("/create-admission", verifyToken, createAdmission);
router.post("/update-admission", verifyToken, updateAdmission);
router.get("/get-admission", verifyToken, getAdmissionByNumber);

module.exports = router;
