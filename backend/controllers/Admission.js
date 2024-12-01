const { default: axios } = require("axios");
const generateAdmissionPDF = require("../createpdf");
const Admission = require("../models/Application");
const User = require("../models/User");
const { getDeparmentLabel, getFacultyLabel } = require("../utils");
const FormData = require("form-data");
const cron = require("node-cron");
const moment = require("moment");

// 1. Create a New Admission
const createAdmission = async (req, res) => {
   try {
      const { phoneNumber, fullName, email, address, dateOfBirth } = req.body;

      const user = await User.findByIdAndUpdate(
         req.user.userId,
         {
            ...req.body,
         },
         { new: true, runValidators: true },
      );

      const existingAdmission = await Admission.find({ admissionNumber: user.admissionNumber });

      if (existingAdmission) {
         const updatedAdmission = await Admission.findByIdAndUpdate(
            existingAdmission[0]._id,
            {
               ...req.body,
            },
            { new: true, runValidators: true },
         );

         return res.status(200).json({
            message: "Admission Updated Successfully",
            data: user,
            admission: updatedAdmission,
         });
      }
      const admission = new Admission({
         user: req.user.userId,
         admissionNumber: user.admissionNumber,
      });

      await admission.save();

      return res.status(200).json({
         message: "Admission Created Successfully",
         data: user,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 2. Get All Admissions
const getAllAdmissions = async (req, res) => {
   try {
      const getAllAdmissions = await Admission.find();
      console.log(getAllAddmissions);
   } catch (errors) {
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 3. Get Admission by Admission Number
const getAdmissionByNumber = async (req, res) => {
   try {
      const existingAdmission = await Admission.findOne({
         admissionNumber: req.user.admissionNumber,
      });

      return res.status(200).json({
         message: "Admission information retrieved successfully",
         data: existingAdmission,
      });
   } catch (error) {
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 4. Get Admission by User ID
const getAdmissionByUserId = async (req, res) => {};

// 5. Update Admission Information
const updateAdmission = async (req, res) => {
   const {
      academicSession,
      department,
      faculty,
      modeOfEntry,
      birthCertificate,
      oLevelResult,
      submitted,
   } = req.body;
   try {
      const existingAdmission = await Admission.find({ admissionNumber: req.user.admissionNumber });

      const updatedAdmission = await Admission.findByIdAndUpdate(
         existingAdmission[0]._id,
         {
            academicSession,
            "program.faculty": faculty,
            "program.department": department,
            "program.level": modeOfEntry == "Direct Entry" ? "200" : "100",
            "program.modeOfEntry": modeOfEntry,
            "documents.birthCertificate": birthCertificate ?? "",
            "documents.oLevelResult": oLevelResult ?? "",
            submitted,
            "nextOfKin.name": req.body.name,
            "nextOfKin.email": req.body.email,
            "nextOfKin.address": req.body.address,
            "nextOfKin.phone": req.body.phone,
            "nextOfKin.relationship": req.body.relationship,
         },
         { new: true, runValidators: true },
      );

      if (updateAdmission) {
         // Prepare Information
         const user = await User.findById(req.user.userId);

         const applicationData = {
            fullName: `${user.firstName} ${user.lastName}`,
            email: user?.email,
            dob: "10/12/2002",
            admissionNo: user.admissionNumber,
            admissionStatus: "Not Admitted",
            department: getDeparmentLabel(
               updatedAdmission?.program?.faculty,
               updatedAdmission?.program?.department,
            ),
            faculty: getFacultyLabel(updatedAdmission?.program.faculty),
            modeOfEntry: updatedAdmission?.program?.modeOfEntry,
         };

         const pdfBuffer = await generateAdmissionPDF(applicationData);
         console.log(pdfBuffer);
         // Send PDF to another endpoint
         const formData = new FormData();

         formData.append("file", pdfBuffer, {
            filename: "admission-summary.pdf",
            contentType: "application/pdf",
         });

         const response = await axios.post(
            "https://appwrite-express-file-upload.onrender.com/upload",
            formData,
            {
               headers: {
                  ...formData.getHeaders(),
               },
            },
         );

         const { fileUrl } = response.data;

         const updatedFile = await Admission.findByIdAndUpdate(
            existingAdmission[0]._id,
            {
               fileUrl,
            },
            { new: true, runValidators: true },
         );
      }

      return res.status(200).json({
         message: "Admission Updated Successfully",
         admission: updatedAdmission,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

const generateMatricNumber = (academicSession, faculty, department, count) => {
   console.log(faculty, department);
   // Ensure the faculty and department are the first 3 characters
   const facultyCode = faculty.slice(0, 3).toUpperCase();
   const departmentCode = department.slice(0, 3).toUpperCase();

   // Format matric number as: "AcademicYear/Fac/Dep/Number"
   const matricNumber = `${academicSession}/${facultyCode}/${departmentCode}/${count}`;
   return matricNumber;
};

cron.schedule("0 0 * * *", async () => {
   try {
      const admissionsWithoutMatricNumber = await Admission.find({
         matricNumber: { $exists: false },
         submitted: true,
      });

      admissionsWithoutMatricNumber.forEach(async (admission) => {
         // Get the department and faculty from the database
         const facultyName = admission.program.faculty; // "faculty-of-management-sciences"
         const departmentName = admission.program.department; // "department-of-tourism-management"

         // Extract the first three letters from the faculty and department names
         const facultyCode = facultyName.split("-")[0].substring(0, 3).toUpperCase(); // "FAC" for "faculty-of-management-sciences"
         const departmentCode = departmentName.split("-")[0].substring(0, 3).toUpperCase(); // "DEP" for "department-of-tourism-management"

         const academicYear = "2023/2024"; // You can dynamically set this based on the current year if needed
         const number = Math.floor(Math.random() * 1000); // Generate a random number for uniqueness

         // Generate the matriculation number
         const matricNumber = `${academicYear}/${facultyCode}/${departmentCode}/${number}`;
         admission.matricNumber = matricNumber;

         // Save the updated admission with the generated matric number
         await admission.save();
         console.log(`Generated Matric Number: ${matricNumber} for Admission ID: ${admission._id}`);
      });
   } catch (error) {
      console.error("Error generating matric number:", error);
   }
});

(async () => {
   console.log("Initial Check: Generating matric numbers if missing...");

   const admissionsWithoutMatric = await Admission.find({
      matNumber: { $exists: false },
      submitted: true,
   });

   if (admissionsWithoutMatric.length === 0) {
      console.log("No admissions found without matric numbers.");
      return;
   }

   for (const admission of admissionsWithoutMatric) {
      const { academicSession, program } = admission;
      const { faculty, department } = program;

      const existingAdmissionsInSession = await Admission.find({
         academicSession,
         "program.faculty": faculty,
         "program.department": department,
      });

      const count = existingAdmissionsInSession.length + 1;
      const matricNumber = generateMatricNumber(academicSession, faculty, department, count);

      admission.matNumber = matricNumber;
      await admission.save();

      console.log(`Matric number generated for admission ${admission._id}: ${matricNumber}`);
   }
})();

// 6. Delete Admission Record
const deleteAdmission = async (req, res) => {};

// 7. Confirm Admission
const confirmAdmission = async (req, res) => {};

// 8. Update Admission Status (e.g., from 'Provisional' to 'Admitted')
const updateAdmissionStatus = async (req, res) => {};

// 9. Upload/Update Admission Documents
const uploadDocuments = async (req, res) => {};

// 10. Get All Admissions by Status (e.g., 'Admitted', 'Provisional', 'Graduated')
const getAdmissionsByStatus = async (req, res) => {};

// 11. Search Admissions by Academic Session
const searchAdmissionsBySession = async (req, res) => {};

// 12. Get Admissions by Mode of Entry (e.g., 'UTME', 'Direct Entry')
const getAdmissionsByModeOfEntry = async (req, res) => {};

module.exports = {
   createAdmission,
   updateAdmission,
   getAllAdmissions,
   getAdmissionByNumber,
};
