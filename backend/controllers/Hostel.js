const { Hostel, Booking } = require("../models/Hostel"); // assuming the path to the models
const User = require("../models/User");

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

exports.getHostelById = async (req, res) => {
   const { hostelId } = req.params;

   try {
      const hostel = await Hostel.findById(hostelId);
      return res.status(200).json({
         success: true,
         hostel,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Server error, please try again",
      });
   }
};
exports.applyForHostel = async (req, res) => {
   const { hostelId } = req.params;
   const studentId = req.user.userId;

   console.log(studentId, hostelId);
   try {
      const hostel = await Hostel.findById(hostelId);
      const student = await User.findById(studentId);

      if (!hostel || !student) {
         return res.status(404).json({
            success: false,
            message: "Hostel or student not found",
         });
      }

      const availableRooms = hostel.rooms.filter((room) => room.bedsAvailable > 0);

      if (availableRooms.length === 0) {
         return res.status(400).json({
            success: false,
            message: "No available rooms in the hostel",
         });
      }

      const selectedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];

      console.log(selectedRoom);

      if (!selectedRoom) {
         return res.status(500).json({
            success: false,
            message: "Failed to select a room",
         });
      }

      console.log(selectedRoom);

      const newBooking = new Booking({
         studentId: student._id,
         hostelId: hostel._id,
         roomId: selectedRoom._id,
         roomNumber: selectedRoom.roomNumber,
      });

      await newBooking.save();

      // const updatedHostel = await Hostel.findOneAndUpdate(
      //    {
      //       _id: hostelId,
      //       "rooms._id": selectedRoom._id,
      //    },
      //    {
      //       $push: { "rooms.$.occupants": { studentId } },
      //    },
      //    { new: true },
      // );

      // console.log(updatedHostel);

      // selectedRoom.bedsAvailable -= 1;
      // selectedRoom.occupants.push({ studentId: student._id });

      // await hostel.save();

      res.status(201).json({
         success: true,
         message: "Hostel Booked Successfully",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Server error, please try again",
      });
   }
};

exports.checkIfHostelApplied = async (req, res) => {
   const userId = req.user.userId;

   try {
      const booking = await Booking.findOne({ studentId: userId }).populate("hostelId");

      if (!booking) {
         return res.status(400).json({ message: "No Booking Found" });
      }
      res.status(200).json({
         success: true,
         bookingInformation: booking,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Server Error, Please Try Again",
      });
   }
};

exports.checkIfPaymentIsDone = async (req, res) => {
   const userId = req.user.userId;

   try {
      const booking = await Booking.findOne({ studentId: userId });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to Check Payment Status, Please Try Again",
      });
   }
};

exports.cancelBooking = async (req, res) => {
   const { bookingId } = req.params;

   try {
      await Booking.findByIdAndDelete(bookingId);

      res.status(202).json({
         message: "Booking Cancelled Successfully",
         success: true,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error, Please Try Again",
      });
   }
};

exports.makeHostelPayment = () => {};

exports.verifyHostelPayment = () => {};
