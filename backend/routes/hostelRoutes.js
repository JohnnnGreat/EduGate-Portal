// hostelRoutes.js
const express = require("express");
const {
   createHostel,
   getAllHostels,
   getHostelsByGender,
   getHostelById,
   applyForHostel,
   checkIfPaymentIsDone,
   checkIfHostelApplied,
   cancelBooking,
} = require("../controllers/Hostel");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Route to create a new hostel
router.post("/hostels", createHostel);

// Route to get all hostels
router.get("/hostels", getAllHostels);

// Route to get hostels by gender (Male, Female, or Mixed Gender)
router.get("/hostels/gender/:gender", getHostelsByGender);

router.get("/get-hostel-by-id/:hostelId", getHostelById);
router.get("/apply/:hostelId", verifyToken, applyForHostel);

router.get("/check-payment", verifyToken, checkIfPaymentIsDone);
router.get("/check-booking", verifyToken, checkIfHostelApplied);

router.delete("/cancel-booking/:bookingId", verifyToken, cancelBooking);

module.exports = router;
