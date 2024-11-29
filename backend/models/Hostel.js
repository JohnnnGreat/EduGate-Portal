const mongoose = require("mongoose");

// Create a schema for a Room inside a Hostel
const RoomSchema = new mongoose.Schema({
   roomNumber: {
      type: String,
      required: true,
   },
   isOccupied: {
      type: Boolean,
      default: false,
   },
   bedsAvailable: {
      type: Number,
      required: true,
   },
   bedCapacity: {
      type: Number,
      required: true,
   },
   occupants: [
      {
         studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
         dateAllocated: {
            type: Date,
            default: Date.now,
         },
      },
   ],
});

// Create a schema for the Hostel
const HostelSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   pricePerSemester: {
      type: Number,
      required: true,
   },
   genderRestriction: {
      type: String,
      enum: ["Male Only", "Female Only", "Mixed Gender"],
      required: true,
   },
   rooms: [RoomSchema], // Embedding RoomSchema for room details
   totalRooms: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
   },
   facilities: [
      {
         type: String,
      },
   ],
   address: {
      type: String,
      required: true,
   },
   contactInfo: {
      email: {
         type: String,
      },
      phone: {
         type: String,
      },
   },
   availability: {
      bedsAvailable: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ["Available", "Full"],
         default: "Available",
      },
   },
   dateAdded: {
      type: Date,
      default: Date.now,
   },
});

// Create a schema for Booking information if needed
const BookingSchema = new mongoose.Schema({
   studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
   },
   roomNumber: {
      type: String,
      
   },
   bedNumber: {
      type: Number,
      
   },
   dateOfBooking: {
      type: Date,
      default: Date.now,
   },
   paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
   },
});

// Models
const Hostel = mongoose.model("Hostel", HostelSchema);
const Booking = mongoose.model("Booking", BookingSchema);

// Export the models
module.exports = {
   Hostel,
   Booking,
};
