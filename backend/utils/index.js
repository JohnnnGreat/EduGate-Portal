const jwt = require("jsonwebtoken");
const { departmentMapping, faculties } = require("../constant");
const generateAdmissionPDF = require("../createpdf");
const { PDFDocument } = require("pdf-lib");
const generateTokens = (user) => {
   const accessToken = jwt.sign(
      {
         userId: user._id,
         email: user.email,
         studentStatus: user.studentStatus,
         admissionNumber: user.admissionNumber,
      },
      "RANDOM",
      { expiresIn: "7d" },
   );

   // Generate refresh token
   const refreshToken = jwt.sign(
      {
         userId: user._id,
      },
      "RANDOM",
      { expiresIn: "7d" }, // Longer lived refresh token
   );

   return { accessToken, refreshToken };
};

const getFacultyLabel = (facultyName) => {
   const fa = faculties.filter((item) => {
      return item?.value?.includes(facultyName);
   });

   return fa[0]?.label;
};

const getDeparmentLabel = (facultyName, departmentName) => {
   // Check if the facultyName exists in departmentMapping
   const department = departmentMapping[facultyName]?.filter((item) =>
      item?.value?.includes(departmentName),
   );

   // If department is not found or is empty, return undefined
   if (!department || department.length === 0) {
      return undefined;
   }

   // Return the label of the first department that matches
   return department[0]?.label;
};

const generatePDFBuffer = async (data) => {
   return new Promise((resolve, reject) => {
      const chunks = [];
      const doc = new PDFDocument();

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      generateAdmissionPDF(data, doc);
   });
};

// Comprehensive PDF options
const pdfOptions = {
   format: "A4",
   orientation: "landscape",
   border: {
      top: "10mm",
      right: "10mm",
      bottom: "10mm",
      left: "10mm",
   },
   header: {
      height: "15mm",
      contents: '<div style="text-align: center;">Payment Report <hr/> </div>',
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

module.exports = {
   generateTokens,
   getDeparmentLabel,
   getFacultyLabel,
   generatePDFBuffer,
   pdfOptions,
};
