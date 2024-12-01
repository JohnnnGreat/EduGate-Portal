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

exports.getAllPayments = async (req, res) => {
   try {
      const payments = await Payment.find().sort({ transactionDate: -1 }).populate("studentId");
      res.status(200).json({ message: "Payments retrieved successfully", payments });
   } catch (error) {
      res.status(500).json({ message: "Error retrieving payments", error: error.message });
   }
};

exports.exportTransactions = async (req, res) => {
   const { format } = req.query;
   console.log(format);
   try {
      const payments = await Payment.find().sort({ transactionDate: -1 }).populate("studentId");

      if (format === "csv") {
         const csvHeaders = "Name,Email,PaymentType,Amount,TransactionDate,Status\n";
         const csv = payments
            .map((payment) => {
               return [
                  payment.studentId.name,
                  payment.studentId.email,
                  payment.paymentType,
                  payment.amount,
                  payment.transactionDate,
                  payment.status,
               ].join(",");
            })
            .join("\n");

         // Combine headers and data
         const fullCsv = csvHeaders + csv;

         // Create a Blob instead of using Buffer
         const csvBlob = new Blob([fullCsv], { type: "text/csv" });

         console.log(csvBlob);

         // Create FormData instance
         const formData = new FormData();
         formData.append("file", csvBlob, "transactions.csv");

         // Make POST request to upload endpoint
         const response = await axios.post(
            "https://appwrite-express-file-upload.onrender.com/upload",
            formData,
            {
               headers: {
                  "Content-Type": "text/csv",
               },
            },
         );

         const { imageUrl } = response.data;
         console.log(imageUrl);

         res.json({ message: "CSV exported successfully", imageUrl });
      } else if (format === "xlsx") {
         // Generate a unique filename
         const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
         const uniqueId = uuidv4().slice(0, 8);
         const filename = `transactions_${timestamp}_${uniqueId}.xlsx`;
         const xlsx = require("xlsx");
         const wb = xlsx.utils.book_new();

         const exportData = payments.map((payment) => ({
            Name: payment.studentId.firstName + " " + payment.studentId.lastName,
            Email: payment.studentId.email,
            PaymentType: payment.paymentType,
            Amount: payment.amount,
            TransactionDate: payment.transactionDate,
            Status: payment.status,
         }));

         const ws = await xlsx.utils.json_to_sheet(exportData);

         await xlsx.utils.book_append_sheet(wb, ws, "Transactions");
         const buf = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

         // Create a Blob for XLSX as well
         const xlsxBlob = new Blob([buf], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         });

         // Create FormData instance
         const formData = new FormData();
         formData.append("file", xlsxBlob, filename);

         // Make POST request to upload endpoint
         const response = await axios.post(
            "https://appwrite-express-file-upload.onrender.com/upload",
            formData,
            {
               headers: {
                  "Content-Type":
                     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
               },
            },
         );

         const { fileUrl } = response.data;
         console.log(fileUrl);

         res.json({ message: "XLSX exported successfully", fileUrl });
      } else {
         return res.status(400).json({ message: "Invalid format. Please use csv or xlsx." });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error exporting transactions", error: error.message });
   }
};

exports.verifyTransaction = async (req, res) => {
   const { reference } = req.params;
   console.log(reference);
   try {
      const payment = await Payment.findOne({ reference });

      if (!payment) {
         return res.status(404).json({ message: "Payment not found" });
      }

      if (payment.status === "Success") {
         return res.status(200).json({ message: "Payment already verified, and is successful" });
      }

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

         return res.json({ message: "Transaction verified successfully", payment: updatedPayment });
      } else {
         return res.status(400).json({ message: data?.gateway_response });
      }
   } catch (error) {
      res.status(500).json({ message: "Transaction verification error", error: error.message });
   }
};

const pdf = require("pdf-creator-node");
const path = require("path");
const fs = require("fs").promises;
const puppeteer = require("puppeteer"); // Make sure to install this

// Helper function to format currency
const formatCurrency = (amount) => {
   return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
   }).format(amount);
};

// Generate a detailed payment report
exports.generatePaymentReport = async (req, res) => {
   try {
      // Fetch payments with populated student details
      const payments = await Payment.find().sort({ transactionDate: -1 }).populate("studentId");

      // Aggregate payment statistics
      const paymentStats = {
         overall: {
            totalAmount: 0,
            totalCount: 0,
         },
         byType: {},
         byStudent: {},
      };

      // Process each payment
      payments.forEach((payment) => {
         const paymentType = payment.paymentType;
         const studentName =
            payment.studentId?.firstName + "" + payment.studentId?.lastName || "Unknown Student";

         // Overall statistics
         paymentStats.overall.totalAmount += payment.amount;
         paymentStats.overall.totalCount++;

         // Payment type statistics
         if (!paymentStats.byType[paymentType]) {
            paymentStats.byType[paymentType] = {
               totalAmount: 0,
               count: 0,
            };
         }
         paymentStats.byType[paymentType].totalAmount += payment.amount;
         paymentStats.byType[paymentType].count++;

         // Student-wise statistics
         if (!paymentStats.byStudent[studentName]) {
            paymentStats.byStudent[studentName] = {
               totalAmount: 0,
               count: 0,
               paymentTypes: {},
            };
         }
         paymentStats.byStudent[studentName].totalAmount += payment.amount;
         paymentStats.byStudent[studentName].count++;

         // Student payment type tracking
         if (!paymentStats.byStudent[studentName].paymentTypes[paymentType]) {
            paymentStats.byStudent[studentName].paymentTypes[paymentType] = {
               totalAmount: 0,
               count: 0,
            };
         }
         paymentStats.byStudent[studentName].paymentTypes[paymentType].totalAmount +=
            payment.amount;
         paymentStats.byStudent[studentName].paymentTypes[paymentType].count++;
      });

      // Generate professional HTML template
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
                .report-header { text-align: center; margin-bottom: 20px; }
                .summary-section { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <div class="report-header">
                <h1>Comprehensive Payment Report</h1>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>

            <div class="summary-section">
                <h2>Overall Summary</h2>
                <p>Total Payments: ${paymentStats.overall.totalCount}</p>
                <p>Total Amount: ${formatCurrency(paymentStats.overall.totalAmount)}</p>
            </div>

            <div class="summary-section">
                <h2>Payments by Type</h2>
                <table>
                    <tr>
                        <th>Payment Type</th>
                        <th>Total Amount</th>
                        <th>Number of Payments</th>
                    </tr>
                    ${Object.entries(paymentStats.byType)
                       .map(
                          ([type, stats]) => `
                        <tr>
                            <td>${type}</td>
                            <td>${formatCurrency(stats.totalAmount)}</td>
                            <td>${stats.count}</td>
                        </tr>
                    `,
                       )
                       .join("")}
                </table>
            </div>

            <div class="summary-section">
                <h2>Payments by Student</h2>
                <table>
                    <tr>
                        <th>Student Name</th>
                        <th>Total Amount</th>
                        <th>Number of Payments</th>
                        <th>Payment Types</th>
                    </tr>
                    ${Object.entries(paymentStats.byStudent)
                       .map(
                          ([student, stats]) => `
                        <tr>
                            <td>${student}</td>
                            <td>${formatCurrency(stats.totalAmount)}</td>
                            <td>${stats.count}</td>
                            <td>
                                ${Object.entries(stats.paymentTypes)
                                   .map(
                                      ([type, typeStats]) =>
                                         `${type}: ${formatCurrency(typeStats.totalAmount)} (${
                                            typeStats.count
                                         } payments)`,
                                   )
                                   .join("<br>")}
                            </td>
                        </tr>
                    `,
                       )
                       .join("")}
                </table>
            </div>
        </body>
        </html>
        `;

      // Unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `payment-report_${timestamp}.pdf`;
      const filepath = path.join(__dirname, filename);

      // Comprehensive PDF options
      const options = {
         format: "A3",
         orientation: "portrait",
         border: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
         },
         header: {
            height: "15mm",
            contents: '<div style="text-align: center;">Payment Report</div>',
         },
         footer: {
            height: "15mm",
            contents: {
               first: "Page 1",
               2: "Page 2",
               default: '<span style="color: #444;">Page {{page}} of {{pages}}</span>',
               last: "Last Page",
            },
         },
         // Explicitly set the render engine
         type: "pdf",
         // phantomPath: "./node_modules/phantomjs/bin/phantomjs",
      };

      // PDF document configuration
      const document = {
         html: html,
         data: {
            // You can pass dynamic data here if needed
         },
         path: filepath,
         type: "", // Keep this empty or remove
      };

      // Generate PDF
      await pdf.create(document, options);

      // Send the file
      res.download(filepath, filename, async (err) => {
         if (err) {
            console.error("Download error:", err);
            return res.status(500).json({
               message: "Error downloading payment report",
               error: err.message,
            });
         }

         // Clean up file after download
         try {
            await fs.unlink(filepath);
         } catch (cleanupError) {
            console.error("Error cleaning up PDF:", cleanupError);
         }
      });
   } catch (error) {
      console.error("Report generation error:", error);
      res.status(500).json({
         message: "Error generating payment report",
         error: error.message,
      });
   }
};

// Helper function to generate a unique receipt number
function generateReceiptNumber() {
   // Implement a unique receipt number generator
   return `REC_${Math.floor(Math.random() * 1000000000)}`;
}
