// controllers/paymentController.js

const Admission = require("../models/Application");
const Payment = require("../models/Payment");
const axios = require("axios"); // For making HTTP requests (e.g., to Paystack)
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const { paymentList } = require("../constant");

// Create a new payment
exports.createPayment = async (req, res) => {
   const { studentId, paymentType, amount, academicSession, semester } = req.body;

   const receiptNumber = uuidv4();
   try {
      const existingAdmission = await Admission.find({
         admissionNumber: req.user.admissionNumber,
      });

      // Generate a unique transaction reference
      const reference = `UNIPORTAL_${new Date().getTime()}_${req.user.userId}`;

      const existingPayment = await Payment.findOne({
         paymentType,
         status: "Success",
      });

      const userInformation = await User.findById(req.user.userId);
      if (existingPayment) {
         return res.status(401).json({
            message: "Payment of this type has already been made",
            payment: existingPayment,
         });
      } else {
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
      }
   } catch (error) {
      console.log(error);
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

exports.getPaymentListByLevel = async (req, res) => {
   const studentId = req.user.userId;

   try {
      const userAdmission = await Admission.findOne({ user: studentId });
      if (!userAdmission) {
         return res.status(404).json({ message: "User not found" });
      }

      // Get the Curent Level of the User
      const userLevel = `${userAdmission?.program?.level} Level`;

      // get All Payments to be done by user based on the Level
      const allPaymentsNeccessary = paymentList[userLevel];

      res.status(200).send({
         message: "Payment List retrieved successfully",
         paymentList: allPaymentsNeccessary,
         userLevel,
         userAdmission,
      });
   } catch (error) {
      res.status(500).json({ message: "Error Fetching Payment List", error: error.message });
   }
};
// Get all payments for a specific student
exports.getStudentPayments = async (req, res) => {
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
   const studentId = req.user.userId; 

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
            success: true,
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

exports.checkMajorPayments = async (req, res) => {
   const studentId = req.user.userId;

   try {
      const userAdmission = await Admission.findOne({ user: studentId });
      if (!userAdmission) {
         return res.status(404).json({ message: "User not found" });
      }

      // Get the Curent Level of the User
      const userLevel = `${userAdmission?.program?.level} Level`;

      // get All Payments to be done by user based on the Level
      const allPaymentsNeccessary = paymentList[userLevel];

      const majorPayments = allPaymentsNeccessary.filter((paymentType) => {
         return paymentType.required === true;
      });

      const majorPaymentTypes = [];

      majorPayments.map((item) => {
         majorPaymentTypes.push(item.type);
      });

      // Check if payments of major types have been made
      const payments = await Payment.find({
         studentId,
         paymentType: { $in: majorPaymentTypes },
         status: "Success",
      });

      if (payments.length === majorPaymentTypes.length) {
         // All major payments have been made
         return res.status(200).json({
            message: "All major payments have been made",
            payments,
            success: true,
         });
      }

      // Not all major payments have been made
      return res.status(404).json({
         message: "Not all major payments have been made",
         payments: payments,
      });
   } catch (error) {
      res.status(500).json({ message: "Error checking major payments", error: error.message });
   }
};

exports.checkAcceptanceFee = async (req, res) => {
   const studentId = req.user.userId;

   try {
      const existingPayment = await Payment.findOne({
         studentId,
         paymentType: "Acceptance Fee",
         status: "Success",
      });

      if (existingPayment) {
         return res.status(200).json({
            message: "Acceptance Fee has already been paid",
            payment: existingPayment,
            success: true,
         });
      }

      return res.status(404).json({
         message: "Acceptance Fee has not been paid yet",
      });
   } catch (error) {
      res.status(500).json({ message: "Error checking Acceptance Fee", error: error.message });
   }
};
// Helper function to generate a unique receipt number
function generateReceiptNumber() {
   // Implement a unique receipt number generator
   return `REC_${Math.floor(Math.random() * 1000000000)}`;
}
