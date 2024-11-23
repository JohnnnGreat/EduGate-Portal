// controllers/paymentController.js

const Admission = require("../models/Application");
const Payment = require("../models/Payment");
const axios = require("axios"); // For making HTTP requests (e.g., to Paystack)
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

// Create a new payment
exports.createPayment = async (req, res) => {
   const { studentId, paymentType, amount, academicSession, semester } = req.body;

   const receiptNumber = uuidv4();
   console.log(req.user);
   const existingAdmission = await Admission.find({ admissionNumber: req.user.admissionNumber });

   // Generate a unique transaction reference
   const reference = `UNIPORTAL_${new Date().getTime()}_${req.user.userId}`;

   const userInformation = await User.findById(req.user.userId);
   console.log(existingAdmission);

   try {
      const payment = new Payment({
         studentId: req.user.userId,
         paymentType,
         amount,
         reference,
         academicSessio: existingAdmission?.academicSession,
         semester: "First Semester",
         receiptNumber,
      });

      await payment.save();

      res.status(201).json({ message: "Payment initiated successfully", payment });
   } catch (error) {
      res.status(500).json({ message: "Payment creation failed", error: error.message });
   }
};

// Verify a payment using its reference
exports.verifyPayment = async (req, res) => {
   const { reference } = req.params;

   try {
      // Assume we're using Paystack for payment verification
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
         headers: {
            Authorization: `Bearer sk_test_a29d35e1ffda0738696d0098fca366d0f4537923`,
         },
      });

      const { data } = response.data;

      if (data.status === "success") {
         // Update payment status in the database
         const updatedPayment = await Payment.findOneAndUpdate(
            { reference },
            { status: "Success", verified: true, receiptNumber: generateReceiptNumber() },
            { new: true },
         );

         return res.json({ message: "Payment verified successfully", payment: updatedPayment });
      } else {
         return res.status(400).json({ message: "Payment verification failed" });
      }
   } catch (error) {
      res.status(500).json({ message: "Payment verification error", error: error.message });
   }
};

// Get all payments for a specific student
exports.getStudentPayments = async (req, res) => {
   console.log(req.user);
   const studentId = req.user.userId;

   try {
      const payments = await Payment.find({ studentId }).sort({ transactionDate: -1 });
      res.status(200).json({ message: "Payments retrieved successfully", payments });
   } catch (error) {
      res.status(500).json({ message: "Error retrieving payments", error: error.message });
   }
};

exports.checkPayment = async (req, res) => {
   const { type } = req.body;
   const studentId = req.user.userId; // Assuming `req.user.userId` holds the authenticated student's ID

   try {
      // Check if a payment with the same type and studentId already exists
      const existingPayment = await Payment.findOne({
         studentId,
         paymentType: type,
         status: "Success",
      });

      if (existingPayment) {
         // Payment of the specified type has already been made
         return res.status(200).json({
            message: "Payment of this type has already been made",
            payment: existingPayment,
         });
      }

      // Payment of the specified type has not been made
      return res.status(404).json({
         message: "No payment of this type has been made yet",
      });
   } catch (error) {
      res.status(500).json({ message: "Error checking payment", error: error.message });
   }
};

// Get a specific payment by reference
exports.getPaymentByReference = async (req, res) => {
   const { reference } = req.params;

   try {
      const payment = await Payment.findOne({ reference });

      if (!payment) {
         return res.status(404).json({ message: "Payment not found" });
      }

      res.status(200).json({ message: "Payment retrieved successfully", payment });
   } catch (error) {
      res.status(500).json({ message: "Error retrieving payment", error: error.message });
   }
};

// Helper function to generate a unique receipt number
function generateReceiptNumber() {
   // Implement a unique receipt number generator
   return `REC_${Math.floor(Math.random() * 1000000000)}`;
}
