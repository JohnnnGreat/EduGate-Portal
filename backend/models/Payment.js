// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
   studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a Student model
      required: true,
   },
   paymentType: {
      type: String,
      enum: [
         "Tuition Fee",
         "Acceptance Fee",
         "Hostel Fee",
         "Course Registration Fee",
         "Library Fine",
         "Convocation Fee",
         "Matriculation",
         "ICT Fee",
         "Department Fee",
         "Faculty Fee",
         "Hostel",
         "Other",
      ],
      required: true,
   },
   amount: {
      type: Number,
      required: true,
   },
   reference: {
      type: String,
      required: true,
      unique: true, // Ensure that each transaction is unique
   },
   paymentGateway: {
      type: String,
      enum: ["Paystack", "Flutterwave", "Bank Transfer", "Manual Payment"],
      default: "Paystack",
   },
   status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
   },
   transactionDate: {
      type: Date,
      default: Date.now,
   },
   academicSession: {
      type: String,
      // required: true,
   },
   semester: {
      type: String,
      enum: ["First Semester", "Second Semester"],
      // required: true,
   },
   receiptNumber: {
      type: String,
   },
   remarks: {
      type: String,
      default: "",
   },
   verified: {
      type: Boolean,
      default: false,
   },
   metadata: {
      type: Object, // Additional data (e.g., payment breakdown, details)
      default: {},
   },
});

// Index for efficient search based on studentId, paymentType, and academicSession
PaymentSchema.index({ studentId: 1, paymentType: 1, academicSession: 1 });

module.exports = mongoose.model("Payment", PaymentSchema);
