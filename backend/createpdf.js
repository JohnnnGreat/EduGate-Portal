const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateAdmissionPDF = (data) => {
   return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
         margin: 50,
         size: "A4",
      });

      // Store the generated PDF in-memory
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks))); // Return the PDF buffer

      // Helper function for adding fields
      const addField = (label, value) => {
         doc.font("Helvetica").fontSize(12).fillColor("#333333").text(label, { continued: false });
         doc.font("Helvetica").fontSize(12).fillColor("#111111").text(value).moveDown(0.5);
      };

      const drawLine = () => {
         doc.moveTo(50, doc.y) // Start from left margin
            .lineTo(545, doc.y) // Draw to right margin (A4 width - margins)
            .stroke("#dddddd") // Light gray color
            .moveDown(0.5); // Add some space after line
      };

      // Add title with neutral, professional color (example: dark gray)
      doc.font("Helvetica-Bold")
         .fontSize(24)
         .fillColor("#2C3E50")
         .text("Application Summary", { align: "left" });

      drawLine();

      // Add subtitle with improved color and padding
      doc.font("Helvetica-Oblique")
         .fontSize(10)
         .fillColor("#7F8C8D")
         .text(
            "Below is a summary of the details you've entered for your application. Please review the information carefully and follow the next steps.",
            {
               align: "left",
               width: 500,
            },
         )
         .moveDown(2);

      // Personal Information section
      doc.font("Helvetica-Bold")
         .fontSize(14)
         .fillColor("#2C3E50")
         .text("Personal Information")
         .moveDown(1);
      addField("Full Name", data.fullName);
      addField("Email", data.email);
      addField("Date of Birth", data.dob);
      addField("Admission No.", data.admissionNo);

      // Admission Status with color coding
      doc.moveDown(1);
      doc.font("Helvetica-Bold").fontSize(12).text("Admission Status", { continued: true });
      doc.font("Helvetica")
         .fontSize(12)
         .fillColor(data.admissionStatus === "Not Admitted" ? "#E74C3C" : "#27AE60")
         .text(`: ${data.admissionStatus}`, { align: "left" });

      // Program Information section with heading
      doc.moveDown(2);
      doc.font("Helvetica-Bold")
         .fontSize(14)
         .fillColor("#2C3E50")
         .text("Program Information")
         .moveDown(1);

      // Department and Faculty fields
      addField("Department", data.department);
      addField("Faculty", data.faculty);
      addField("Mode of Entry", data.modeOfEntry);

      // Documents section with more information
      doc.moveDown(2);
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#2C3E50").text("Documents").moveDown(1);
      doc.font("Helvetica")
         .fontSize(12)
         .fillColor("#333333")
         .text(
            "Please ensure that all required documents are uploaded before proceeding with your application submission.",
         );

      // Further Instructions
      doc.moveDown(2);
      doc.font("Helvetica-Bold")
         .fontSize(14)
         .fillColor("#2C3E50")
         .text("Next Steps and Instructions")
         .moveDown(1);
      doc.font("Helvetica")
         .fontSize(12)
         .fillColor("#333333")
         .text("1. Review all entered details to ensure their accuracy.", { continued: true });
      doc.text("If any details are incorrect, please go back and edit them.");
      doc.moveDown(0.5);
      doc.text(
         "2. Upload all required supporting documents such as ID proof, certificates, and passport photograph.",
         { continued: true },
      );
      doc.text("Check that all documents are legible and in the correct format.");
      doc.moveDown(0.5);
      doc.text("3. Submit your application by clicking the 'Submit' button.", { continued: true });
      doc.text("Once submitted, you will not be able to make further changes.");
      doc.moveDown(0.5);
      doc.text(
         "4. After submission, wait for confirmation and follow any additional instructions that may be sent to your email.",
         { continued: true },
      );
      doc.text("Ensure your email address is correct to receive further updates.");

      // Footer with page number and contact information
      doc.moveDown(3);
      doc.font("Helvetica-Oblique")
         .fontSize(10)
         .fillColor("#BDC3C7")
         .text("For inquiries, contact: support@admission.com", { align: "center" });
      doc.text(`Page ${doc.page} of 1`, { align: "center" });

      // Finalize the PDF
      doc.end();
   });
};

module.exports = generateAdmissionPDF;
