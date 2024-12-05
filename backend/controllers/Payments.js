// controllers/paymentController.js

const Admission = require("../models/Application");
const Payment = require("../models/Payment");
const User = require("../models/User");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

// Create a new payment
exports.createPayment = async (req, res) => {
   const { paymentType, amount } = req.body;

   try {
      const userId = req.user.userId;
      const admissionNumber = req.user.admissionNumber;

      const existingAdmission = await Admission.findOne({ admissionNumber });
      if (!existingAdmission) {
         return res.status(404).json({ message: "Admission record not found." });
      }

      const existingPayment = await Payment.findOne({
         studentId: userId,
         paymentType,
         status: "Success",
      });

      if (existingPayment) {
         return res.status(400).json({
            message: "Payment of this type has already been made.",
            payment: existingPayment,
         });
      }

      const reference = `UNIPORTAL_${Date.now()}_${userId}`;
      const receiptNumber = uuidv4();

      const newPayment = new Payment({
         studentId: userId,
         paymentType,
         amount,
         reference,
         academicSession: existingAdmission.academicSession,
         semester: "First Semester",
         receiptNumber,
      });

      await newPayment.save();

      return res.status(201).json({
         message: "Payment initiated successfully.",
         payment: newPayment,
      });
   } catch (error) {
      console.error("Error creating payment:", error);
      return res.status(500).json({
         message: "Payment creation failed.",
         error: error.message,
      });
   }
};

// Verify a payment using its reference
exports.verifyPayment = async (req, res) => {
   const { reference } = req.params;

   try {
      const { data: paystackResponse } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
         headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      });

      if (paystackResponse.data.status === "success") {
         const updatedPayment = await Payment.findOneAndUpdate(
            { reference },
            {
               status: "Success",
               verified: true,
               receiptNumber: generateReceiptNumber(),
            },
            { new: true },
         );

         return res.json({
            message: "Payment verified successfully.",
            payment: updatedPayment,
         });
      }

      return res.status(400).json({ message: "Payment verification failed." });
   } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json({
         message: "Payment verification error.",
         error: error.message,
      });
   }
};

// Retrieve payment list by user level
exports.getPaymentListByLevel = async (req, res) => {
   const studentId = req.user.userId;

   try {
      const userAdmission = await Admission.findOne({ user: studentId });

      if (!userAdmission) {
         return res.status(404).json({ message: "User not found" });
      }

      const userLevel = `${userAdmission.program.level} Level`;
      const allPaymentsNecessary = paymentList[userLevel] || [];

      res.status(200).json({
         message: "Payment List retrieved successfully",
         paymentList: allPaymentsNecessary,
         userLevel,
         userAdmission,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error Fetching Payment List",
         error: error.message,
      });
   }
};

// Retrieve all payments for a specific student
exports.getStudentPayments = async (req, res) => {
   const studentId = req.user.userId;

   try {
      const payments = await Payment.find({ studentId }).sort({ transactionDate: -1 });
      res.status(200).json({
         message: "Payments retrieved successfully",
         payments,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error retrieving payments",
         error: error.message,
      });
   }
};

// Check if a specific type of payment has been made
exports.checkPayment = async (req, res) => {
   const { type } = req.body;
   const studentId = req.user.userId;

   try {
      const existingPayment = await Payment.findOne({
         studentId,
         paymentType: type,
         status: "Success",
      });

      if (existingPayment) {
         return res.status(200).json({
            message: "Payment of this type has already been made",
            payment: existingPayment,
            success: true,
         });
      }

      return res.status(404).json({
         message: "No payment of this type has been made yet",
      });
   } catch (error) {
      res.status(500).json({
         message: "Error checking payment",
         error: error.message,
      });
   }
};

/// Retrieve a specific payment by reference
exports.getPaymentByReference = async (req, res) => {
   const { reference } = req.params;

   try {
      const payment = await Payment.findOne({ reference });

      if (!payment) {
         return res.status(404).json({ message: "Payment not found" });
      }

      res.status(200).json({
         message: "Payment retrieved successfully",
         payment,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error retrieving payment",
         error: error.message,
      });
   }
};

// Check if all major payments have been made
exports.checkMajorPayments = async (req, res) => {
   const studentId = req.user.userId;

   try {
      const userAdmission = await Admission.findOne({ user: studentId });

      if (!userAdmission) {
         return res.status(404).json({ message: "User not found" });
      }

      const userLevel = `${userAdmission.program.level} Level`;
      const allPaymentsNecessary = paymentList[userLevel] || [];

      const majorPaymentTypes = allPaymentsNecessary.filter((payment) => payment.required === true).map((payment) => payment.type);

      const payments = await Payment.find({
         studentId,
         paymentType: { $in: majorPaymentTypes },
         status: "Success",
      });

      if (payments.length === majorPaymentTypes.length) {
         return res.status(200).json({
            message: "All major payments have been made",
            payments,
            success: true,
         });
      }

      return res.status(404).json({
         message: "Not all major payments have been made",
         payments,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error checking major payments",
         error: error.message,
      });
   }
};

// Check if the Acceptance Fee has been paid
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
      res.status(500).json({
         message: "Error checking Acceptance Fee",
         error: error.message,
      });
   }
};

// Utility function to generate CSV data
const generateCSVData = (payments) => {
   const csvHeaders = "Name,Email,PaymentType,Amount,TransactionDate,Status\n";
   const csvRows = payments.map((payment) => [payment.studentId.name, payment.studentId.email, payment.paymentType, payment.amount, payment.transactionDate, payment.status].join(",")).join("\n");

   return csvHeaders + csvRows;
};

// Utility function to generate XLSX data
const generateXLSXData = (payments) => {
   return payments.map((payment) => ({
      Name: `${payment.studentId.firstName} ${payment.studentId.lastName}`,
      Email: payment.studentId.email,
      PaymentType: payment.paymentType,
      Amount: payment.amount,
      TransactionDate: payment.transactionDate,
      Status: payment.status,
   }));
};

// Utility function to upload file
const uploadFile = async (file, filename, contentType) => {
   const formData = new FormData();
   formData.append("file", file, filename);

   const response = await axios.post(process.env.FILE_UPLOAD_ENDPOINT, formData, {
      headers: {
         "Content-Type": contentType,
      },
   });

   return response.data.fileUrl;
};

// Get all payments
exports.getAllPayments = async (req, res) => {
   try {
      const payments = await Payment.find().sort({ transactionDate: -1 }).populate("studentId");

      res.status(200).json({
         message: "Payments retrieved successfully",
         payments,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error retrieving payments",
         error: error.message,
      });
   }
};

// Export transactions
exports.exportTransactions = async (req, res) => {
   const { format } = req.query;
   const supportedFormats = ["csv", "xlsx"];

   try {
      if (!supportedFormats.includes(format)) {
         return res.status(400).json({
            message: "Invalid format. Please use csv or xlsx.",
         });
      }

      const payments = await Payment.find().sort({ transactionDate: -1 }).populate("studentId");

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const uniqueId = uuidv4().slice(0, 8);
      const filename = `transactions_${timestamp}_${uniqueId}.${format}`;

      let fileUrl;
      if (format === "csv") {
         const csvContent = generateCSVData(payments);
         fileUrl = await uploadFile(Buffer.from(csvContent), filename, "text/csv");
      } else {
         const exportData = generateXLSXData(payments);
         const wb = xlsx.utils.book_new();
         const ws = xlsx.utils.json_to_sheet(exportData);

         xlsx.utils.book_append_sheet(wb, ws, "Transactions");
         const xlsxBuffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

         fileUrl = await uploadFile(xlsxBuffer, filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      }

      res.json({
         message: `${format.toUpperCase()} exported successfully`,
         fileUrl,
      });
   } catch (error) {
      console.error("Export transactions error:", error);
      res.status(500).json({
         message: "Error exporting transactions",
         error: error.message,
      });
   }
};

// Verify transaction
exports.verifyTransaction = async (req, res) => {
   const { reference } = req.params;

   try {
      const payment = await Payment.findOne({ reference });

      if (!payment) {
         return res.status(404).json({ message: "Payment not found" });
      }

      if (payment.status === "Success") {
         return res.status(200).json({
            message: "Payment already verified and successful",
         });
      }

      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
         headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
         },
      });

      const { data } = response.data;

      if (data.status !== "success") {
         return res.status(400).json({
            message: data?.gateway_response || "Transaction verification failed",
         });
      }

      const updatedPayment = await Payment.findOneAndUpdate(
         { reference },
         {
            status: "Success",
            verified: true,
            receiptNumber: generateReceiptNumber(),
         },
         { new: true },
      );

      return res.json({
         message: "Transaction verified successfully",
         payment: updatedPayment,
      });
   } catch (error) {
      console.error("Transaction verification error:", error);
      res.status(500).json({
         message: "Transaction verification error",
         error: error.message,
      });
   }
};

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
      const payments = await Payment.find().sort({ transactionDate: -1 }).populate("studentId");

      const paymentStats = {
         overall: {
            totalAmount: 0,
            totalCount: 0,
         },
         byType: {},
         byStudent: {},
         successfullPayments: [],
         failedPayments: [],
         semesterStats: {},
      };

      payments.map((payment) => {
         const paymentType = payment.paymentType;
         const studentName = payment.studentId?.firstName + "" + payment.studentId?.lastName || "Unknown Student";

         paymentStats.overall.totalAmount += payment.amount;
         paymentStats.overall.totalCount++;

         if (!paymentStats.byType[paymentType]) {
            paymentStats.byType[paymentType] = {
               totalAmount: 0,
               count: 0,
            };
         }
         paymentStats.byType[paymentType].totalAmount += payment.amount;
         paymentStats.byType[paymentType].count++;

         if (!paymentStats.byStudent[studentName]) {
            paymentStats.byStudent[studentName] = {
               totalAmount: 0,
               count: 0,
               paymentTypes: {},
            };
         }
         paymentStats.byStudent[studentName].totalAmount += payment.amount;
         paymentStats.byStudent[studentName].count++;

         if (!paymentStats.byStudent[studentName].paymentTypes[paymentType]) {
            paymentStats.byStudent[studentName].paymentTypes[paymentType] = {
               totalAmount: 0,
               count: 0,
            };
         }
         paymentStats.byStudent[studentName].paymentTypes[paymentType].totalAmount += payment.amount;
         paymentStats.byStudent[studentName].paymentTypes[paymentType].count++;

         if (payment.status === "Success") {
            paymentStats.successfullPayments.push(payment);
         } else {
            paymentStats.failedPayments.push(payment);
         }

         if (!paymentStats.semesterStats[payment.semester]) {
            paymentStats.semesterStats[payment.semester] = { total: 0, payments: [] };
         }

         paymentStats.semesterStats[payment.semester].total += payment.amount;
         paymentStats.semesterStats[payment.semester].payments.push(payment);
      });

      const ob = Object.entries(paymentStats.semesterStats).map(([semester, information]) => console.log(semester, information));

      // Generate professional HTML template
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
         <meta charset="UTF-8">
         <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; font-size:13px !important; }
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
            <hr/>
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

         <div>
            <h2>Successful Payments</h2>
            <hr/>
            <table>
                  <tr>
                     <th>Student Name</th>
                     <th>Payment Type</th>
                     <th>Payment Reference</th>
                     <th>Amount</th>
                     <th>Semester</th>
                     <th>Payment Status</th>
                  </tr>
                  ${paymentStats.successfulPayments
                     .map(
                        (payment) => `
                        <tr>
                              <td>${payment.studentId?.firstName ?? "Unknown"}</td>
                              <td>${payment.paymentType}</td>
                              <td>${payment.reference}</td>
                              <td>${formatCurrency(payment.amount)}</td>
                              <td>${payment.semester}</td>
                              <td>${payment.status}</td>
                        </tr>
                     `,
                     )
                     .join("")}
            </table>
         </div>

         <div>
            <h2>Failed Payments</h2>
            <hr/>
            <table>
                  <tr>
                     <th>Student Name</th>
                     <th>Payment Type</th>
                     <th>Payment Reference</th>
                     <th>Amount</th>
                     <th>Semester</th>
                     <th>Payment Status</th>
                  </tr>
                  ${paymentStats.failedPayments
                     .map(
                        (payment) => `
                        <tr>
                              <td>${payment.studentId?.firstName || "Unknown"} ${payment.studentId?.lastName || ""}</td>
                              <td>${payment.paymentType}</td>
                              <td>${payment.reference}</td>
                              <td>${formatCurrency(payment.amount)}</td>
                              <td>${payment.semester}</td>
                              <td>${payment.status}</td>
                        </tr>
                     `,
                     )
                     .join("")}
            </table>
         </div>

         ${Object.entries(paymentStats.semesterStats)
            .map(
               ([semester, information]) => `
                  <div>
                     <h2>${semester}</h2>
                     <div>
                        <h1>Total Payment for the Semester</h1>
                        <p>Total Amount: ${formatCurrency(information.total)}</p>
                     </div>
                     <table>
                        <tr>
                              <th>Student Name</th>
                              <th>Payment Type</th>
                              <th>Payment Reference</th>
                              <th>Amount</th>
                              <th>Semester</th>
                              <th>Payment Status</th>
                        </tr>
                        ${information.payments
                           .map(
                              (payment) => `
                                 <tr>
                                    <td>${payment.studentId?.firstName || "Unknown"} ${payment.studentId?.lastName || ""}</td>
                                    <td>${payment.paymentType}</td>
                                    <td>${payment.reference}</td>
                                    <td>${formatCurrency(payment.amount)}</td>
                                    <td>${payment.semester}</td>
                                    <td>${payment.status}</td>
                                 </tr>
                              `,
                           )
                           .join("")}
                     </table>
                  </div>
            `,
            )
            .join("")}

         <div class="summary-section">
            <h2>Payments by Student</h2>
            <hr/>
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
                                    .map(([type, typeStats]) => `${type}: ${formatCurrency(typeStats.totalAmount)} (${typeStats.count} payments)`)
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

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `payment-report_${timestamp}.pdf`;
      const filepath = path.join(__dirname, filename);

      // PDF document configuration
      const document = {
         html: html,

         path: filepath,
      };

      const pdfBuffer = await pdf.create(document, pdfOptions);

      // Send the file
      res.download(filepath, filename, async (err) => {
         if (err) {
            return res.status(500).json({
               message: "Error downloading payment report",
               error: err.message,
            });
         }

         // Clean up file after download
         try {
            const formData = new FormData();

            const fileBuffer = require("fs").readFileSync(filepath);

            formData.append("file", fileBuffer, filename);

            // Example of uploading
            const response = await axios.post(process.env.FILE_UPLOAD_ENDPOINT, formData, {
               headers: {
                  "Content-Type": "application/pdf",
               },
               maxBodyLength: Infinity,
               maxContentLength: Infinity,
            });
            const { fileUrl } = response?.data;

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

// Generate Records
exports.generateRecords = async (req, res) => {
   try {
      const { recordType } = req.query;

      console.log(recordType);

      if (recordType === "Paid Students Report") {
         const paidStudentsRecord = {
            total: 0,
            paidStudents: [],
            paymentType: {},
         };
         const paidStudents = await Payment.find({
            status: "Success",
         }).populate("studentId");

         for (const paid of paidStudents) {
            paidStudentsRecord.total += paid.amount;

            const studentAdmission = await Admission.findOne({
               admissionNumber: paid.studentId.admissionNumber,
            }).populate("user");

            const studentInformation = {
               firstName: studentAdmission?.user.firstName,
               lastName: studentAdmission?.user.lastName,
               matNo: studentAdmission?.matNumber,
               faculty: getFacultyLabel(studentAdmission?.program.faculty),
               department: getDeparmentLabel(studentAdmission?.program?.faculty, studentAdmission?.program?.department),
            };

            const paidByStudent = studentInformation.firstName + " " + studentInformation.lastName;

            paidStudentsRecord.paidStudents.push(studentInformation);

            if (!paidStudentsRecord.paymentType[paid.paymentType]) {
               paidStudentsRecord.paymentType[paid.paymentType] = {
                  total: 0,
                  paidBy: [],
               };
            }

            paidStudentsRecord.paymentType[paid.paymentType].total += paid.amount;
            paidStudentsRecord.paymentType[paid.paymentType].paidBy.push(studentInformation);
         }

         const htmlContent = await generatePaymentReport(paidStudentsRecord.total, paidStudentsRecord.paidStudents, paidStudentsRecord.paymentType);

         // Unique filename with timestamp
         const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
         const filename = `paid_students_report_${timestamp}.pdf`;
         const filepath = path.join(__dirname, filename);

         // PDF document configuration
         const document = {
            html: htmlContent,
            path: filepath,
            type: "",
         };

         await pdf.create(document, pdfOptions);

         try {
            const formData = new FormData();

            const fileBuffer = require("fs").readFileSync(filepath);

            formData.append("file", fileBuffer, filename);

            const response = await axios.post(process.env.FILE_UPLOAD_ENDPOINT, formData, {
               headers: {
                  "Content-Type": "application/pdf",
               },
               maxBodyLength: Infinity,
               maxContentLength: Infinity,
            });

            const { fileUrl } = response?.data;

            await fs.unlink(filepath);

            return res.status(200).json({
               message: "Record for Paid Student Retrieved",
               payload: paidStudentsRecord,
               fileUrl: fileUrl,
            });
         } catch (error) {
            console.error("Report generation error:", error);
            res.status(500).json({
               message: "Error generating payment report",
               error: error.message,
            });
         }
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred." });
   }
};

// Helper function to generate a unique receipt number
function generateReceiptNumber() {
   return `REC_${Math.floor(Math.random() * 1000000000)}`;
}
