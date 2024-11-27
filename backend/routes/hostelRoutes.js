// hostelRoutes.js
const express = require("express");
const {
   createHostel,
   getAllHostels,
   getHostelsByGender,
   getHostelById,
} = require("../controllers/Hostel");
const router = express.Router();

// Route to create a new hostel
router.post("/hostels", createHostel);

// Route to get all hostels
router.get("/hostels", getAllHostels);

// Route to get hostels by gender (Male, Female, or Mixed Gender)
router.get("/hostels/gender/:gender", getHostelsByGender);

router.get("/get-hostel-by-id/:hostelId", getHostelById);

module.exports = router;
