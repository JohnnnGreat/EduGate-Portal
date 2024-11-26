// hostelRoutes.js
const express = require("express");
const { createHostel, getAllHostels, getHostelsByGender } = require("../controllers/Hostel");
const router = express.Router();

// Route to create a new hostel
router.post("/hostels", createHostel);

// Route to get all hostels
router.get("/hostels", getAllHostels);

// Route to get hostels by gender (Male, Female, or Mixed Gender)
router.get("/hostels/gender/:gender", getHostelsByGender);

module.exports = router;
