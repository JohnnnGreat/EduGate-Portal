const { Hostel, Booking } = require("../models/Hostel"); // assuming the path to the models

// Controller to create a new hostel
exports.createHostel = async (req, res) => {
   const {
      name,
      pricePerSemester,
      genderRestriction,
      rooms,
      totalRooms,
      description,
      facilities,
      address,
      contactInfo,
   } = req.body;

   try {
      // Calculate total beds and available beds
      let totalBeds = 0;
      let bedsAvailable = 0;

      rooms.forEach((room) => {
         totalBeds += room.bedCapacity;
         bedsAvailable += room.bedsAvailable;
      });

      // Create a new Hostel
      const newHostel = new Hostel({
         name,
         pricePerSemester,
         genderRestriction,
         rooms,
         totalRooms,
         description,
         facilities,
         address,
         contactInfo,
         availability: {
            bedsAvailable: bedsAvailable,
            status: bedsAvailable > 0 ? "Available" : "Full",
         },
      });

      // Save the hostel to the database
      await newHostel.save();

      res.status(201).json({
         success: true,
         message: "Hostel created successfully",
         hostel: newHostel,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Server error, please try again",
      });
   }
};

// Controller to get all hostels
exports.getAllHostels = async (req, res) => {
   try {
      const hostels = await Hostel.find().populate("rooms.occupants.studentId", "name studentId");

      res.status(200).json({
         success: true,
         hostels,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Server error, please try again",
      });
   }
};

// Controller to get hostels based on gender restriction
exports.getHostelsByGender = async (req, res) => {
   const { gender } = req.params; // Gender can be "Male Only", "Female Only", "Mixed Gender"

   try {
      const hostels = await Hostel.find({
         genderRestriction: gender,
      }).populate("rooms.occupants.studentId", "name studentId");

      res.status(200).json({
         success: true,
         hostels,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Server error, please try again",
      });
   }
};
