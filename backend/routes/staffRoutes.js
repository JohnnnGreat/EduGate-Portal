const express = require("express");
const router = express.Router();
const staffController = require("../controllers/Staff");

// Staff CRUD Routes
router.post("/", staffController.createStaff);
router.get("/", staffController.getAllStaff);
router.get("/search", staffController.searchStaff);
router.get("/:id", staffController.getStaffById);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

// Additional Staff Routes
router.post("/:id/attendance", staffController.addAttendanceRecord);
router.post("/:id/leave", staffController.submitLeaveRequest);
router.post("/:id/performance", staffController.addPerformanceEvaluation);

module.exports = router;
